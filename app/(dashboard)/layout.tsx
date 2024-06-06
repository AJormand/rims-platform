import { NavbarRoutes } from "@/components/navbar-routes";
//import { TopNavigationBar } from "@/components/top-navigation-bar";
import { TopNavigationBar } from "@/components/top-navigation-bar";

export default function DashBoardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <NavbarRoutes />
      <TopNavigationBar />
      {children}
    </section>
  );
}
