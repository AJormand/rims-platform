import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

import { Pill, FileStack, AppWindow, SendToBack } from "lucide-react";

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

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <h1 className="text-2xl">What do you want to work with?</h1>

      <div className="gap-5 grid grid-cols-2 justify-center items-center w-1/2 mt-10">
        {quickNavigations.map((item) => (
          <Link href={item.href} className="hover:bg-slate-600">
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
  );
}
