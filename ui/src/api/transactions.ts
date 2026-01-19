import type { FetchTransactionsResponse, Pagination } from "../types/table";

export const fetchTranstactions = async (
  pagination: Pagination,
): Promise<FetchTransactionsResponse> => {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/corn?pageNumber=${pagination.pageNumber}&pageSize=${pagination.pageSize}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch transactions");
  }

  return response.json();
};

export const addTransaction = async () => {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/corn`, {
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to add transaction");
  }
};
