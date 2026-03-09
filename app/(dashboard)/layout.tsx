import { DashboardSidebar } from "@/components/layout/dashboard-sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-accent/20">
      <DashboardSidebar />
      <main id="main" className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
}
