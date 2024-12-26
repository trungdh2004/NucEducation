import BlogItem from "./BlogItem";

const BlogList = () => {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <BlogItem />
        <BlogItem />
      </div>

      <div className="w-full flex items-center justify-center py-4 text-sm text-gray-500">
        <span className="hover:underline cursor-pointer">Xem tất cả</span>
      </div>
    </div>
  );
};

export default BlogList;
