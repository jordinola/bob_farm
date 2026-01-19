import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { toast } from "react-toastify";
import { addTransaction, fetchTranstactions } from "../api/transactions";
import type {
  CountResponse,
  Pagination,
  TransactionItem,
} from "../types/table";

export const useCornTransactions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [counters, setCounters] = useState<CountResponse>({
    total: 0,
    today: 0,
  });

  useEffect(() => {
    setSearchParams((params) => {
      params.set("pageNumber", "1");
      params.set("pageSize", "5");
      return params;
    });
    // eslint-disable-next-line
  }, []);

  const currentPage = searchParams.get("pageNumber");

  const resetPagination = () => {
    setSearchParams((params) => {
      params.set("pageNumber", "1");
      params.set("pageSize", "5");
      return params;
    });
  };

  const getPagination = useCallback((): Pagination => {
    const pageNumber = parseInt(searchParams.get("pageNumber") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "5");

    return {
      pageNumber,
      pageSize,
    };
  }, [searchParams]);

  const setPagination = (pagination: Pagination) => {
    setSearchParams((params) => {
      params.set("pageNumber", pagination.pageNumber.toString());
      params.set("pageSize", pagination.pageSize.toString());
      return params;
    });
  };

  const buyCorn = async (): Promise<void> => {
    try {
      await addTransaction();

      toast.success("Successfully bought corn!");
    } catch (error) {
      console.error("Error buying corn:", error);
      toast.error("Failed to buy corn. Wait a moment and try again.");
    }
  };

  const getCornTransactions = useCallback(async (): Promise<void> => {
    try {
      const response = await fetchTranstactions(getPagination());
      setSearchParams((params) => {
        params.set("pageNumber", response.pageNumber.toString());
        params.set("pageSize", response.pageSize.toString());
        return params;
      });
      setTransactions(response.data);
      setCounters(response.counters);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error("Failed to fetch transactions");
    }
  }, [getPagination, setSearchParams]);

  useEffect(() => {
    if (!currentPage) return;

    getCornTransactions();
  }, [currentPage, getCornTransactions]);

  return {
    transactions,
    setTransactions,
    buyCorn,
    getCornTransactions,
    getPagination,
    setPagination,
    resetPagination,
    totalPages,
    counters,
  };
};

export default useCornTransactions;
