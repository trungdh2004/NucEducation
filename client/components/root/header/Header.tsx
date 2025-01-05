import { Button } from "@/components/ui/button";
import { BellIcon } from "lucide-react";
import dynamic from "next/dynamic";
import HeaderTrigger from "./HeaderTrigger";
import SearchCodeClient from "./SearchCodeClient";

const HeaderUser = dynamic(() => import("./HeaderUser"), {
  loading: () => <p>Loading...</p>,
  ssr: true,
});

const Header = () => {
  return (
    <div className="flex items-center px-2 w-full h-14 border-b sticky top-0 bg-white justify-between z-50">
      <div>
        <HeaderTrigger />
      </div>

      <div className="flex items-center gap-3">
        <div>
          <SearchCodeClient />
        </div>

        <Button variant={"outline"} size={"icon"} border={"notActive"}>
          <BellIcon size={20} />
        </Button>

        <HeaderUser />
      </div>
    </div>
  );
};

export default Header;
