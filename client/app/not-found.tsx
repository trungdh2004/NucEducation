import { Button } from "@/components/ui/button";
import { HouseIcon } from "lucide-react";
import Link from "next/link";
export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex flex-col gap-2 items-center justify-center">
      <h1 className="text-6xl font-black lg:text-9xl text-blue-500 ">404</h1>
      <h2 className="text-2xl font-black">Không tìm thấy nội dung</h2>
      <p className="text-gray-500">
        URL của nội dung này đã bị thay đổi hoặc không còn tồn tại.
      </p>
      <p className="text-gray-500">
        Nếu bạn đang lưu URL này, hãy thử truy cập lại từ trang chủ thay vì dùng
        URL đã lưu.
      </p>
      <Link href="/">
        <Button>
          <HouseIcon size={20} /> Trở về trang chủ
        </Button>
      </Link>
    </div>
  );
}
