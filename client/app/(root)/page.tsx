import BlogList from "@/components/root/BlogList";
import Footer from "@/components/root/Footer";
import LessonList from "@/components/root/LessonList";
import SliderHome from "@/components/root/SliderHome";
import {
  Book,
  NotebookTabsIcon
} from "lucide-react";

export default function Home() {
  return (
    <div className="w-full gap-3 px-4">
      <SliderHome />

      <div className="w-full">
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
