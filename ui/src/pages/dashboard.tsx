import { useCallback, useEffect, useMemo, useTransition } from "react";
import BuyButton from "../components/dashboard/buyButton";
import Card from "../components/dashboard/card";
import Table from "../components/dashboard/table";
import useCornTransactions from "../hooks/useCornTransactions";

const Dashboard = () => {
  const [isPending, startTransition] = useTransition();
  const { transactions, setTransactions, buyCorn, getCornTransactions } =
    useCornTransactions();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCornTransactions();
      startTransition(() => {
        setTransactions(data);
      });
    };

    fetchData();
  }, [getCornTransactions, setTransactions]);

  const buyCornHandler = useCallback(async () => {
    startTransition(async () => {
      await buyCorn();

      const updatedTransactions = await getCornTransactions();
      startTransition(() => {
        setTransactions(updatedTransactions);
      });
    });
  }, [buyCorn, getCornTransactions, setTransactions]);

  const todayTransactions = useMemo(() => {
    const today = new Date();
    return transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getDate() === today.getDate() &&
        transactionDate.getMonth() === today.getMonth() &&
        transactionDate.getFullYear() === today.getFullYear()
      );
    }).length;
  }, [transactions]);

  return (
    <div className="flex flex-col mx-auto gap-5 pt-10 sm:w-2xl">
      <h1 className="text-white text-5xl">Dashboard</h1>

      <div className="flex flex-col items-start sm:items-center sm:flex-row gap-5">
        <div className="flex flex-col mx-auto sm:flex-row sm:w-2/3 gap-5">
          <Card label="Total Transactions" value={transactions.length} />
          <Card label="Total Today" value={todayTransactions} />
        </div>

        <div className="flex justify-center mx-auto sm:items-center sm:justify-end w-1/3">
          <BuyButton isPending={isPending} buyCornHandler={buyCornHandler} />
        </div>
      </div>

      <Table data={transactions} isPending={isPending} itemsPerPage={5} />
    </div>
  );
};

export default Dashboard;
