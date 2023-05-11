import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import { Noto_Sans_JP, Roboto, Roboto_Mono } from "next/font/google";
import "../globals.css";
import { Analytics } from "./analytics";
import { Providers } from "./providers";

const roboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
});

const robotoMono = Roboto_Mono({
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

const notoSansJP = Noto_Sans_JP({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});

export const metadata = {
  metadataBase: new URL("https://www.learn-aa.org/"),
  keywords: ["Ethereum", "Account Abstraction", "AA"],
  authors: [{ name: "inaridiy", twitter: "https://twitter.com/inaridiy" }],
  title: "Let's Learn Account Abstraction",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.learn-aa.org/",
    title: "Let's Learn Account Abstraction",
    description:
      "A site where you can learn AA while working with your hands... What is supposed to be",
    siteName: "Learn AA",
    images: [
      {
        url: "https://www.learn-aa.org/ogp.jpg",
        width: 1200,
        height: 630,
        alt: "Learn AA",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Let's Learn Account Abstraction",
    description:
      "A site where you can learn AA while working with your hands... What is supposed to be",
    images: ["https://www.learn-aa.org/ogp.jpg"],
    creator: "@inaridiy",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${roboto.variable} ${robotoMono.variable} ${notoSansJP.variable}`}>
      <body className="min-h-[100dvh] flex flex-col">
        <Toaster />
        <Header />

        <div className="flex-1">
          <Providers>{children}</Providers>
        </div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
