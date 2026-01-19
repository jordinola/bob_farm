export interface TransactionItem {
  id: number;
  date: Date;
}

export interface Pagination {
  pageNumber: number;
  pageSize: number;
}

export interface FetchTransactionsResponse {
  data: TransactionItem[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  counters: {
    total: number;
    today: number;
  };
}

export interface CountResponse {
  total: number;
  today: number;
}
