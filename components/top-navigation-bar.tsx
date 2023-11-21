"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft, ChevronLeftCircle, ChevronLeft } from "lucide-react"; // Assuming you have an icon library, like Lucide

export const TopNavigationBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  // Handle navigation back
  const navigateBack = () => {
    router.back();
  };

  const getCurrentPageName = () => {
    switch (pathname) {
      case "/":
        return "Home";

      case "/products":
        return "Products";
      case "/products/create":
        return "Create Product";
      case "/products/[productId]":
        return "Product";

      case "/applications":
        return "Applications";
      case "/applications/create":
        return "Create Application";

      case "/registrations":
        return "Registrations";
      case "/submissions":
        return "Submissions";

      default:
        return "Unknown";
    }
  };
  let currentPageName = getCurrentPageName();

  return (
    <div className="flex items-center gap-10 p-4 w-1/3 relative">
      <div className="h-[1px] w-[500px] absolute bottom-0 bg-gradient-to-r from-gray-200 to-white"></div>
      <div>
        <button onClick={navigateBack} className="flex items-center">
          <ChevronLeft size={20} />
          <span className="ml-2">Back</span>
        </button>
      </div>
      <div>
        <h1 className="text-base font-semibold underline text-sky-700">
          {currentPageName}
        </h1>
      </div>
      <div></div> {/* Add any additional elements you want on the right */}
    </div>
  );
};
