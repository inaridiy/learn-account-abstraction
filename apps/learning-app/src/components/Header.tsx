import { Github, Twitter } from "lucide-react";

export const Header = () => {
  return (
    <header className="flex py-1 px-4 justify-end items-center w-full mx-auto max-w-screen-lg">
      <a href="https://github.com/inaridiy/learn-account-abstraction">
        <Github className="w-10 h-10 p-2 hover:bg-accent rounded-full" />
      </a>
      <a href="https://twitter.com/inaridiy">
        <Twitter className="w-10 h-10 p-2 hover:bg-accent rounded-full" />
      </a>
    </header>
  );
};
