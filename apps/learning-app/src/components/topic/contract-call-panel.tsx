"use client";

import { useContract } from "@/hooks/useContract";
import { useMiniForm } from "@/hooks/useMiniForm";
import { ContractSummary } from "@/states/crypto";
import { Atom, atom, useAtomValue } from "jotai";
import { loadable } from "jotai/utils";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { ConnectButton } from "../ConnectButton";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";

export const ContractCallPanel: React.FC<{
  contract: ContractSummary;
  functionName: string;
  initialArgs?: Record<string, any>;
}> = ({ contract: summary, functionName, initialArgs }) => {
  const contract = useContract(summary);
  const fragment = contract?.interface.getFunction(functionName);
  const { form, register } = useMiniForm(initialArgs);
  const [executeAtom, setExecuteAtom] = useState<Atom<any>>(atom(null));
  const result = useAtomValue(executeAtom);
  const { toast } = useToast();

  if (!contract) return <ConnectButton />;
  if (!fragment) throw new Error(`Function ${functionName} not found in contract ${summary.name}.`);

  const call = async () => {
    const result = contract[fragment.format()](...Object.values(form));
    setExecuteAtom(loadable(atom(result)));
    result.then((mayBeTx) => {
      if (!mayBeTx?.hash) return;
      const shortHash = `${mayBeTx.hash.slice(0, 6)}...${mayBeTx.hash.slice(-4)}`;
      toast({
        title: "Transaction pending",
        description: `Transaction ${shortHash} is pending.`,
      });
      mayBeTx.wait().then(() => {
        toast({
          title: "Transaction confirmed",
          description: `Transaction ${shortHash} is confirmed.`,
        });
      });
    });
  };

  return (
    <Card className="w-full shadow flex flex-col sm:flex-row overflow-auto">
      <div className="w-full max-w-sm flex-shrink-0">
        <CardHeader>
          <CardTitle>{fragment.format()}</CardTitle>
        </CardHeader>
        <CardContent className="gap-2 flex flex-col">
          {fragment.inputs.map((input, index) => (
            <div key={index} className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor={input.name}>{input.name}</Label>
              <Input
                id={input.name}
                placeholder={input.name}
                value={form[input.name] || ""}
                onChange={register(input.name)}
              />
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <Button disabled={result?.state === "loading"} className="w-full max-w-sm" onClick={call}>
            {result?.state === "loading" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Call
          </Button>
        </CardFooter>
      </div>

      {/* 雑な結果教示 */}
      <div className="py-2 px-4 sm:border-l overflow-auto">
        <h3 className="text-lg font-bold pt-2">Result</h3>
        {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
      </div>
    </Card>
  );
};
