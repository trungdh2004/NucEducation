"use client";
import TableComponent from "@/components/common/TableComponet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ICategory } from "@/types/quizz.type";
import { ColumnDef } from "@tanstack/react-table";
import { EllipsisVerticalIcon } from "lucide-react";
import Image from "next/image";
import CategoryHeader from "./CategoryHeader";

const CategoryTable = () => {
  const columns: ColumnDef<ICategory>[] = [
    {
      accessorKey: "name",
      header: "Tên môn học",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("name")}</div>
      ),
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
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("description")}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Ngày tạo",
      cell: ({ row }) => {
        return (
          <div className="text-right font-medium">
            {row.getValue("createdAt")}
          </div>
        );
      },
    },
    {
      accessorKey: "action",
      header: () => <div className="w-20">Thao tác</div>,
      cell: () => {
        return (
          <div className="text-right font-medium w-20">
            <EllipsisVerticalIcon />
          </div>
        );
      },
      enableHiding: false,
      size: 50,
    },
  ];

  return (
    <div className=" ">
      <CategoryHeader />

      <Tabs value={`1`} className="w-full mb-2">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="1">Môn học</TabsTrigger>
          <TabsTrigger value="2">Môn học ẩn</TabsTrigger>
        </TabsList>
      </Tabs>

      <TableComponent
        data={[
          {
            name: "title",
            image: "/avatar.jpg",
            createdAt: "",
            deleted: false,
            updatedAt: "",
            totalQuiz: 0,
            _id: "",
            description: "chào bạn tôi là trung tôi từ afk đến đây",
          },
        ]}
        columns={columns}
        pageCount={0}
        pageIndex={2}
        totalElement={10}
        pageSize={15}
        handleChangePage={(value) => {
          console.log("value", value);
        }}
        handleChangePageSize={(value) => {
          console.log("size", value);
        }}
        colIndex
      />
    </div>
  );
};

export default CategoryTable;
