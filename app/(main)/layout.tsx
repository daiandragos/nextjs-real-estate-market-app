import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main id="mai" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
