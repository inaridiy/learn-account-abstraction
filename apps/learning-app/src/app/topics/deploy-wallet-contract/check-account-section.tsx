import Image from "next/image";

export const CheckAccountSection = () => {
  return (
    <section className="w-full">
      <h2 className="text-3xl font-bold border-b p-2">3. Check Your Account</h2>
      <p className="p-2 text-lg text-muted-foreground">
        This is the last time. Let&apos;s check the contract wallet we just deployed with
        BlockchainExplorer. I would like you to paste the address you checked in Section 1 again
        into PolygonScan or other software to check it. Then, the address that was treated as just
        an Address earlier is recognized as a contract. This may not seem like a big deal, but it is
        true that we were able to deploy an account that can be used with AccountAbstraction. This
        address will be used in future courses, so make sure you save it.
      </p>
      <Image
        className="rounded-lg overflow-hidden shadow-lg border"
        alt="Does not appear to be deployed yet"
        src="/topics/deployed-polygonscan.png"
        width={800}
        height={400}
      />
      <p className="p-2 text-lg text-muted-foreground">
        That&apos;s it for this course. See you soon. This project was initiated by inaridiy, but
        there is still much work to be done. If you share my feelings about this project, I&apos;m
        waiting for you on{" "}
        <a
          target="_blank"
          className="underline-offset-4 underline text-primary"
          href="https://github.com/inaridiy/learn-account-abstraction"
        >
          Github
        </a>
        .
      </p>
    </section>
  );
};
