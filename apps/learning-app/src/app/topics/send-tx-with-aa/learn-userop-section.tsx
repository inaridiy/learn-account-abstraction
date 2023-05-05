import { SimplerUseropPanel } from "@/components/topic/simple-userop-panel";

export const LearnUserOpSection = () => {
  return (
    <section className="w-full">
      <h2 className="text-3xl font-bold border-b p-2">1. Learn About UserOp</h2>
      <p className="p-2 text-lg text-muted-foreground">
        All transactions in the AA world are performed using an object called UserOperation. In
        other words, knowing UserOperation is knowing AA!
      </p>
      <p className="p-2 text-lg text-muted-foreground">
        UserOperation is just an object once you get going, but its creation is quite complex. So, I
        have prepared a cool tool that allows you to easily experience the generation of a
        UserOperation. With this tool, you can easily generate a UserOperation for a SimpleAccount
        (which you should have created earlier).
      </p>
      <p className="p-2 text-lg text-muted-foreground">
        Let's put aside the details and try to generate UserOperation by adding various values!
      </p>
      <SimplerUseropPanel />
    </section>
  );
};
