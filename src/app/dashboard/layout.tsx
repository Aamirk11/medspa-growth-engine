import { Sidebar } from "@/components/dashboard/sidebar";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { Header } from "@/components/dashboard/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <MobileNav />

      <div className="lg:pl-64">
        <Header />
        <main className="px-4 py-6 pb-20 sm:px-6 lg:px-8 lg:pb-6">
          {children}
        </main>
      </div>
    </div>
  );
}
