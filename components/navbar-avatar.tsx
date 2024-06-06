"use client";
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/clerk-react";
import { BellIcon, HistoryIcon } from "lucide-react";

export const NavbarAvatar = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-3">
      <HistoryIcon size={20} />
      <BellIcon size={20} />
      <p className="text-xs font-bold">Hello, {user.firstName}</p>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};
