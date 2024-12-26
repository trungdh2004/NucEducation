"use client";
import { logoutApi } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuthContext } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const HeaderUser = ({ isAdmin = false }: { isAdmin?: boolean }) => {
  const router = useRouter();
  const { user, isLogin, setUser, setIsLogin } = useAuthContext();

  const handleLogOut = async () => {
    try {
      await logoutApi();
      router.push("/auth/login");
      setUser(undefined);
      setIsLogin(false);
    } catch (error: unknown) {
      console.log("error logout", error);

      toast.error("Đăng xuất thất bại");
    }
  };

  return (
    <div className="flex items-center gap-2">
      {isLogin ? (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              border={"notActive"}
              variant={"outline"}
              className="p-0 rounded-full gap-0 size-9"
            >
              <Image
                src={user?.avatar || "/avatar.jpg"}
                alt="avatar"
                width={30}
                height={30}
                className="w-full h-full rounded-full"
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end" className="w-56">
            <DropdownMenuLabel className="w-full">
              <div className="w-full flex items-center">
                <div className="size-8 rounded-full flex-shrink-0 border">
                  <Image
                    src={user?.avatar || "/avatar.jpg"}
                    alt="avatar"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>

                <div className="flex-1 ml-1 overflow-hidden">
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="line-clamp-1 w-full text-xs font-normal text-gray-400 block truncate">
                    {user?.email}
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>
            {!isAdmin && (
              <Link href={"/admin"}>
                <DropdownMenuItem className="cursor-pointer">
                  Trang quản trị
                </DropdownMenuItem>
              </Link>
            )}
            {isAdmin && (
              <Link href={"/"}>
                <DropdownMenuItem className="cursor-pointer">
                  Trang chủ
                </DropdownMenuItem>
              </Link>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Hồ sơ
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Cài đặt
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="cursor-pointer focus:text-rose-500 focus:bg-rose-100/50"
              onClick={handleLogOut}
            >
              Đăng xuất
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href={"/auth/login"}>
          <Button border={"notActive"}>Đăng nhập</Button>
        </Link>
      )}

      {/* </Link> */}
    </div>
  );
};

export default HeaderUser;
