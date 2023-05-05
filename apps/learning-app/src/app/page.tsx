import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";

const topics = [
  {
    id: "deploy-wallet-contract",
    title: "Step1. Just Deploy Wallet Contract",
    description: "Deploy a smart contract wallet that supports AccountAbstraction!",
    steps: [
      {
        title: "Guess Address",
        subtitle: "Guess the address before deploying",
      },
      {
        title: "Deploy Account",
        subtitle: "Deploy the account contract",
      },
      {
        title: "Check Your Account",
        subtitle: "Check your account on the blockchain",
      },
    ],
    startTitle: "Let's GO!!!",
  },
  {
    id: "send-tx-with-aa",
    title: "Step2. Send Tx with AA",
    description: "Let's execute a transaction using the AA wallet you created!",
    steps: [
      {
        title: "Learn about UserOp",
        subtitle: "Let's learn UserOp with hands-on experience!",
      },
      {
        title: "Send gas fee to AA wallet",
        subtitle: "Send gas fee to AA wallet to prepare.",
      },
      {
        title: "Send empty Tx with AA",
        subtitle: "Create an empty UserOp and send an empty Tx from AA",
      },
    ],
    startTitle: "Let's GO!!!",
  },
] as const;

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4 py-8 sm:py-24">
      <h1 className="text-4xl font-bold text-center">
        {"Let's Learn"} <br />
        Account Abstraction
      </h1>

      <div className="grid py-12 px-2 sm:px-4 gap-4 sm:grid-cols-2">
        {topics.map((topic) => (
          <Card key={topic.id} className="flex flex-col">
            <CardHeader>
              <CardTitle>{topic.title}</CardTitle>
              <CardDescription>{topic.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              {topic.steps.map((step) => (
                <div
                  key={step.title}
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{step.title}</p>
                    <p className="text-sm text-muted-foreground">{step.subtitle}</p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Link href={`/topics/${topic.id}`} className={cn(buttonVariants({}), "w-full")}>
                {topic.startTitle}
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
