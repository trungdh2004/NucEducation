import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { BellIcon } from "lucide-react";
import Image from "next/image";
import SearchCodeClient from "./SearchCodeClient";

const Header = () => {
  return (
    <div className="flex items-center px-2 w-full h-14 border-b sticky top-0 bg-white justify-between z-50">
      <div>
        <SidebarTrigger className="p-2" />
      </div>

      <div className="flex items-center gap-3">
        <SearchCodeClient />

        <Button variant={"outline"} size={"icon"} border={"notActive"}>
          <BellIcon size={20} />
        </Button>
        <Button border={"notActive"}>Đăng nhập</Button>

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              border={"notActive"}
              variant={"outline"}
              className="p-0 rounded-full gap-0 size-9"
            >
              <Image
                src={"/avatar.jpg"}
                alt="avatar"
                width={30}
                height={30}
                className="w-full h-full rounded-full"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end" className="w-56">
            <DropdownMenuLabel>Đỗ Hữu Trung</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Hồ sơ</DropdownMenuItem>
            <DropdownMenuItem>Cài đặt</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
