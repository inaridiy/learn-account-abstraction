import { TopicHeader } from "@/components/topic/topic-header";
import { LearnUserOpSection } from "./learn-userop-section";
import { SendGasFeeSection } from "./send-gas-fee-section";

export default function Topic() {
  return (
    <>
      <TopicHeader title="Send Tx with AA" />
      <main className="px-2 pt-12 w-full max-w-screen-lg mx-auto mb-36">
        <div className="flex flex-col gap-36">
          <LearnUserOpSection />
          <SendGasFeeSection />
        </div>
      </main>
    </>
  );
}
