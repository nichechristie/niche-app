import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/lib/providers";
import { NicheChatbot } from "@/components/NicheChatbot";
import { Niche3DAvatar } from "@/components/Niche3DAvatar";

export const metadata: Metadata = {
  title: "Niche Coin - Creator Economy Platform",
  description: "Trade creator coins and content coins on the Niche platform. Every post becomes an instantly tradeable cryptocurrency token on Base.",
  icons: {
    icon: '/IMG_3411.jpeg',
    apple: '/IMG_3411.jpeg',
  },
  openGraph: {
    title: "Niche Coin - Creator Economy Platform",
    description: "Trade creator coins and content coins. Every post becomes an instantly tradeable cryptocurrency token on Base.",
    images: ['/IMG_3411.jpeg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Niche Coin - Creator Economy Platform",
    description: "Trade creator coins and content coins on Base",
    images: ['/IMG_3411.jpeg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <NicheChatbot />
          <Niche3DAvatar />
        </Providers>
      </body>
    </html>
  );
}
