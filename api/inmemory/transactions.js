import { v4 as uuidv } from 'uuid';

const transactions = [];

export const getAllTransactions = () => { 
    return transactions;
};

export const addTransaction = (date) => {
    transactions.push({
        id: uuidv(),
        date: date
    });
}

export const isInWithinRate = (date) => {
    // If there are no transactions, allow it since it is the first one
    if (transactions.length === 0) {
        return true;
    }

    const lastTransaction = transactions[transactions.length - 1];
    const timeDifferenceInMilliseconds = date.getTime() - lastTransaction.date.getTime();
    const rateLimitInMilliseconds = 60 * 1000;

    return timeDifferenceInMilliseconds >= rateLimitInMilliseconds;
}