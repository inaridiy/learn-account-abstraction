"use client";
import { ContractCallPanel } from "@/components/topic/contract-call-panel";
import { simpleFactoryContract } from "@/contracts/simple-factory";
import { accountAtom, networkAtom } from "@/states/crypto";
import { useAtomValue } from "jotai";
import Image from "next/image";

export const GuessAddressSection = () => {
  const account = useAtomValue(accountAtom);
  const network = useAtomValue(networkAtom);
  const chainId = network?.id || 137;

  return (
    <section className="w-full">
      <h2 className="text-3xl font-bold border-b p-2">1. Guess Address</h2>
      <p className="p-2 text-lg text-muted-foreground">
        Ethereum allows you to know in advance the address where the contract will be deployed. In
        this section we will try to find out to which address the contract wallet we are about to
        deploy will be deployed.
      </p>
      <p className="p-2 text-lg text-muted-foreground">
        In this case, we will deploy a contract wallet using a contract called{" "}
        <a
          target="_blank"
          className="underline-offset-4 underline text-primary"
          href={simpleFactoryContract.deploy[chainId].explorer}
        >
          SimpleAccountFactory.
        </a>{" "}
        In addition to deploying a contract wallet, this contract also has a function called
        `getAddress` that looks up the address to which it will be deployed. The getAddress function
        takes an owner (i.e., you) and a salt (any uin256 value).
      </p>
      <p className="p-2 text-lg text-muted-foreground">
        You can try getAddress in the next panel(The data property is the result of the execution!).
        Also, for the rest of the explanation, we will assume that salt is set to zero.
      </p>

      <div className="px-2 py-8">
        <ContractCallPanel
          contract={simpleFactoryContract}
          functionName="getAddress"
          initialArgs={{
            owner: account?.address,
            salt: "0",
          }}
        />
      </div>

      <p className="p-2 text-lg text-muted-foreground">
        If you look at the previous address in polygonscan, you will see that the contract has not
        yet been deployed!
      </p>
      <div className="w-full max-w-lg">
        <Image
          className="rounded-lg overflow-hidden shadow-lg border"
          alt="Does not appear to be deployed yet"
          src="/topics/not-deploy-polygonscan.png"
          width={800}
          height={400}
        />
      </div>
    </section>
  );
};
