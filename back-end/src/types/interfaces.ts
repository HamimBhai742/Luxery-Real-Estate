export interface IOptions {
  page?: string;
  limit?: string;
  search?: string;
  skip?: number;
  sortBy?: string;
  sortOrder?: string;
}

export interface IPagination {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
}