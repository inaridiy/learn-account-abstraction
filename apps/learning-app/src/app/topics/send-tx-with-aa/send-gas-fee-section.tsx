import { PayEthPanel } from "@/components/topic/pay-eth-panel";

export const SendGasFeeSection = () => {
  return (
    <section className="w-full">
      <h2 className="text-3xl font-bold border-b p-2">2. Send gas fee to AA wallet</h2>
      <p className="p-2 pb-4 text-lg text-muted-foreground">
        Let&apos;s make one last preparation for sending tx. Maybe your wallet is still empty. This
        means you can&apos;t even pay for gas. So let&apos;s send some money to your wallet.
      </p>
      <PayEthPanel description="Send ETH to the AA wallet you created!" />
    </section>
  );
};
