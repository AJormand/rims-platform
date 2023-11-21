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

export const NavbarRoutes = () => {
  return (
    <div className="flex justify-between px-4 py-2 border w-full z-50">
      <div className="flex items-center">
        <Link href={"/"} className="mr-[100px] text-sky-700 font-bold">
          RIMS
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
                <NavigationMenuLink href={"/substance"}>
                  Substance
                </NavigationMenuLink>
                <NavigationMenuLink href={"/organization"}>
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
