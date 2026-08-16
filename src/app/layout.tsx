import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Chatbot from "@/components/Chatbot";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pen2text-using-Deep-Learning",
  description: "Extract text from images and fix grammar instantly with AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${outfit.className} bg-slate-50 text-slate-900`}>
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
