import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/providers/query-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ScreenSize } from "@/components/screen-size";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sense Pro",
  description: "Sense Pro Admin Dashboard",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>
          <Toaster />
          {children}
          {process.env.NODE_ENV === "development" && <ScreenSize />}
        </QueryProvider>
      </body>
    </html>
  );
}
