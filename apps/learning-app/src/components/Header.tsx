import { cn } from "@/lib/utils";
import { Github } from "lucide-react";
import ToggleLang from "./ToggleLang";
import { buttonVariants } from "./ui/button";

export const Header = () => {
  return (
    <header className="flex py-1 px-4 justify-end items-center w-full mx-auto max-w-screen-lg gap-2">
      <a
        href="https://github.com/inaridiy/learn-account-abstraction"
        className={cn(buttonVariants({ variant: "ghost" }), "px-0 w-9")}
      >
        <Github />
      </a>
      <ToggleLang />
    </header>
  );
};
