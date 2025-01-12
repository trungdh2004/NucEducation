"use client";
import { pagingAuthApi } from "@/actions/auth.action";
import TableComponent from "@/components/common/TableComponet";
import { ChangeSearch, Response, SearchBase } from "@/types/system.type";
import { UserType } from "@/types/User.type";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
const UserTable = () => {
  const [searchObject, setSearchObject] = useState<SearchBase>({
    pageIndex: 1,
    pageSize: 5,
    keyword: "",
  });
  const [response, setResponse] = useState<Response<UserType>>({
    pageIndex: 1,
    pageSize: 5,
    totalAllOptions: 0,
    totalPages: 0,
    totalOptionPage: 0,
    content: [],
  });
  const [loading, setLoading] = useState(false);

  const handlePaging = async (request: SearchBase) => {
    try {
      console.log("request", request);

      setLoading(true);
      const data = await pagingAuthApi(request);
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

  const columns: ColumnDef<UserType>[] = [
    {
      accessorKey: "name",
      header: "Tên",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "avatar",
      header: "Ảnh",
      cell: ({ row }) => (
        <div className="size-10">
          <Image
            src={row.getValue("avatar")}
            alt="category"
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
      ),
    },
    {
      accessorKey: "isAdmin",
      header: "Admin",
      cell: ({ row }) => (
        <div>{row.getValue("isAdmin") ? "Admin" : "Người dùng"}</div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Ngày tạo",
      cell: ({ row }) => {
        return <div>{format(row.getValue("createdAt"), "dd/MM/yyyy")}</div>;
      },
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
    </div>
  );
};

export default UserTable;
