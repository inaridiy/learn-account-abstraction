import { BrowserProvider, Eip1193Provider } from "ethers";

type Eip1193Events = {
  (event: "accountsChanged", callback: (accounts: string[]) => void): void;
  (event: "chainChanged", callback: (chainId: string) => void): void;
  (event: "disconnect", callback: () => void): void;
};

//雑に型を追加
declare global {
  interface Window {
    ethereum: Eip1193Provider & {
      on: Eip1193Events;
    };
  }
}

export const connect = async () => {
  const provider = new BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const [address, network] = [await signer.getAddress(), await provider.getNetwork()];

  return {
    address,
    network,
    provider,
    signer,
  };
};
