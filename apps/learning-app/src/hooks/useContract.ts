import { ContractSummary, networkAtom, signerAtom } from "@/states/crypto";
import { Contract } from "ethers";
import { useAtom } from "jotai";

export const useContract = (summary: ContractSummary): Contract | null => {
  const [signer] = useAtom(signerAtom);
  const [network] = useAtom(networkAtom);

  //TODO 雑すぎるので直す
  if (!signer) return null;
  if (!network) return null;
  if (!summary.deploy[network.id]) return null;

  return new Contract(summary.deploy[network.id].address, summary.abi, signer);
};
