import { FacebookIcon, InstagramIcon, YoutubeIcon } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4 border-t py-5">
      <div className="flex flex-col gap-2">
        <h4 className=" font-bold mb-4">Tính năng, đặc điểm</h4>

        <p className=" text-gray-700 font-light hover:underline cursor-pointer">
          Trường học & Học khu
        </p>
        <p className=" text-gray-700 font-light hover:underline cursor-pointer">
          Câu hỏi cho công việc
        </p>
        <p className=" text-gray-700 font-light hover:underline cursor-pointer">
          Tạo một bài quiz
        </p>
        <p className=" text-gray-700 font-light hover:underline cursor-pointer">
          Tạo một bài học
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className=" font-bold mb-4">Môn học</h4>

        <p className=" text-gray-700 font-light hover:underline cursor-pointer">
          Toán học
        </p>
        <p className=" text-gray-700 font-light hover:underline cursor-pointer">
          Văn học
        </p>
        <p className=" text-gray-700 font-light hover:underline cursor-pointer">
          Khoa học Xã hội
        </p>
        <p className=" text-gray-700 font-light hover:underline cursor-pointer">
          Vật lí
        </p>
        <p className=" text-gray-700 font-light hover:underline cursor-pointer">
          Địa lí
        </p>
        <p className=" text-gray-700 font-light hover:underline cursor-pointer">
          Ngoại ngữ
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className=" font-bold mb-4">About</h4>

        <p className=" text-gray-700 font-light hover:underline cursor-pointer">
          Câu chuyện của chúng ta
        </p>
        <p className=" text-gray-700 font-light hover:underline cursor-pointer">
          Bộ hình ảnh/âm thanh
        </p>
        <p className=" text-gray-700 font-light hover:underline cursor-pointer">
          Sự nghiệp
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <h4 className=" font-bold mb-4">Support</h4>

        <p className=" text-gray-700 font-light hover:underline cursor-pointer">
          Câu hỏi thường gặp.
        </p>
        <p className=" text-gray-700 font-light hover:underline cursor-pointer">
          Trợ giúp & Hỗ trợ
        </p>
        <p className=" text-gray-700 font-light hover:underline cursor-pointer">
          Chính sách bảo mật
        </p>
        <p className=" text-gray-700 font-light hover:underline cursor-pointer">
          Điều khoản dịch vụ
        </p>
      </div>

      <div className="col-span-2">
        <div className="flex items-center">
          <p className="text-sm text-gray-600"> © 2024 NUC EDUCATION </p>

          <div className="ml-2 text-gray-600 flex items-center gap-2">
            <FacebookIcon size={20} />
            <YoutubeIcon size={20} />
            <InstagramIcon size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
