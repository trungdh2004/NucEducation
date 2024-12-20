"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import listMenu from "@/config/MenuConfig";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../header/Logo";
import SearchCode from "../header/SearchCode";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathName = usePathname();
  const { isMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent gap-0 data-[state=open]:text-sidebar-accent-foreground border"
            >
              <div className="flex aspect-square size-10 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                <Logo />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-blue-500">
                  NucEdu
                </span>
                <span className="truncate text-xs">
                  Cùng làm bài tập nào !!!
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        <SidebarGroup>
          <SidebarGroupLabel>Học nào</SidebarGroupLabel>
          <SidebarGroupContent>
            {listMenu?.map((item, index) => (
              <AppSidebarItem
                key={`${index}-${item.link}`}
                icon={item.icons}
                title={item.title}
                link={item.link}
                isActive={pathName === item.link}
              />
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      {isMobile && (
        <SidebarFooter>
          <SearchCode />
        </SidebarFooter>
      )}
      <SidebarRail />
    </Sidebar>
  );
}

interface IPropsItem {
  icon: LucideIcon;
  title: string;
  link: string;
  isActive?: boolean;
}

function AppSidebarItem({ icon: Icon, title, link, isActive }: IPropsItem) {
  const { isMobile, open } = useSidebar();

  if (!open && !isMobile) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={link} className="cursor-pointer block mb-1">
            <div
              className={cn(
                "h-10 w-full hover:bg-blue-50 hover:text-blue-500 flex items-center rounded-sm gap-0",
                isActive && "bg-blue-50 text-blue-500"
              )}
            >
              <div className="size-10 flex items-center justify-center">
                <Icon size={20} />
              </div>
              <span className={cn(!open && !isMobile && "hidden")}>
                {title}
              </span>
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="left" className="bg-blue-50 text-blue-500">
          {title}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <Link href={link} className="cursor-pointer block mb-1">
      <div
        className={cn(
          "h-10 w-full hover:bg-blue-50 hover:text-blue-500 flex items-center rounded-sm gap-0",
          isActive && "bg-blue-50 text-blue-500"
        )}
      >
        <div className="size-10 flex items-center justify-center">
          <Icon size={20} />
        </div>
        <span className={cn(!open && !isMobile && "hidden")}>{title}</span>
      </div>
    </Link>
  );
}
