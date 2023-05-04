"use client";

import {
  accountAtom,
  connect,
  isSupportedNetworkAtom,
  networkAtom,
  providerAtom,
} from "@/states/crypto";
import { useAtom, useSetAtom } from "jotai";
import { Button } from "./ui/button";

export const ConnectButton = () => {
  const setNetwork = useSetAtom(networkAtom);
  const [account, setAccount] = useAtom(accountAtom);
  const [provider, setProvider] = useAtom(providerAtom);
  const [isSupportedNetwork] = useAtom(isSupportedNetworkAtom);

  const connectWallet = async () => {
    if (!window.ethereum) return alert("Please install metamask");
    const { provider, address, network } = await connect();
    setProvider(provider);
    setAccount({ address, shortAddress: `${address.slice(0, 6)}...${address.slice(-4)}` });
    setNetwork({ id: Number(network.chainId), name: network.name });

    window.ethereum.on("accountsChanged", ([address]: string[]) =>
      setAccount({ address, shortAddress: `${address.slice(0, 6)}...${address.slice(-4)}` })
    );
    window.ethereum.on("chainChanged", (chainId: string) =>
      setNetwork({ id: Number(chainId), name: "" })
    );
  };

  const disconnectWallet = () => {
    provider?.removeAllListeners();
    setProvider(null);
    setAccount(null);
    setNetwork(null);
  };

  if (!account) {
    return <Button onClick={connectWallet}>Connect Wallet</Button>;
  } else if (!isSupportedNetwork) {
    return <Button variant="destructive">Unsupported</Button>;
  } else {
    return (
      <Button variant="outline" onClick={disconnectWallet}>
        Disconnect
      </Button>
    );
  }
};
