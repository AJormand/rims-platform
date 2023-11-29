"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Image from "next/image";

export const NavbarRoutes = () => {
  return (
    <div className="flex justify-between px-4 py-2 border w-full z-50">
      <div className="flex items-center">
        <Link
          href={"/"}
          className="mr-[100px] text-sky-700 font-bold flex flex-col"
        >
          <Image src="/RIMSnobg.png" alt="logo" width={70} height={80} />
        </Link>

        <Link href={"/"} className="text-sm font-bold mr-2 text-sky-700">
          [DASHBOARD]
        </Link>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>PRODUCT</NavigationMenuTrigger>
              <NavigationMenuContent className="flex flex-col p-4 gap-4">
                <NavigationMenuLink href={"/products"}>
                  Products
                </NavigationMenuLink>
                <NavigationMenuLink href={"/applications"}>
                  Applicaitons
                </NavigationMenuLink>
                <NavigationMenuLink href={"/registrations"}>
                  Registrations
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>SUBMISSION</NavigationMenuTrigger>
              <NavigationMenuContent className="flex flex-col p-4 gap-4">
                <NavigationMenuLink href={"/applications"}>
                  Applicaitons
                </NavigationMenuLink>
                <NavigationMenuLink href={"/submissions"}>
                  Submissions
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>LIBRARY</NavigationMenuTrigger>
              <NavigationMenuContent className="flex flex-col p-4 gap-4">
                <NavigationMenuLink href={"/substances"}>
                  Substance
                </NavigationMenuLink>
                <NavigationMenuLink href={"/organizations"}>
                  Organization
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};
