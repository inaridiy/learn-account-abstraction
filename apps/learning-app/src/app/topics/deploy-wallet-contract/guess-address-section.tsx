"use client";
import { ContractCallPanel } from "@/components/topic/contract-call-panel";
import { simpleFactoryContract } from "@/contracts/simple-factory";
import Image from "next/image";

export const GuessAddressSection = () => {
  const chainId = 137;

  return (
    <section className="w-full">
      <h2 className="text-3xl font-bold border-b p-2">1. Guess Address</h2>
      <p className="p-2 text-lg text-muted-foreground">
        AA wallets are just contract wallets once you go there, so you need to deploy them to the
        blockchain before you use them. Before deploying, try to guess to which address the wallet
        will deploy!
      </p>
      <p className="p-2 text-lg text-muted-foreground">
        In this case, we will deploy a contract wallet using a contract called{" "}
        <a
          target="_blank"
          className="underline-offset-4 underline text-primary"
          href={simpleFactoryContract.deploy[chainId]?.explorer}
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
        <ContractCallPanel contract="simpleFactory" functionName="getAddress" />
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
