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
import listMenuClient from "@/config/MenuConfig";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Logo from "../header/Logo";
import ButtonCreateQuiz from "./ButtonCreateQuiz";
const SIDEBAR_WIDTH_MOBILE = "18rem";

export function AppSidebar() {
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
          <div className="p-1 space-y-2">
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
            <SidebarLabel title="Tạo câu hỏi" />
            <ButtonCreateQuiz />
            <SidebarLabel title="Danh mục" />
            <SidebarList />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <div className="fixed top-0 left-0 bottom-0 hidden lg:block">
      <ScrollArea className="h-full w-[--sidebar-width] lg:border-r border-dashed pb-4 bg-white">
        <div className="p-1 space-y-2">
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
          <SidebarLabel title="Tạo câu hỏi" />
          <ButtonCreateQuiz />
          <SidebarLabel title="Danh mục" />
          <SidebarList />
        </div>
      </ScrollArea>
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
          "h-10 px-2 group py-3 gap-2 flex items-center hover:bg-[rgba(24,119,242,0.08)] rounded-md cursor-pointer mt-2",
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
      {listMenuClient?.map((item, index) => {
        if (item.children) {
          return (
            <Accordion
              type="multiple"
              className=""
              key={`${index}-${item.link}`}
            >
              <AccordionItem value="item-1" className="border-none pt-2">
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
                        path={`/${item.link}${row.link}`}
                        isAction={location === `/${item.link}${row.link}`}
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
            path={`${item.link}`}
            isAction={location === `${item.link}`}
            isParent
          />
        );
      })}
    </div>
  );
};
