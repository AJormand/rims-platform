"use client";
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
  Globe,
  CaseUpper,
  Settings,
} from "lucide-react";
import { fetchCollections } from "@/app/services/api-client/api-client";
import { builtInCollections } from "@/constants/builtInCollections";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [customCollections, setCustomCollections] = useState([]);

  const quickNavigations = [
    {
      name: "Products",
      description: "Manage your products",
      href: "/products",
      icon: <Pill size={40} className="text-sky-700" />,
    },
    {
      name: "Applications",
      description: "Manage your applications",
      href: "/applications",
      icon: <FileStack size={40} className="text-sky-700" />,
    },
    {
      name: "Registrations",
      description: "Manage your registrations",
      href: "/registrations",
      icon: <AppWindow size={40} className="text-sky-700" />,
    },

    {
      name: "Submissions",
      description: "Manage your submissions",
      href: "/submissions",
      icon: <SendToBack size={40} className="text-sky-700" />,
    },
  ];

  const libraries = [
    {
      name: "Substance",
      description: "Substance Library",
      href: "/substances",
      icon: <TestTube2 size={25} className="text-sky-700" />,
    },
    {
      name: "Organization",
      description: "Organization Library",
      href: "/organizations",
      icon: <Building2 size={25} className="text-sky-700" />,
    },
    {
      name: "Country",
      description: "Country Library",
      href: "/countries",
      icon: <Globe size={25} className="text-sky-700" />,
    },
    {
      name: "Controlled Vocabulary",
      description: "Controlled Vocabulary Library",
      href: "/controlled-vocabularies",
      icon: <CaseUpper size={25} className="text-sky-700" />,
    },
  ];

  const getCustomCollections = async () => {
    // const allCollections = await fetchCollections();
    // const onlyCustomCollections = allCollections.filter(
    //   (collectionName: string) => !builtInCollections.includes(collectionName)
    // );
    // console.log({ onlyCustomCollections });
    // setCustomCollections(onlyCustomCollections);
  };

  useEffect(() => {
    getCustomCollections();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <div className="flex gap-28">
        <div>
          <h1 className="text-center text-sm text-gray-400">
            Quick Navigation
          </h1>
          <div className="gap-5 grid grid-cols-2 justify-center items-center mt-5">
            {quickNavigations.map((item) => (
              <Link
                href={item.href}
                key={item.name}
                className="hover:shadow-lg"
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    {item.icon}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-center text-sm text-gray-400">Libraries</h1>
          <div className="gap-5 grid grid-cols-1 justify-center items-center mt-5">
            {libraries.map((item) => (
              <Link
                href={item.href}
                key={item.name}
                className="hover:shadow-lg"
              >
                <Card className="flex items-center">
                  <CardHeader>
                    <CardTitle className="text-sm">{item.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex justify-center items-center py-0 px-4">
                    {item.icon}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="mt-10">
            <h1 className="text-center text-sm text-gray-400">Configuration</h1>
            <Link
              href={"/configuration/collections"}
              key="configuration"
              className="hover:shadow-lg"
            >
              <Card className="flex items-center">
                <CardHeader>
                  <CardTitle className="text-sm">{"Collections"}</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center items-center py-0 px-4">
                  <Settings />
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        <div>
          <h1 className="text-center text-sm text-gray-400">Custom Objects</h1>
          <div className="gap-5 grid grid-cols-1 justify-center items-center mt-5">
            {customCollections.map((item, index) => (
              <Link
                href={`/custom-objects/${item}`}
                key={`item` + index}
                className="hover:shadow-lg"
              >
                <Card className="flex items-center">
                  <CardHeader>
                    <CardTitle className="text-sm">{item}</CardTitle>
                  </CardHeader>
                  {/* <CardContent className="flex justify-center items-center py-0 px-4">
                    {item.icon}
                  </CardContent> */}
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
