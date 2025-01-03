import { cn } from "@/lib/utils";
import { ChangeSearch, SearchQuizPaging } from "@/types/system.type";
import { EarthIcon, FileKeyIcon, HeartIcon, UserRoundIcon } from "lucide-react";

interface IProps {
  handleChangeSearch: (value: ChangeSearch) => void;
  searchObject: SearchQuizPaging;
}

const LibrarySidebar = ({ handleChangeSearch, searchObject }: IProps) => {
  return (
    <div className="col-span-12 sm:col-span-3 sticky top-0 px-2">
      <section>
        <header>
          <h4 className="text-8 mb-4 text-xl font-semibold text-gray-600">
            Thư viện của tôi
          </h4>
        </header>

        <div className="flex flex-col gap-2">
          <div
            className={cn(
              "w-full px-2 py-1 rounded-md bg-white hover:shadow-md cursor-pointer flex items-center gap-2 text-gray-600 box-shadow",
              searchObject?.isPublic === undefined &&
                !searchObject?.isLoved &&
                "text-blue-500 !shadow-md"
            )}
            onClick={() => {
              handleChangeSearch({
                isPublic: undefined,
                isLoved: undefined,
                pageIndex: 1,
              });
            }}
          >
            <UserRoundIcon size={16} />
            <span>Tất cả bài tập đã tạo</span>
          </div>
          <div
            className={cn(
              "w-full px-2 py-1 rounded-md bg-white hover:shadow-md cursor-pointer flex items-center gap-2 text-gray-600 box-shadow",
              searchObject?.isPublic && "text-blue-500 !shadow-md"
            )}
            onClick={() => {
              handleChangeSearch({
                isPublic: true,
                pageIndex: 1,
                isLoved: undefined,
              });
            }}
          >
            <EarthIcon size={16} />
            <span>Được đăng tải</span>
          </div>
          <div
            className={cn(
              "w-full px-2 py-1 rounded-md bg-white hover:shadow-md cursor-pointer flex items-center gap-2 text-gray-600 box-shadow",
              searchObject?.isPublic === false && "text-blue-500 !shadow-md"
            )}
            onClick={() => {
              handleChangeSearch({
                isPublic: false,
                pageIndex: 1,
                isLoved: undefined,
              });
            }}
          >
            <FileKeyIcon size={16} />
            <span>Chưa đăng tải</span>
          </div>
          <div
            className={cn(
              "w-full px-2 py-1 rounded-md bg-white hover:shadow-md cursor-pointer flex items-center gap-2 text-gray-600 box-shadow",
              searchObject?.isLoved && "text-blue-500 !shadow-md"
            )}
            onClick={() => {
              handleChangeSearch({
                isLoved: true,
                isPublic: undefined,
                pageIndex: 1,
              });
            }}
          >
            <HeartIcon size={16} />
            <span>Được yêu thích</span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LibrarySidebar;
