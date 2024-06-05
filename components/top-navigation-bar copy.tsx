"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft, ChevronLeftCircle, ChevronLeft, Key } from "lucide-react"; // Assuming you have an icon library, like Lucide

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export const TopNavigationBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const routeItems = pathname.split("/").slice(1);

  // Handle navigation back
  const navigateBack = () => {
    router.back();
  };

  console.log(pathname.split("/").slice(1));

  return (
    <div className="flex items-center gap-10 p-4 w-1/3 relative">
      <Breadcrumb>
        <BreadcrumbList>
          {/* HOME */}
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>

          {/* ROUTES */}
          {routeItems.map((item, index) => (
            <div key={index} className="flex">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {index === routeItems.length - 1 ? (
                  <BreadcrumbPage className="text-gray-400">
                    {item}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={`/${item}`}>{item}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          ))}

          {/* <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem> */}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
