export interface SearchObjectBase {
  pageIndex: number;
  pageSize: number;
  keyword: string;
}

export interface SearchObjectTab extends SearchObjectBase {
  tab?: number;
}
