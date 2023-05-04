import { TopicHeader } from "@/components/topic/topic-header";

export default function Topic() {
  return (
    <>
      <TopicHeader title="Deploy Wallet Contract" />
      <main className="px-2 pt-12 w-full max-w-screen-lg mx-auto">
        <section>
          <h2 className="text-3xl font-bold border-b p-2">1. Guess Address</h2>
          <p className="p-2 text-lg text-muted-foreground">
            Before deploying the contract, let's guess the address of the contract wallet.
          </p>
        </section>
      </main>
    </>
  );
}
