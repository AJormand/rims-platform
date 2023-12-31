import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";

import { NavbarRoutes } from "../components/navbar-routes";
import { TopNavigationBar } from "@/components/top-navigation-bar";
import { ToasterProvider } from "@/components/providers/toaster-provider";
import { TenstackProvider } from "@/components/providers/tenstack-query-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <TenstackProvider>
            <div className="flex flex-col h-screen">
              <NavbarRoutes />
              <TopNavigationBar />
              <div className="overflow-y-auto">{children}</div>
            </div>
            <ToasterProvider />
          </TenstackProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
