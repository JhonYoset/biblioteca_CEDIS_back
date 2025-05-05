export interface PaginationOptions {
    page: number;
    limit: number;
    search?: string;
  }
  
  export interface PaginationResult<T> {
    data: T[];
    total: number;
    currentPage: number;
    totalPages: number;
    limit: number;
  }