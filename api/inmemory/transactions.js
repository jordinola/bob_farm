import { v4 as uuidv } from "uuid";

const transactions = [];

export const getAllTransactions = (pageNumber, pageSize) => {
  const startIndex = (pageNumber - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const result = transactions
    .slice(startIndex, endIndex)
    .sort((a, b) => b.date - a.date);

  return result;
};

export const countAllTransactions = () => {
  return transactions.length;
};

export const countTodayTransactions = () => {
  const today = new Date();
  return transactions.filter((transaction) => {
    const transactionDate = new Date(transaction.date);
    return (
      transactionDate.getDate() === today.getDate() &&
      transactionDate.getMonth() === today.getMonth() &&
      transactionDate.getFullYear() === today.getFullYear()
    );
  }).length;
};

export const addTransaction = (date) => {
  transactions.push({
    id: uuidv(),
    date: date,
  });
};

export const isInWithinRate = (date) => {
  // If there are no transactions, allow it since it is the first one
  if (transactions.length === 0) {
    return true;
  }

  const lastTransaction = transactions[transactions.length - 1];
  const timeDifferenceInMilliseconds =
    date.getTime() - lastTransaction.date.getTime();
  const rateLimitInMilliseconds = 60 * 1000;

  return timeDifferenceInMilliseconds >= rateLimitInMilliseconds;
};
