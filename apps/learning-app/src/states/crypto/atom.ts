import { SUPPORTED_CHAIN_IDS } from "@/constants";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import { atom } from "jotai";
import { Account, Network } from "./types";

export const accountAtom = atom<Account | null>(null);
export const signerAtom = atom<JsonRpcSigner | null>(null);
export const providerAtom = atom<BrowserProvider | null>(null);
export const networkAtom = atom<Network | null>(null);
export const isSupportedNetworkAtom = atom<boolean>((get) =>
  SUPPORTED_CHAIN_IDS.includes(get(networkAtom)?.id ?? 0)
);

export const cryptoAtoms = {
  account: accountAtom,
  signer: signerAtom,
  provider: providerAtom,
  network: networkAtom,
  isSupportedNetwork: isSupportedNetworkAtom,
};
