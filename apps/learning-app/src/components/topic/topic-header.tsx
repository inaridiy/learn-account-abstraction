import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const TopicHeader = ({ title }: { title: string }) => {
  return (
    <div>
      <nav className="flex items-center py-2 px-4 border-b gap-2 mx-auto w-full max-w-screen-lg">
        <Link href="/" className="p-2 rounded-full hover:bg-accent">
          <ChevronLeft />
        </Link>
        <h2 className="text-xl font-bold">{title}</h2>
      </nav>
    </div>
  );
};
