import Image from "next/image";

const BlogItem = () => {
  return (
    <div className="w-full border shadow-sm overflow-hidden rounded-xl min-h-20 bg-gradient-to-tr from-gray-200 to-gray-50 flex-shrink-0 cursor-grabbing hover:shadow-md">
      <div className="w-full h-full">
        <div className="h-40 relative">
          <Image
            src={"/banner-lesson2.png"}
            alt=""
            width={100}
            height={100}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="h-24 relative bg-white">
          <div className="w-full h-full p-2 px-4 flex flex-col justify-between">
            <h2 className="text-lg leading-6 font-semibold line-clamp-2 ">
              Áo phao rất đẹp bạn muốn như thế nào
            </h2>
            <div className="w-full flex items-end justify-between">
              <div className="flex items-end gap-1">
                <div className="size-7 rounded-full overflow-hidden">
                  <Image
                    src={"/avatar.jpg"}
                    alt=""
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="line-clamp-1 max-w-28 text-sm text-gray-600">
                  Đỗ Hữu Trung
                </p>
              </div>
              <div className="text-xs font-normal text-gray-400">
                13-12-2024
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogItem;
