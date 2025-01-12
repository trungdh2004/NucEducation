"use client";
import { unDeleteCateApi } from "@/actions/category.action";
import { pagingQuizDiApi } from "@/actions/quiz.action";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import TableComponent from "@/components/common/TableComponet";
import TooltipComponent from "@/components/common/TooltipComponent";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getDifficulty } from "@/config/appQuestion";
import { getRank } from "@/config/rank.config";
import { CateResponse } from "@/types/Category.type";
import { CreateBy, IQuizResponse } from "@/types/quizz.type";
import {
  ChangeSearch,
  Response,
  SearchQuizDiPaging,
} from "@/types/system.type";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import QuizHeader from "./QuizHeader";
import { useRouter } from "next/navigation";
// import CategoryForm from "./CategoryForm";
// import CategoryHeader from "./CategoryHeader";
const QuizTable = () => {
  const router = useRouter();
  const [searchObject, setSearchObject] = useState<SearchQuizDiPaging>({
    pageIndex: 1,
    pageSize: 5,
    keyword: "",
    sort: -1,
    deleted: false,
  });
  const [response, setResponse] = useState<Response<IQuizResponse>>({
    pageIndex: 1,
    pageSize: 5,
    totalAllOptions: 0,
    totalPages: 0,
    totalOptionPage: 0,
    content: [],
  });
  const [loading, setLoading] = useState(false);
  const [openUnConfirm, setOpenUnConfirm] = useState<string>("");

  const handlePaging = async (request: SearchQuizDiPaging) => {
    try {
      setLoading(true);
      const data = await pagingQuizDiApi(request);
      setResponse(data);
    } catch (error: unknown) {
      const err = error as Error;
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handlePaging(searchObject);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeSearch = (value: ChangeSearch) => {
    const valueOld = searchObject;

    const searchNew = {
      ...valueOld,
      ...value,
    };
    setSearchObject(searchNew);
    handlePaging(searchNew);
  };

  const columns: ColumnDef<IQuizResponse>[] = [
    {
      accessorKey: "name",
      header: "Tên môn học",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "image",
      header: "Ảnh",
      cell: ({ row }) => (
        <div className="size-10">
          <Image
            src={row.getValue("image")}
            alt="category"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
      ),
    },
    {
      accessorKey: "difficulty",
      header: "Độ khó",
      cell: ({ row }) => (
        <div>{getDifficulty(row.getValue("difficulty") as number)?.name}</div>
      ),
    },
    {
      accessorKey: "level",
      header: "Lớp",
      cell: ({ row }) => (
        <div>{getRank(row.getValue("level") as number)?.name}</div>
      ),
    },
    {
      accessorKey: "category",
      header: "Môn",
      cell: ({ row }) => (
        <div>{(row.getValue("category") as CateResponse)?.name}</div>
      ),
    },
    {
      accessorKey: "isPublic",
      header: "Công khai",
      cell: ({ row }) => (
        <div>{row.getValue("isPublic") ? "Xuất bản" : "Chưa xuất bản"}</div>
      ),
    },
    {
      accessorKey: "createBy",
      header: "Người tạo",
      cell: ({ row }) => {
        return (
          <div className="size-10">
            <TooltipComponent
              label={(row.getValue("createBy") as CreateBy)?.name}
            >
              <Image
                src={(row.getValue("createBy") as CreateBy)?.avatar}
                alt="avatar"
                width={40}
                height={40}
                className="object-cover rounded-full"
              />
            </TooltipComponent>
          </div>
        );
      },
    },
    {
      accessorKey: "action",
      header: () => <div className="w-20">Thao tác</div>,
      cell: ({ row }) => {
        console.log("deleted", row.getValue("deleted"));

        return (
          <div className="flex gap-2">
            <TooltipComponent label="Sửa">
              <Button
                size={"icon"}
                variant={"default"}
                onClick={() => {
                  router.push(`/admin/quiz/${row.original._id}`);
                }}
              >
                <Eye />
              </Button>
            </TooltipComponent>

            {row.original.deleted && (
              <TooltipComponent label="Bỏ ẩn">
                <Button
                  size={"icon"}
                  variant={"destructive"}
                  onClick={() => {
                    setOpenUnConfirm(row.original._id);
                  }}
                >
                  <Trash2Icon />
                </Button>
              </TooltipComponent>
            )}
          </div>
        );
      },
      enableHiding: false,
      size: 50,
    },
  ];

  return (
    <div className=" ">
      <QuizHeader handleChange={handleChangeSearch} />

      <Tabs value={`${searchObject.deleted}`} className="w-full mb-2">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="false"
            onClick={() => {
              handleChangeSearch({
                deleted: false,
                pageIndex: 1,
              });
            }}
          >
            Hoạt động
          </TabsTrigger>
          <TabsTrigger
            value="true"
            onClick={() => {
              handleChangeSearch({
                deleted: true,
                pageIndex: 1,
              });
            }}
          >
            Đã xóa
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="bg-white rounded-md">
        <TableComponent
          data={response.content}
          columns={columns}
          pageCount={response.totalPages}
          pageIndex={searchObject.pageIndex}
          totalElement={response.totalAllOptions}
          pageSize={searchObject.pageSize}
          handleChangePage={(value) => {
            handleChangeSearch({ pageIndex: value.selected + 1 });
          }}
          handleChangePageSize={(value) => {
            console.log("size", value);
            handleChangeSearch({ pageSize: value, pageIndex: 1 });
          }}
          colIndex
          isLoading={loading}
          dataPageSize={[1, 2, 3, 4, 5]}
        />
      </div>

      {/* <CategoryForm
        open={openForm}
        handleClose={() => {
          setOpenForm(false);
        }}
        handlePaging={() => {
          handleChangeSearch({ pageIndex: 1 });
        }}
      /> */}

      <ConfirmDialog
        open={!!openUnConfirm}
        handleClose={() => {
          setOpenUnConfirm("");
        }}
        handleSubmit={async () => {
          try {
            await unDeleteCateApi(openUnConfirm);
            handleChangeSearch({ pageIndex: 1 });
            toast.success("Xóa thành công");
          } catch (error: unknown) {
            const err = error as Error;
            toast.error(err.message);
          } finally {
            setOpenUnConfirm("");
          }
        }}
        title="Xác nhận xóa  ?"
        description="Bạn có chắc chắn muốn xóa môn học !!!"
        successLabel="Bỏ ẩn"
      />
    </div>
  );
};

export default QuizTable;
