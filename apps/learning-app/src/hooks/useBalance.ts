import { providerAtom } from "@/states/crypto";
import { ethers } from "ethers";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

export const useBalance = (address: string) => {
  const provider = useAtomValue(providerAtom);
  const [balance, setBalance] = useState("");

  const refetch = () => {
    if (!provider) return;
    if (!ethers.isAddress(address)) return;
    provider.getBalance(address).then((balance) => {
      const formatted = ethers.formatEther(balance);

      setBalance(
        formatted.split(".")[0].length > 4 ? formatted.split(".")[0] : formatted.slice(0, 4)
      );
    });
  };

  useEffect(() => {
    refetch();
  }, [provider, address]);

  return { balance, refetch };
};
