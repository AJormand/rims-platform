import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  const quickNavigations = [
    {
      name: "Products",
      href: "/products",
    },
    {
      name: "Registrations",
      href: "/registrations",
    },
    {
      name: "Applications",
      href: "/applications",
    },
    {
      name: "Submissions",
      href: "/submissions",
    },
  ];

  return (
    <div className="flex justify-center gap-5 ">
      {quickNavigations.map((item) => (
        <Link href={item.href}>
          <Card>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
              <CardDescription>Card Description</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Card Content</p>
            </CardContent>
            <CardFooter>
              <p>Card Footer</p>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}
