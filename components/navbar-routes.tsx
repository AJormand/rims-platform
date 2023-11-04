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
    <div className="flex justify-between px-4 py-2 border">
      <div className="flex items-center">
        <Link href={"/"} className="mr-[100px]">
          RIMS
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>PRODUCT</NavigationMenuTrigger>
              <NavigationMenuContent className="flex flex-col p-4 gap-4">
                <NavigationMenuLink>
                  <Link href={"/products"}>Products</Link>
                </NavigationMenuLink>
                <NavigationMenuLink>
                  <Link href={"/applications"}>Applicaitons</Link>
                </NavigationMenuLink>
                <NavigationMenuLink>
                  <Link href={"/registrations"}>Registrations</Link>
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
                <NavigationMenuLink>
                  <Link href={"/applications"}>Applicaitons</Link>
                </NavigationMenuLink>
                <NavigationMenuLink>
                  <Link href={"/submissions"}>Submissions</Link>
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
                <NavigationMenuLink>
                  <Link href={"/substance"}>Substance</Link>
                </NavigationMenuLink>
                <NavigationMenuLink>
                  <Link href={"/organization"}>Organization</Link>
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
