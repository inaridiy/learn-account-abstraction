import { TopicHeader } from "@/components/topic/topic-header";
import { DeployAccountSection } from "./deploy-account-section";
import { GuessAddressSection } from "./guess-address-section";

export default function Topic() {
  return (
    <>
      <TopicHeader title="Deploy Wallet Contract" />
      <main className="px-2 pt-12 w-full max-w-screen-lg mx-auto ">
        <div className="flex flex-col gap-36">
          <GuessAddressSection />
          <DeployAccountSection />
        </div>
      </main>
    </>
  );
}
