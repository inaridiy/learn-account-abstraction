"use client";

import { simpleFactoryContract } from "@/contracts/simple-factory";
import { useBalance } from "@/hooks/useBalance";
import { useContract } from "@/hooks/useContract";
import { useMiniForm } from "@/hooks/useMiniForm";
import { accountAtom, signerAtom } from "@/states/crypto";
import { ethers } from "ethers";
import { useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { ConnectButton } from "../ConnectButton";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useToast } from "../ui/use-toast";

export const PayEthPanel: React.FC<{
  description: string;
}> = ({ description }) => {
  const signer = useAtomValue(signerAtom);
  const account = useAtomValue(accountAtom);
  const factory = useContract(simpleFactoryContract);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { form, register, updateForm } = useMiniForm();

  const { refetch: refetch1, balance: yourBalance } = useBalance(account?.address || "0x");
  const { refetch: refetch2, balance: targetBalance } = useBalance(form.target || "0x");

  useEffect(() => {
    if (!factory || !account || form.target) return;

    factory["getAddress(address,uint256)"](account.address, 0).then((address) => {
      updateForm("target", address);
    });
  }, [factory, account]);

  const send = async () => {
    if (!factory || !signer) return;
    if (!form.target) return alert("Please enter target address");
    if (!form.value) return alert("Please enter value");

    setIsLoading(true);
    const tx = await signer.sendTransaction({
      to: form.target,
      value: ethers.parseEther(form.value),
    });
    const shortHash = `${tx.hash.slice(0, 6)}...${tx.hash.slice(-4)}`;
    toast({
      title: "Transaction pending",
      description: `Transaction ${shortHash} is pending.`,
    });
    await tx.wait();
    [refetch1(), refetch2()];
    toast({
      title: "Transaction confirmed",
      description: `Transaction ${shortHash} is confirmed.`,
    });
    setIsLoading(false);
  };

  if (!factory) return <ConnectButton />;

  return (
    <Card className="w-full shadow flex flex-col sm:flex-row overflow-auto mt-4">
      <div className="w-full max-w-sm flex-shrink-0">
        <CardHeader>
          <CardTitle>Send ETH</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="gap-2 flex flex-col">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="target">Send To</Label>
            <Input
              id="target"
              placeholder="0x"
              value={form.target || ""}
              onChange={register("target")}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="target">Value</Label>
            <Input
              id="target"
              placeholder="0.1"
              value={form.value || ""}
              onChange={register("value")}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button disabled={isLoading} className="w-full" onClick={send}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send
          </Button>
        </CardFooter>
      </div>
      {/** ここのUI治してぇよ */}
      <div className="py-2 px-4 sm:border-l overflow-auto">
        <h3 className="text-lg font-bold pt-2">Balances</h3>
        <div className="flex justify-between gap-2 pl-2 pt-2 items-center">
          <div className="text-lg font-bold">{yourBalance}ETH</div>
          <div className="border-l pl-2">
            <div className="font-bold">You</div>
            <div className="text-sm text-muted-foreground font-mono">{account?.address}</div>
          </div>
        </div>
        <div className="flex justify-between gap-2 pl-2 pt-4 items-center">
          <div className="text-lg font-bold">{targetBalance}ETH</div>
          <div className="border-l pl-2">
            <div className="font-bold">Target</div>
            <div className="text-sm text-muted-foreground font-mono">{form.target}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};
