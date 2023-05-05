import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Let's Learn Account Abstraction",
  description:
    "A site where you can learn AA while working with your hands... What is supposed to be",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Toaster />
        <Header />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}