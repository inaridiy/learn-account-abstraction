import { entrypointContract } from "@/contracts/entrypoint";
import { BigNumberish, BytesLike, Signer, ethers } from "ethers";

export interface UserOperation {
  sender: string;
  nonce: BigNumberish;
  initCode: BytesLike;
  callData: BytesLike;
  callGasLimit: BigNumberish;
  verificationGasLimit: BigNumberish;
  preVerificationGas: BigNumberish;
  maxFeePerGas: BigNumberish;
  maxPriorityFeePerGas: BigNumberish;
  paymasterAndData: BytesLike;
  signature: BytesLike;
}

export const getUserOperation = (
  userOp: Omit<UserOperation, "signature">,
  entrypointAddress: string,
  chainId: number
) => {
  const corder = ethers.AbiCoder.defaultAbiCoder();
  return ethers.getBytes(
    ethers.keccak256(
      corder.encode(
        ["bytes32", "address", "uint256"],
        [
          ethers.keccak256(
            corder.encode(
              [
                "address",
                "uint256",
                "bytes32",
                "bytes32",
                "uint256",
                "uint256",
                "uint256",
                "uint256",
                "uint256",
                "bytes32",
              ],
              [
                userOp.sender,
                userOp.nonce,
                ethers.keccak256(userOp.initCode),
                ethers.keccak256(userOp.callData),
                userOp.callGasLimit,
                userOp.verificationGasLimit,
                userOp.preVerificationGas,
                userOp.maxFeePerGas,
                userOp.maxPriorityFeePerGas,
                ethers.keccak256(userOp.paymasterAndData),
              ]
            )
          ),
          entrypointAddress,
          chainId,
        ]
      )
    )
  );
};

const eip1559GasPrice = async (provider: ethers.JsonRpcProvider) => {
  const history = await provider.send("eth_feeHistory", ["0x1", "latest", [75]]);

  if (!history) throw new Error("Fee or block not found");

  const baseFeePerGas = BigInt(history.baseFeePerGas[1]);
  const reward = BigInt(history.reward[0][0]);
  const maxPriorityFeePerGas = (reward * BigInt(130)) / BigInt(100);
  const maxFeePerGas = baseFeePerGas * BigInt(2);

  return { maxFeePerGas, maxPriorityFeePerGas };
};

export const simpleUserOpBuilder = async (
  signer: Signer,
  sender: string,
  target: string,
  value: BigNumberish | undefined,
  data: string | undefined
) => {
  const provider = signer.provider as ethers.JsonRpcProvider;
  const chainId = await provider?.getNetwork().then((network) => network.chainId);
  if (!provider || !chainId) throw new Error("Provider or chainId not found");

  const { address: entrypointAddress } = entrypointContract.deploy[Number(chainId)];
  const entrypoint =
    entrypointAddress && new ethers.Contract(entrypointAddress, entrypointContract.abi, provider);
  if (!entrypoint) throw new Error("Entrypoint not found");

  const { maxFeePerGas, maxPriorityFeePerGas } = await eip1559GasPrice(provider);
  const callGasLimit = await provider.estimateGas({
    from: sender,
    to: target,
    value: value || BigInt(0),
    data: data || "0x",
  });

  const walletIface = new ethers.Interface(["function execute(address,uint256,bytes)"]);
  const callData = walletIface.encodeFunctionData("execute", [
    target,
    value || BigInt(0),
    data || "0x",
  ]);

  const userOp = {
    sender: sender,
    nonce: await entrypoint.getNonce(sender, 0),
    initCode: "0x",
    callData,
    callGasLimit,
    verificationGasLimit: 100000,
    preVerificationGas: 21000,
    maxFeePerGas,
    maxPriorityFeePerGas,
    paymasterAndData: "0x",
  } as UserOperation;

  const userOpHash = getUserOperation(userOp, entrypointAddress, Number(chainId));

  userOp.signature = await signer.signMessage(userOpHash);

  return userOp;
};
