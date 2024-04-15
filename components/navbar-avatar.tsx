"use client";
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/clerk-react";

export const NavbarAvatar = () => {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded || !isSignedIn) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-3">
      Hello, {user.firstName}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};
