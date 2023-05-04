import { TopicHeader } from "@/components/topic/topic-header";
import { GuessAddressSection } from "./guess-address-section";

export default function Topic() {
  return (
    <>
      <TopicHeader title="Deploy Wallet Contract" />
      <main className="px-2 pt-12 w-full max-w-screen-lg mx-auto">
        <GuessAddressSection />
      </main>
    </>
  );
}
