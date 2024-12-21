import { SidebarLayout } from "@/components/ui";
import { DashboardSidebar } from "./DashboardSidebar";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  return (
    <SidebarLayout SidebarComponent={DashboardSidebar}>
      <Outlet />
    </SidebarLayout>
  );
};
