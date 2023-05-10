"use client";

import { entrypointContract } from "@/contracts/entrypoint";
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

export const SimplerUseropExecutePanel = () => {
  const signer = useAtomValue(signerAtom);
  const account = useAtomValue(accountAtom);
  const factory = useContract(simpleFactoryContract);
  const entrypoint = useContract(entrypointContract);
  const [userOpLoadableAtom, setUserOpLoadableAtom] = useState<Atom<any>>(atom(null));
  const userOpLoadable = useAtomValue(userOpLoadableAtom);
  const [txLoadableAtom, setTxLoadableAtom] = useState<Atom<any>>(atom(null));
  const txLoadable = useAtomValue(txLoadableAtom);
  const [status, setStatus] = useState<string[]>([]);
  const { form, register, updateForm } = useMiniForm();

  useEffect(() => {
    if (!factory || !account || form.sender) return;

    factory["getAddress(address,uint256)"](account.address, 0).then((address) => {
      updateForm("sender", address);
    });
  }, [factory, account]);

  const buildUserOp = async () => {
    const { sender, target = sender, value, data } = form;
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

    setUserOpLoadableAtom(loadable(atom(useropPromise)));

    return useropPromise;
  };

  const executeUserOp = async () => {
    setStatus(() => ["Building UserOp..."]);
    const userop = await buildUserOp();

    if (!entrypoint || !userop || !account?.address)
      return setStatus((status) => [...status, "Failed to build UserOp."]);

    setStatus((status) => [...status, "Executing UserOp..."]);

    const tx = entrypoint.handleOps([userop], account.address);
    setTxLoadableAtom(loadable(atom(tx)));
    await tx.then((tx) => tx.wait());

    setStatus((status) => [...status, "Done!"]);
  };

  if (!factory || !entrypoint) return <ConnectButton />;

  return (
    <Card className="w-full shadow flex flex-col mt-4">
      <div className="w-full flex flex-col sm:flex-row">
        <div className="w-full max-w-sm flex-shrink-0">
          <CardHeader>
            <CardTitle>AA Tx Sender</CardTitle>
            <CardDescription>Let&apos;s send AA tx by Simple Account!</CardDescription>
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
              <Input
                id="data"
                placeholder="0x"
                value={form.data || ""}
                onChange={register("data")}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              disabled={userOpLoadable?.state === "loading"}
              onClick={executeUserOp}
            >
              {userOpLoadable?.state === "loading" && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Send Tx
            </Button>
          </CardFooter>
        </div>
        <div className="py-2 px-4 overflow-auto sm:border-l">
          <h3 className="text-lg font-bold pt-2">UserOperation</h3>
          {userOpLoadable && (
            <pre>
              {JSON.stringify(
                userOpLoadable.state === "hasData" ? userOpLoadable.data : userOpLoadable,
                null,
                2
              )}
            </pre>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col sm:flex-row sm:min-h-[24rem]">
        <div className="py-2 px-4 w-full max-w-sm flex-shrink-0">
          <h3 className="text-lg font-bold pt-2">Status</h3>
          <ul className="list-none list-inside pl-2 font-mono text-lg">
            {status.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="py-2 px-4 overflow-auto sm:border-l">
          <h3 className="text-lg font-bold pt-2 ">Transaction</h3>
          {txLoadable && (
            <pre className="font-mono">
              {JSON.stringify(
                txLoadable.state === "hasData" ? txLoadable.data : txLoadable,
                null,
                2
              )}
            </pre>
          )}
        </div>
      </div>
    </Card>
  );
};
