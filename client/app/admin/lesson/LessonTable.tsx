"use client";
import { unDeleteCateApi } from "@/actions/category.action";
import { pagingAdminLessonApi } from "@/actions/lesson.action";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import TableComponent from "@/components/common/TableComponet";
import TooltipComponent from "@/components/common/TooltipComponent";
import { Button } from "@/components/ui/button";
import { IPagingLesson } from "@/types/lesson.type";
import { CreateBy, IQuizResponse } from "@/types/quizz.type";
import { ChangeSearch, Response } from "@/types/system.type";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
// import CategoryForm from "./CategoryForm";
// import CategoryHeader from "./CategoryHeader";
const LessonTable = () => {
  const router = useRouter();
  const [searchObject, setSearchObject] = useState<IPagingLesson>({
    pageIndex: 1,
    pageSize: 5,
    typeRunning: 0,
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

  const handlePaging = async (request: IPagingLesson) => {
    try {
      setLoading(true);
      const data = await pagingAdminLessonApi(request);
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
      accessorKey: "totalQuestions",
      header: "Sô câu",
      cell: ({ row }) => <div>{row.getValue("totalQuestions")}</div>,
    },
    {
      accessorKey: "totalPlayers",
      header: "Số lượt chơi",
      cell: ({ row }) => <div>{row.getValue("totalPlayers")}</div>,
    },
    {
      accessorKey: "totalCorrect",
      header: "Câu đúng",
      cell: ({ row }) => <div>{row.getValue("totalCorrect")}</div>,
    },
    {
      accessorKey: "inRunning",
      header: "Hoạt động",
      cell: ({ row }) => (
        <div>{row.getValue("inRunning") ? "Trực tiếp" : "Kết thúc"}</div>
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
                  console.log({ row });
                  router.push(`/admin/lesson/${row.original._id}`);
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

export default LessonTable;
