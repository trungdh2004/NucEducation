import Logo from "@/components/root/header/Logo";
import { Button } from "@/components/ui/button";
import { CopyIcon, LinkIcon } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

const page = () => {
  return (
    <div className="w-full min-h-screen bg-[url(/summer_theme_bg1.png)] bg-no-repeat bg-cover bg-center">
      <div className="stick top-0 w-full h-20 bg-black/80 flex items-center justify-between px-4">
        <div>
          <Logo className="size-12" />
        </div>

        <div>
          <Button variant={"destructive"}>Kết thúc</Button>
        </div>
      </div>

      <div className="max-w-md md:max-w-3xl bg-black/80 rounded-b-2xl border border-gray-500 mx-auto p-2 md:p-4 flex flex-col md:flex-row items-center gap-2">
        <div className="flex-1 bg-gray-500/20 rounded-b-xl p-2 md:p-4 w-full">
          <div className="flex items-center border-b py-4 px-2">
            <div className="size-8 md:size-10 rounded-full bg-gray-500/30 flex items-center justify-center text-white">
              1
            </div>
            <div className="flex-1 flex items-center px-2 justify-center gap-1 text-white group cursor-pointer">
              <div className="text-xl md:text-4xl group-hover:underline">
                join
              </div>
              <div className="text-xl md:text-4xl group-hover:underline">
                nucEducation
              </div>
              <div className="text-xl md:text-4xl group-hover:underline">
                .com
              </div>
            </div>
            <div className="size-8 md:size-12 text-white flex items-center justify-center bg-gray-500/30 rounded-md">
              <LinkIcon />
            </div>
          </div>
          <div className="flex items-center py-4 px-2">
            <div className="size-8 md:size-10 rounded-full bg-gray-500/30 flex items-center justify-center text-white">
              2
            </div>
            <div className="flex-1 flex items-center px-2 justify-center gap-1 text-white group cursor-pointer">
              <div className="text-xl md:text-4xl space-x-2">0697845</div>
            </div>
            <div className="size-8 md:size-12 text-white flex items-center justify-center bg-gray-500/30 rounded-md">
              <CopyIcon />
            </div>
          </div>
        </div>
        <div className="size-28 md:size-40 bg-gray-500/20 rounded-md md:rounded-b-xl p-2 flex items-center justify-center">
          <QRCodeSVG
            value="https://www.npmjs.com/package/qrcode"
            level={"H"}
            size={150}
            bgColor={"transparent"}
            fgColor={"#fff"}
          />
        </div>
      </div>

      <div className="max-w-4xl mx-auto  mt-4 p-2 rounded-md text-center">
        <h4 className="text-center text-xl  md:text-2xl font-semibold text-white bg-black/50 inline-block px-4 py-3 rounded-full">
          Danh sách người tham gia
        </h4>

        <div className="mt-4 flex flex-wrap justify-center gap-4">
          <div className="px-4 py-2 md:py-4 md:px-6 rounded-full bg-black/60 text-sm text-white">
            Đỗ Hữu Trung
          </div>
          <div className="px-4 py-2 md:py-4 md:px-6 rounded-full bg-black/60 text-sm text-white">
            Đỗ Hữu Trung
          </div>
          <div className="px-4 py-2 md:py-4 md:px-6 rounded-full bg-black/60 text-sm text-white">
            Đỗ Hữu Trung
          </div>
          <div className="px-4 py-2 md:py-4 md:px-6 rounded-full bg-black/60 text-sm text-white">
            Đỗ Hữu Trung
          </div>
          <div className="px-4 py-2 md:py-4 md:px-6 rounded-full bg-black/60 text-sm text-white">
            Đỗ Hữu Trung
          </div>
          <div className="px-4 py-2 md:py-4 md:px-6 rounded-full bg-black/60 text-sm text-white">
            Đỗ Hữu Trung
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
