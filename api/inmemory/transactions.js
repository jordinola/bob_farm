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
    const lastTransaction = transactions[transactions.length - 1];

    // If there are no transactions, allow it since it is the first one
    if (!lastTransaction) {
        return true;
    }

    const timeDifferenceInMilliseconds = date.getTime() - lastTransaction.date.getTime();
    const rateLimitInMilliseconds = 60 * 1000; // 1 minute

    return timeDifferenceInMilliseconds >= rateLimitInMilliseconds;
}