import { SimplerUseropExecutePanel } from "@/components/topic/simple-userop-executer";

export const SendEmptySection = () => {
  return (
    <section className="w-full">
      <h2 className="text-3xl font-bold border-b p-2">3. Send Empty Tx with AA</h2>
      <p className="p-2 pb-4 text-lg text-muted-foreground">
        Now you can finally send transactions using AA. Here are the steps for executing a
        transaction in AA.
      </p>
      <ul className="list-decimal list-inside">
        <li className="p-2 text-lg text-muted-foreground">
          Prepare a contract wallet that supports AA.
        </li>
        <li className="p-2 text-lg text-muted-foreground">Create a UserOp for that wallet.</li>
        <li className="p-2 text-lg text-muted-foreground">Ask someone to execute UserOp.</li>
      </ul>
      <p className="p-2 text-lg text-muted-foreground">
        For now, just press the SendTx button without thinking. Then the AA transaction will be
        executed according to the procedure. Is the transaction finished executing? You have done
        it! You have executed a empty transaction by your AA contract wallet.
      </p>
      <p className="p-2 text-lg text-muted-foreground">
        Let me explain what you did. You first created a UserOp to execute a transaction that does
        nothing. Next, you used that UserOp to execute an EntryPoint contract. This is exactly the
        same thing as the Bundler in AA. Then your AA wallet executed a transaction that did
        nothing.
      </p>
      <p className="p-2 pb-4 text-lg text-muted-foreground">
        I want you to compare the balances in your EOA and AA wallets before and after you execute
        the transaction. Surprisingly, the balance in your EOA wallet has not decreased at all (in
        fact, it may have increased). Yes, the AA wallet paid for the gas for this transaction, and
        the gas was returned to the EOA wallet that executed the transaction instead! This is solid
        proof that you executed the AA transaction!
      </p>
      <SimplerUseropExecutePanel />
    </section>
  );
};
