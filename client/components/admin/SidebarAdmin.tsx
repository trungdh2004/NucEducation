/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useSidebar } from "@/components/ui/sidebar";
import listMenuAdmin from "@/config/menuAdmin";
import { cn } from "@/lib/utils";
import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  HomeIcon,
  LogOut,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Logo from "../root/header/Logo";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
const SIDEBAR_WIDTH_MOBILE = "18rem";

export function SidebarAdmin() {
  const { isMobile, openMobile, setOpenMobile } = useSidebar();

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent
          data-sidebar="sidebar"
          data-mobile="true"
          className="w-[--sidebar-width] bg-sidebar p-0 text-sidebar-foreground [&>button]:hidden"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={"left"}
        >
          <div className="hidden">
            <SheetTitle></SheetTitle>
          </div>
          <div className="flex h-full w-full flex-col p-2">
            <div className="p-1 space-y-2 flex flex-col h-full">
              <div className="w-full h-12 border flex items-center px-2 rounded-sm">
                <div>
                  <Logo className="size-10" />
                </div>
                <div className="flex-1 pl-2">
                  <p className="text-sm font-semibold leading-5">
                    NUC Education
                  </p>
                  <p className="line-clamp-1 text-xs text-gray-500">
                    Cùng làm bài tập nào !!!
                  </p>
                </div>
              </div>
              <SidebarLabel title="Danh mục" />
              <ScrollArea className="flex-1">
                <SidebarList />
              </ScrollArea>
              <SidebarFooter />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="fixed top-0 left-0 bottom-0 hidden lg:block">
      <div className="h-full w-[--sidebar-width] lg:border-r border-dashed pb-1 bg-main">
        <div className="p-1 space-y-2 flex flex-col h-full">
          <div className="w-full h-12 border flex items-center px-2 rounded-sm">
            <div>
              <Logo className="size-10" />
            </div>
            <div className="flex-1 pl-2">
              <p className="text-sm font-semibold leading-5">NUC Education</p>
              <p className="line-clamp-1 text-xs text-gray-500">
                Cùng làm bài tập nào !!!
              </p>
            </div>
          </div>
          <SidebarLabel title="Danh mục" />
          <ScrollArea className="flex-1">
            <SidebarList />
          </ScrollArea>
          <SidebarFooter />
        </div>
      </div>
    </div>
  );
}

function SidebarLabel({ title }: { title: string }) {
  return (
    <div className="w-full text-gray-400 text-xs font-normal text-sidebar-foreground/70 px-2">
      {title}
    </div>
  );
}

interface Props {
  Icon?: LucideIcon;
  label: string;
  path: string;
  isAction: boolean;
  isParent?: boolean;
}

const SidebarItem = ({ Icon, label, path, isAction, isParent }: Props) => {
  return (
    <Link href={path}>
      <div
        className={cn(
          "h-10 px-2 group py-3 gap-2 flex items-center hover:bg-[rgba(24,119,242,0.08)] rounded-md cursor-pointer mb-2",
          isAction && "bg-[rgba(24,119,242,0.08)]",
          isParent && "font-semibold"
        )}
      >
        {!!Icon && (
          <Icon
            className={cn(
              "group-hover:text-blue-500 text-[#4b5563]",
              isAction && "text-blue-500"
            )}
            size={18}
          />
        )}

        <span
          className={cn(
            "group-hover:text-blue-500 text-[#4b5563] text-sm",
            isAction && "text-blue-500"
          )}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const SidebarList = () => {
  const location = usePathname();

  return (
    <div>
      {listMenuAdmin?.map((item, index) => {
        if (item.children) {
          return (
            <Accordion
              type="multiple"
              className=""
              key={`${index}-${item.link}`}
            >
              <AccordionItem value="item-1" className="border-none mb-2">
                <AccordionTrigger className="pb-2 border-b-none h-10 w-full px-2 group py-3 gap-2 flex items-center hover:bg-[rgba(24,119,242,0.08)] rounded-md cursor-pointer">
                  <p className="text-sm font-semibold text-[#4b5563] group-hover:text-blue-500 cursor-pointer flex items-center gap-2">
                    {!!item.icon && (
                      <item.icon
                        className={cn(
                          "group-hover:text-blue-500 text-[#4b5563]"
                          // isAction && "text-blue-500"
                        )}
                        size={18}
                      />
                    )}
                    {item.title}
                  </p>
                </AccordionTrigger>
                <AccordionContent className="pb-0 pl-2" datatype="open">
                  <div className="space-y-1  mt-2 ">
                    {item.children.map((row: any, index2: number) => (
                      <SidebarItem
                        key={`${index2}-${index}`}
                        label={row.title}
                        Icon={row?.icon}
                        path={`/admin${item.link}${row.link}`}
                        isAction={location === `/admin${item.link}${row.link}`}
                      />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        }

        return (
          <SidebarItem
            key={`${item.link}-${index}`}
            label={item.title}
            Icon={item.icon}
            path={`/admin${item.link}`}
            isAction={location === `${item.link}`}
            isParent
          />
        );
      })}
    </div>
  );
};

const SidebarFooter = () => {
  const { isMobile } = useSidebar();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="text-sidebar-accent-foreground w-full flex items-center bg-gray-50 p-1 rounded-sm gap-1 cursor-pointer">
          <Avatar className="h-8 w-8 rounded-lg">
            <AvatarImage src={"avatar.jpg"} alt={"avt"} />
            <AvatarFallback className="rounded-lg">CN</AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate leading-5">Đỗ Hữu Trung</span>
            <span className="truncate text-xs leading-4">trung nè</span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
        side={isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              {/* <AvatarImage src={user.avatar} alt={user.name} /> */}
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">
                {/* {user.name} */}
                trung nè
              </span>
              <span className="truncate text-xs">trung nè</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={"/"}>
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <HomeIcon />
              Trang chủ
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheck />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCard />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Bell />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
