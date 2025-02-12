import ReactPaginate from "react-paginate";
import { cn } from "@/lib/utils";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface Props {
  pageCount: number;
  handlePageClick: ({ selected }: { selected: number }) => void;
  size?: "sm" | "md";
  forcePage: number;
  marginPagesDisplayed?: number;
  className?: string;
}

function Paginations({
  pageCount,
  handlePageClick,
  size = "md",
  forcePage = 0,
  marginPagesDisplayed = 2,
  className,
}: Props) {
  return (
    <div className={className}>
      {" "}
      {pageCount > 0 ? (
        <ReactPaginate
          forcePage={forcePage}
          breakLabel=". . ."
          nextLabel={<ChevronRightIcon />}
          onPageChange={handlePageClick}
          pageRangeDisplayed={1}
          marginPagesDisplayed={marginPagesDisplayed}
          pageCount={pageCount}
          previousLabel={<ChevronLeftIcon />}
          renderOnZeroPageCount={null}
          pageLinkClassName={cn(
            "border w-8 h-8  flex items-center justify-center rounded-md hover:bg-gray-100",
            size === "md" && "md:w-10 md:h-10",
            size === "sm" && "md:w-8 md:h-8"
          )}
          previousLinkClassName={cn(
            "border w-8 h-8  flex items-center justify-center rounded-md hover:bg-gray-100",
            size === "md" && "md:w-10 md:h-10",
            size === "sm" && "md:w-8 md:h-8"
          )}
          nextLinkClassName={cn(
            "border w-8 h-8  flex items-center justify-center rounded-md hover:bg-gray-100",
            size === "md" && "md:w-10 md:h-10",
            size === "sm" && "md:w-8 md:h-8"
          )}
          disabledLinkClassName={
            "border-zinc-200 cursor-not-allowed text-zinc-200"
          }
          breakLinkClassName={cn(
            "border w-8 h-8  flex items-end justify-center rounded-md hover:bg-gray-100",
            size === "md" && "md:w-10 md:h-10",
            size === "sm" && "md:w-8 md:h-8"
          )}
          activeLinkClassName={"border-blue-500  text-blue-500 font-medium"}
          containerClassName={"flex gap-1"}
        />
      ) : (
        <div className="flex gap-1">
          <button
            className={cn(
              "border w-8 h-8  flex items-center justify-center rounded-md p-0 border-zinc-200 cursor-not-allowed text-zinc-200"
            )}
            disabled
          >
            <ChevronLeftIcon />
          </button>
          <button
            className={cn(
              "border w-8 h-8  flex items-center justify-center rounded-md p-0 border-blue-500  text-blue-500 font-medium cursor-pointer"
            )}
          >
            1
          </button>
          <button
            className={cn(
              "border w-8 h-8  flex items-center justify-center rounded-md p-0 border-zinc-200 cursor-not-allowed text-zinc-200"
            )}
            disabled
          >
            <ChevronRightIcon />
          </button>
        </div>
      )}
    </div>
  );
}

export default Paginations;
