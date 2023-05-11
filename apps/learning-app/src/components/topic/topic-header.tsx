import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export const TopicHeader = ({ title, lang }: { title: string; lang: string }) => {
  return (
    <div>
      <nav className="flex items-center py-2 pl-2 pr-4 border-b gap-2 mx-auto w-full max-w-screen-lg">
        <Link href={`/${lang}`} className="p-2 rounded-full hover:bg-accent">
          <ChevronLeft />
        </Link>
        <h2 className="text-xl font-bold">{title}</h2>
      </nav>
    </div>
  );
};
