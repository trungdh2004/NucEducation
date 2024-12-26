export interface IResponse {
  skip: number;
  limit: number;
  data: any[];
  count: number;
}

export const formatResponse = ({ skip, limit, data, count }: IResponse) => {
  const totalPage = count === 0 ? 0 : Math.ceil(count / limit);
  const totalOptionPage = data.length;
  const totalAllOptions = count;

  return {
    pageIndex: skip,
    pageSize: limit,
    totalPage,
    totalOptionPage,
    totalAllOptions,
    content: data,
  };
};
