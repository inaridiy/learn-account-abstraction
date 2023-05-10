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
import { allTopics } from "contentlayer/generated";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center px-4 py-8 sm:py-24">
      <h1 className="text-4xl font-bold text-center">
        {"Let's Learn"} <br />
        Account Abstraction
      </h1>

      <div className="grid py-12 px-2 sm:px-4 gap-4 sm:grid-cols-2">
        {allTopics.map((topic) => (
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
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Link href={`/topics/${topic.id}`} className={cn(buttonVariants({}), "w-full")}>
                {topic.startBtnText}
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
