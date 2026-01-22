import React from "react";

import { AppSidebar } from "@/components/admin/app-siderbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";


import PopOver from "@/components/admin/pop-over";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <SidebarProvider>
      <AppSidebar />

      <main className="w-full min-h-screen">
        {/* Header */}
        <div className="shadow-sm w-full flex items-center justify-between p-4">
          <SidebarTrigger />

          {/* Avatar Popover */}
          <PopOver />
        </div>

        {/* Page Content */}
        <div className="p-4">{children}</div>
      </main>
    </SidebarProvider>
  );
}
