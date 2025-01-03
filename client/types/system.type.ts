export type ErrorCatch = {
  message: string;
  errorCode: number;
};

export type SearchBase = {
  pageIndex: number;
  pageSize: number;
  keyword: string;
};

export type SearchTab = {
  tab: number;
} & SearchBase;

export type Response<T> = {
  pageIndex: number;
  pageSize: number;
  totalPages: number;
  totalOptionPage: number;
  totalAllOptions: number;
  content: T[];
};

export interface ChangeSearch {
  pageIndex?: number;
  pageSize?: number;
  keyword?: string;
  tab?: number;
  sort?: 1 | -1;
  isPublic?: boolean;
  isLoved?: boolean;
}

export interface SearchQuizPaging extends Omit<SearchBase, "keyword"> {
  sort: 1 | -1;
  isLoved?: boolean;
  isPublic?: boolean;
}
