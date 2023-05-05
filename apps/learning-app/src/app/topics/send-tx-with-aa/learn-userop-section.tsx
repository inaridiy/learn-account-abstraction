"use client";

import { SimplerUseropPanel } from "@/components/topic/simple-userop-panel";

export const LearnUserOpSection = () => {
  return (
    <section className="w-full">
      <h2 className="text-3xl font-bold border-b p-2">1. Learn About UserOp</h2>
      <p className="p-2 text-lg text-muted-foreground">
        All transactions in the AA world are performed using an object called UserOperation. In
        other words, knowing UserOperation is knowing AA!
      </p>
      <p className="p-2 text-lg text-muted-foreground"></p>
      <SimplerUseropPanel />
    </section>
  );
};
