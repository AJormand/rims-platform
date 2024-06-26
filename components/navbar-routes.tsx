"use client";

import Link from "next/link";

import { FolderHeart } from "lucide-react";

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

import { NavbarAvatar } from "./navbar-avatar";

export const NavbarRoutes = () => {
  return (
    <div className="flex justify-between px-6 py-2 border w-full z-50">
      <div className="flex items-center">
        <Link
          href={"/"}
          className="mr-[100px] text-sky-700 font-bold flex"
        >
          <h1>RIMS</h1>
          <FolderHeart />
        </Link>

        <Link href={"/"} className="text-sm font-bold mr-2 text-sky-700">
          <button className="text-white bg-sky-700 px-2 py-1 rounded-sm">
            DASHBOARD
          </button>
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

      <NavbarAvatar />
    </div>
  );
};
