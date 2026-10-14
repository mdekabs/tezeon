import { MainNav } from "@/components/layout/main-nav";
import { TopBar } from "@/components/layout/top-bar";

export function SiteHeader() {
  return (
    <header className="relative z-50">
      <TopBar />
      <MainNav />
    </header>
  );
}