"use client";

import { UserButton } from "@clerk/nextjs";

export const NavbarRoutes = () => {
  return (
    <div className="flex justify-between px-4 py-2">
      <div>RIMS</div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};
