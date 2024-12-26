import BlogList from "@/components/root/BlogList";
import Footer from "@/components/root/Footer";
import LessonList from "@/components/root/LessonList";
import SliderHome from "@/components/root/SliderHome";
import {
  Book,
  BookAIcon,
  ConeIcon,
  FlaskConicalIcon,
  LanguagesIcon,
  LayoutPanelTopIcon,
  MapPinnedIcon,
  NotebookTabsIcon,
  RadiationIcon,
} from "lucide-react";

export default function Home() {
  return (
    <div className="w-full gap-3 px-4">
      <SliderHome />

      <div className="w-full">
        <hr />
        <h4 className="flex items-center gap-2 leading-6 font-semibold mt-2">
          <LayoutPanelTopIcon size={18} /> <span>Đa dạng môn học</span>
        </h4>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 items-center gap-4 mt-4 ">
          <div className="w-full h-20 border p-2 flex items-center gap-1 rounded-sm cursor-pointer">
            <div className="p-2 border rounded-md bg-blue-500 text-white">
              <ConeIcon size={32} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Toán học</h3>
              <p className="text-sm font-medium">120 Bài</p>
            </div>
          </div>
          <div className="w-full h-20 border p-2 flex items-center gap-1 rounded-sm cursor-pointer">
            <div className="p-2 border rounded-md bg-violet-500 text-white">
              <BookAIcon size={32} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Văn học</h3>
              <p className="text-sm font-medium">120 Bài</p>
            </div>
          </div>
          <div className="w-full h-20 border p-2 flex items-center gap-1 rounded-sm cursor-pointer">
            <div className="p-2 border rounded-md bg-pink-500 text-white">
              <FlaskConicalIcon size={32} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Hóa học</h3>
              <p className="text-sm font-medium">120 Bài</p>
            </div>
          </div>
          <div className="w-full h-20 border p-2 flex items-center gap-1 rounded-sm cursor-pointer">
            <div className="p-2 border rounded-md bg-yellow-500 text-white">
              <RadiationIcon size={32} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Vật lí</h3>
              <p className="text-sm font-medium">120 Bài</p>
            </div>
          </div>
          <div className="w-full h-20 border p-2 flex items-center gap-1 rounded-sm cursor-pointer">
            <div className="p-2 border rounded-md bg-sky-500 text-white">
              <LanguagesIcon size={32} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Tiếng anh</h3>
              <p className="text-sm font-medium">120 Bài</p>
            </div>
          </div>
          <div className="w-full h-20 border p-2 flex items-center gap-1 rounded-sm cursor-pointer">
            <div className="p-2 border rounded-md bg-green-400 text-white">
              <MapPinnedIcon size={32} />
            </div>
            <div>
              <h3 className="text-lg font-semibold">Địa lí</h3>
              <p className="text-sm font-medium">120 Bài</p>
            </div>
          </div>
        </div>

        <h4 className="flex items-center gap-2 leading-6 font-semibold mt-2">
          <NotebookTabsIcon size={18} /> <span>Bài học nổi bật</span>
        </h4>

        <div className="mt-4">
          <LessonList />
        </div>
        <h4 className="flex items-center gap-2 leading-6 font-semibold mt-2">
          <Book size={18} /> <span>Bài viết nổi bật</span>
        </h4>

        <div className="mt-4">
          <BlogList />
        </div>

        <div className="mt-4">
          <Footer />
        </div>
      </div>
    </div>
  );
}
