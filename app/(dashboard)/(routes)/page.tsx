import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

import {
  Pill,
  FileStack,
  AppWindow,
  SendToBack,
  TestTube2,
  Building2,
} from "lucide-react";

export default function Home() {
  const quickNavigations = [
    {
      name: "Products",
      description: "Manage your products",
      href: "/products",
      icon: <Pill size={50} className="text-sky-700" />,
    },
    {
      name: "Applications",
      description: "Manage your applications",
      href: "/applications",
      icon: <FileStack size={50} className="text-sky-700" />,
    },
    {
      name: "Registrations",
      description: "Manage your registrations",
      href: "/registrations",
      icon: <AppWindow size={50} className="text-sky-700" />,
    },

    {
      name: "Submissions",
      description: "Manage your submissions",
      href: "/submissions",
      icon: <SendToBack size={50} className="text-sky-700" />,
    },
  ];

  const libraries = [
    {
      name: "Substance",
      description: "Substance Library",
      href: "/substances",
      icon: <TestTube2 size={50} className="text-sky-700" />,
    },
    {
      name: "Organization",
      description: "Organization Library",
      href: "/organizations",
      icon: <Building2 size={50} className="text-sky-700" />,
    },
    {
      name: "Country",
      description: "Country Library",
      href: "/countries",
      icon: <Building2 size={50} className="text-sky-700" />,
    },
  ];

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <div className="flex gap-28">
        <div>
          <h1 className="text-center text-xl">Quick Navigation</h1>
          <div className="gap-5 grid grid-cols-2 justify-center items-center m-10">
            {quickNavigations.map((item) => (
              <Link
                href={item.href}
                key={item.name}
                className="hover:shadow-lg"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>{item.icon}</CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-center text-xl">Libraries</h1>
          <div className="gap-5 grid grid-cols-1 justify-center items-center mt-10">
            {libraries.map((item) => (
              <Link
                href={item.href}
                key={item.name}
                className="hover:shadow-lg"
              >
                <Card>
                  <CardHeader>
                    <CardTitle>{item.name}</CardTitle>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>{item.icon}</CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
