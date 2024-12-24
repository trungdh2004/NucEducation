import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { BellIcon } from "lucide-react";
import SearchCodeClient from "./SearchCodeClient";
import dynamic from "next/dynamic";

const HeaderUser = dynamic(() => import("./HeaderUser"), {
  loading: () => <p>Loading...</p>,
  ssr: true,
});

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

        <HeaderUser />
      </div>
    </div>
  );
};

export default Header;
