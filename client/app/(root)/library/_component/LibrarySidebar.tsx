import {
  EarthIcon,
  FileKeyIcon,
  HeartIcon,
  UserRoundIcon
} from "lucide-react";

const LibrarySidebar = () => {
  return (
    <div className="col-span-12 sm:col-span-3 sticky top-0 px-2">
      <section>
        <header>
          <h4 className="text-8 mb-4 text-xl font-semibold text-gray-600">
            Thư viện của tôi
          </h4>
        </header>

        <div className="flex flex-col gap-2">
          <div className="w-full px-2 py-1 rounded-md bg-white hover:shadow-md cursor-pointer flex items-center gap-2 text-gray-600 box-shadow">
            <UserRoundIcon size={16} />
            <span>Tất cả bài tập đã tạo</span>
          </div>
          <div className="w-full px-2 py-1 rounded-md bg-white hover:shadow-md cursor-pointer flex items-center gap-2 text-gray-600 box-shadow">
            <EarthIcon size={16} />
            <span>Được đăng tải</span>
          </div>
          <div className="w-full px-2 py-1 rounded-md bg-white hover:shadow-md box-shadow cursor-pointer flex items-center gap-2 text-gray-600">
            <FileKeyIcon size={16} />
            <span>Chưa đăng tải</span>
          </div>
          <div className="w-full px-2 py-1 rounded-md bg-white hover:shadow-md box-shadow cursor-pointer flex items-center gap-2 text-gray-600">
            <HeartIcon size={16} />
            <span>Được yêu thích</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LibrarySidebar;
