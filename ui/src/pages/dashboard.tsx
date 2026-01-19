import { useCallback, useEffect } from "react";
import BuyButton from "../components/dashboard/buyButton";
import Card from "../components/dashboard/card";
import Table from "../components/dashboard/table";
import useCornTransactions from "../hooks/useCornTransactions";

const Dashboard = () => {
  const {
    transactions,
    buyCorn,
    getCornTransactions,
    counters,
    getPagination,
    setPagination,
    totalPages,
  } = useCornTransactions();

  const { pageNumber } = getPagination();

  useEffect(() => {
    const fetchData = async () => {
      await getCornTransactions();
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  const buyCornHandler = useCallback(async () => {
    await buyCorn();

    await getCornTransactions();
  }, [buyCorn, getCornTransactions]);

  const goToPageHandler = useCallback(
    async (currentPage: number) => {
      const pagination = getPagination();
      setPagination({ ...pagination, pageNumber: currentPage });
    },
    [getPagination, setPagination],
  );

  return (
    <div className="flex flex-col mx-auto gap-5 pt-10 sm:w-2xl">
      <h1 className="text-white text-5xl">Dashboard</h1>

      <div className="flex flex-col items-start sm:items-center sm:flex-row gap-5">
        <div className="flex flex-col mx-auto sm:flex-row sm:w-2/3 gap-5">
          <Card label="Total Transactions" value={counters.total} />
          <Card label="Total Today" value={counters.today} />
        </div>

        <div className="flex justify-center mx-auto sm:items-center sm:justify-end w-1/3">
          <BuyButton buyCornHandler={buyCornHandler} />
        </div>
      </div>

      <Table
        data={transactions}
        currentPage={pageNumber}
        totalPages={totalPages}
        goToPage={goToPageHandler}
      />
    </div>
  );
};

export default Dashboard;
