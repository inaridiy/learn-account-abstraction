"use client";

import { simpleFactoryContract } from "@/contracts/simple-factory";
import { useContract } from "@/hooks/useContract";
import { useMiniForm } from "@/hooks/useMiniForm";
import { simpleUserOpBuilder } from "@/lib/simple-userop-builder";
import { accountAtom, signerAtom } from "@/states/crypto";
import { ethers } from "ethers";
import { Atom, atom, useAtomValue } from "jotai";
import { loadable } from "jotai/utils";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ConnectButton } from "../ConnectButton";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export const SimplerUseropPanel = () => {
  const signer = useAtomValue(signerAtom);
  const account = useAtomValue(accountAtom);
  const factory = useContract(simpleFactoryContract);
  const [resultAtom, setResultAtom] = useState<Atom<any>>(atom(null));
  const result = useAtomValue(resultAtom);
  const { form, register, updateForm } = useMiniForm();

  useEffect(() => {
    if (!factory || !account || form.sender) return;
    factory["getAddress(address,uint256)"](account.address, 0).then((address) => {
      updateForm("sender", address);
    });
  }, [factory, account]);

  const buildUserOp = async () => {
    const { sender, target, value, data } = form;
    if (!signer || !sender || !target) return;

    const formattedValue = value && ethers.parseEther(value);
    const useropPromise = simpleUserOpBuilder(signer, sender, target, formattedValue, data).then(
      (userop) =>
        Object.fromEntries(
          Object.entries(userop).map(([key, value]) => [
            key,
            typeof value === "bigint" ? "0x" + value.toString(16) : value,
          ])
        )
    );

    setResultAtom(loadable(atom(useropPromise)));
  };

  if (!factory) return <ConnectButton />;

  return (
    <Card className="w-full shadow flex flex-col sm:flex-row">
      <div className="w-full max-w-sm flex-shrink-0">
        <CardHeader>
          <CardTitle>UserOp Builder</CardTitle>
          <CardDescription>Let's generate a UserOp for Simple Account!</CardDescription>
        </CardHeader>
        <CardContent className="gap-2 flex flex-col">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="target">Sender</Label>
            <Input
              id="target"
              placeholder="0x"
              value={form.sender || ""}
              onChange={register("sender")}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="target">Target</Label>
            <Input
              id="target"
              placeholder="0x"
              value={form.target || ""}
              onChange={register("target")}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="value">Value</Label>
            <Input
              id="value"
              placeholder="0.01"
              value={form.value || ""}
              onChange={register("value")}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="data">Data</Label>
            <Input id="data" placeholder="0x" value={form.data || ""} onChange={register("data")} />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" disabled={result?.state === "loading"} onClick={buildUserOp}>
            {result?.state === "loading" && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Build
          </Button>
        </CardFooter>
      </div>
      <div className="py-2 px-4 sm:border-l overflow-auto">
        <h3 className="text-lg font-bold pt-2">Result</h3>
        {result && (
          <pre>{JSON.stringify(result.state === "hasData" ? result.data : result, null, 2)}</pre>
        )}
      </div>
    </Card>
  );
};
