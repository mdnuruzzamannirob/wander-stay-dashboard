import Sidebar from '@/components/layout/Sidebar';
import { SidebarProvider } from '@/contexts/sidebar';

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <SidebarProvider>
        <Sidebar />

        <main className="flex-1 overflow-y-auto">{children}</main>
      </SidebarProvider>
    </div>
  );
}
