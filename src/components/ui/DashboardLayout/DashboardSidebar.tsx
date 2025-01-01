import {
  ChevronUp,
  LayoutList,
  Receipt,
  ScrollText,
  User2,
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  SidebarComponentType,
} from "@/components/ui";
import { useUserInfoContext } from "@/hooks";
import { NAVIGATION_ROUTES } from "@/constants/apis";

const items = [
  {
    title: "Users",
    url: NAVIGATION_ROUTES.USERS,
    icon: Users,
  },
  {
    title: "Products",
    url: NAVIGATION_ROUTES.PRODUCTS,
    icon: LayoutList,
  },
  {
    title: "Orders",
    url: NAVIGATION_ROUTES.ORDERS,
    icon: Receipt,
  },
  {
    title: "Reports",
    url: NAVIGATION_ROUTES.REPORTS,
    icon: ScrollText,
  },
];

export const DashboardSidebar: SidebarComponentType = () => {
  const { user } = useUserInfoContext();
  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Admin Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {user && (
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="max-w-full flex-nowrap">
                    <User2 />
                    <p className="overflow-hidden text-ellipsis">{user.name}</p>
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <span>Account</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}
    </Sidebar>
  );
};
