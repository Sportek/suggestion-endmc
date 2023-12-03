import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { HeadBar } from "@/components/head-bar";
import { ClerkProvider } from "@clerk/nextjs";
import { initialProfile } from "@/lib/initial-profile";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Suggestion App",
  description: "Suggestion application",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await initialProfile();
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={cn(inter.className, "justify-center flex bg-zinc-800")}
        >
          <div className="min-w-[700px] w-[50%]">
            <div className="pb-10">
              <HeadBar />
              {children}
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
