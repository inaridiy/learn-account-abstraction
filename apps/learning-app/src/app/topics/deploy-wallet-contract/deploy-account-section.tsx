"use client";
import { ContractCallPanel } from "@/components/topic/contract-call-panel";
import { simpleFactoryContract } from "@/contracts/simple-factory";
import { accountAtom } from "@/states/crypto";
import { useAtomValue } from "jotai";

export const DeployAccountSection = () => {
  const account = useAtomValue(accountAtom);

  return (
    <section className="w-full">
      <h2 className="text-3xl font-bold border-b p-2">2. Deploy Account</h2>
      <p className="p-2 text-lg text-muted-foreground">
        Let's deploy the contract wallet. It's not that hard! In fact, creating an AA account is not
        much different from deploying an ERC721 NFT. All you need to do is to execute the deployment
        transaction. But the account thus created can unquestionably be used on ERC4737!
      </p>
      <p className="p-2 text-lg text-muted-foreground">
        Let's take this a step further. What are we doing now? We trying to deploy a type of
        contract wallet called SimpleAccount. This is a bit of a misnomer. SimpleAccount is just one
        of countless implementations (and of course you can create your own). Just as there are
        countless contracts along the ERC721 standard.
      </p>
      <p className="p-2 text-lg text-muted-foreground">
        In addition, this time we will use a contract called SimpleAccountFactory, which is a
        contract for deploying this SimpleAccount. This is the one we call in the previous section.
        The reason why we use SimpleAccountFactory is, simply put, because it is convenient. Because
        it is already on-chain and can be used without any particular configuration. However, it may
        be wrong to create Factory contract first when you create a new contract wallet. Because it
        may lose simplicity. In fact, SimpleAccountFactory is just a contract to deploy
        SimpleAccount, and it is not necessary for a small operation check.
      </p>

      <p className="p-2 text-lg text-muted-foreground">
        Long story short. Now hit the "Call" button at the bottom (you can change the SALT, of
        course).OWNER may not want to mess with it. You cannot control the wallet you have created.
        Once you are sure the transaction went through, let's move on to the next section.
      </p>

      <div className="px-2 py-8">
        <ContractCallPanel
          contract={simpleFactoryContract}
          functionName="createAccount"
          initialArgs={{
            owner: account?.address,
            salt: "0",
          }}
        />
      </div>
    </section>
  );
};
