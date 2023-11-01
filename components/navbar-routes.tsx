"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export const NavbarRoutes = () => {
  return (
    <div className="flex justify-between px-4 py-2">
      <div>
        <Link href={"/"}>RIMS</Link>
      </div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};
