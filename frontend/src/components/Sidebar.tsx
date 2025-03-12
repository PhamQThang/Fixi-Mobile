
import { Calendar, ChevronDown, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";

// Menu items (Updated for the Admin sidebar)
const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: Home,
    role: "admin", // Đảm bảo admin có thể truy cập
  },
  {
    title: "Quản lý sản phẩm",
    url: "/admin/products",
    icon: Search,
    role: "admin",
    submenu: [
      {
        title: "Tất cả sản phẩm",
        url: "/admin/products/all",
      },
      {
        title: "Thêm sản phẩm mới",
        url: "/admin/products/add",
      },
    ],
  },
  {
    title: "Quản lý đơn hàng",
    url: "/admin/orders",
    icon: Inbox,
    role: "admin",
    submenu: [
      {
        title: "Đơn hàng chờ xử lý",
        url: "/admin/orders/pending",
      },
      {
        title: "Đơn hàng đã xử lý",
        url: "/admin/orders/processed",
      },
    ],
  },
  {
    title: "Quản lý khách hàng",
    url: "/admin/customers",
    icon: Calendar,
    role: "admin",
    submenu: [
      {
        title: "Danh sách khách hàng",
        url: "/admin/customers/list",
      },
      {
        title: "Thêm khách hàng mới",
        url: "/admin/customers/add",
      },
    ],
  },
  {
    title: "Quản lý nhân viên",
    url: "/admin/staff",
    icon: Settings,
    role: "admin",
    submenu: [
      {
        title: "Danh sách nhân viên",
        url: "/admin/staff/list",
      },
      {
        title: "Thêm nhân viên mới",
        url: "/admin/staff/add",
      },
    ],
  },
  {
    title: "Khuyến mãi",
    url: "/admin/promotions",
    icon: Search,
    role: "admin",
  },
  {
    title: "Cài đặt",
    url: "/admin/settings",
    icon: Settings,
    role: "admin",
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarGroup>
          <SidebarGroupLabel>Quản lý hệ thống</SidebarGroupLabel>

        </SidebarGroup>
          {items.map((item) => (
            <Collapsible key={item.title} defaultOpen={false} className="group/collapsible ">
        <SidebarGroup>
              <SidebarGroupLabel asChild>
                <CollapsibleTrigger>
                {item.icon && <item.icon className="w-6 h-6 mr-2" />}
                  {item.title}
                  <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
              </SidebarGroupLabel>

              {item.submenu && (
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {item.submenu.map((subItem) => (
                        <SidebarMenuItem key={subItem.title}>
                          <SidebarMenuButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              )}
        </SidebarGroup>
            </Collapsible>
          ))}
    </Sidebar>
  );
}
