"use client";
import {
  deleteCateApi,
  pagingCateApi,
  unDeleteCateApi,
} from "@/actions/category.action";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import TableComponent from "@/components/common/TableComponet";
import TooltipComponent from "@/components/common/TooltipComponent";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CateResponse } from "@/types/Category.type";
import { ChangeSearch, Response, SearchTab } from "@/types/system.type";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { LockKeyholeIcon, LockKeyholeOpenIcon, PencilIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import CategoryForm from "./CategoryForm";
import CategoryHeader from "./CategoryHeader";
const CategoryTable = () => {
  const [searchObject, setSearchObject] = useState<SearchTab>({
    pageIndex: 1,
    pageSize: 5,
    keyword: "",
    tab: 1,
  });
  const [response, setResponse] = useState<Response<CateResponse>>({
    pageIndex: 1,
    pageSize: 5,
    totalAllOptions: 0,
    totalPages: 0,
    totalOptionPage: 0,
    content: [],
  });
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState<boolean | string>(false);
  const [openConfirm, setOpenConfirm] = useState<string>("");
  const [openUnConfirm, setOpenUnConfirm] = useState<string>("");

  const handlePaging = async (request: SearchTab) => {
    try {
      console.log("request", request);

      setLoading(true);
      const data = await pagingCateApi(request);
      console.log("response", data);
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

  const columns: ColumnDef<CateResponse>[] = [
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
      accessorKey: "description",
      header: "Mô tả",
      cell: ({ row }) => <div>{row.getValue("description")}</div>,
    },
    {
      accessorKey: "createdAt",
      header: "Ngày tạo",
      cell: ({ row }) => {
        return <div>{format(row.getValue("createdAt"), "dd/MM/yyyy")}</div>;
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
                variant={"success"}
                onClick={() => {
                  console.log({ row });
                  setOpenForm(row.original._id);
                }}
              >
                <PencilIcon />
              </Button>
            </TooltipComponent>

            {row.original.deleted ? (
              <TooltipComponent label="Bỏ ẩn">
                <Button
                  size={"icon"}
                  variant={"warning"}
                  onClick={() => {
                    setOpenUnConfirm(row.original._id);
                  }}
                >
                  <LockKeyholeOpenIcon />
                </Button>
              </TooltipComponent>
            ) : (
              <TooltipComponent label="Ẩn">
                <Button
                  size={"icon"}
                  variant={"destructive"}
                  onClick={() => {
                    setOpenConfirm(row.original._id);
                  }}
                >
                  <LockKeyholeIcon />
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
      <CategoryHeader
        handleOpen={() => {
          setOpenForm(true);
        }}
        handleChange={handleChangeSearch}
      />

      <Tabs value={`${searchObject.tab}`} className="w-full mb-2">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger
            value="1"
            onClick={() => {
              handleChangeSearch({
                tab: 1,
                pageIndex: 1,
              });
            }}
          >
            Môn học
          </TabsTrigger>
          <TabsTrigger
            value="0"
            onClick={() => {
              handleChangeSearch({
                tab: 0,
                pageIndex: 1,
              });
            }}
          >
            Môn học ẩn
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

      <CategoryForm
        open={openForm}
        handleClose={() => {
          setOpenForm(false);
        }}
        handlePaging={() => {
          handleChangeSearch({ pageIndex: 1 });
        }}
      />

      <ConfirmDialog
        open={!!openConfirm}
        handleClose={() => {
          setOpenConfirm("");
        }}
        handleSubmit={async () => {
          try {
            await deleteCateApi(openConfirm);
            await handleChangeSearch({ pageIndex: 1 });
            toast.success("Xóa thành công");
          } catch (error: unknown) {
            const err = error as Error;
            toast.error(err.message);
          } finally {
            setOpenConfirm("");
          }
        }}
        title="Bạn có chắc chắn muốn xóa không"
      />

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
        title="Xác nhận bỏ ẩn ?"
        description="Bạn có chắc chắn muốn bỏ ẩn môn học !!!"
        type="warning"
        successLabel="Bỏ ẩn"
      />
    </div>
  );
};

export default CategoryTable;
