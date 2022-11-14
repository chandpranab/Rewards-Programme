import { useCallback, useEffect, useState } from 'react';
import { getTransactions } from 'services/transactions';
import { currencyToNumber } from 'utils/functions';

const useRewards = ({ from, to }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Calculate the reward points as per the given rule:
  // 2 points for every dollar spent over $100 in each transaction, 
  // plus 1 point for every dollar spent between $50 and $100 in each transaction
  const calculateRewards = useCallback((amount) => {
    let balance = Math.floor(currencyToNumber(amount));
    const rewards = [];
    while (balance > 50) {
      if (balance > 100) {
        rewards.push({ points: 2, amount: balance - 100 });
        balance = 100;
      } else if (balance > 50) {
        rewards.push({ points: 1, amount: balance - 50 });
        balance = 50;
      }
    }
    return rewards;
  }, []);

  // Fetch the transaction when the filters are changed
  useEffect(() => {
    const func = async () => {
      setLoading(true);
      try {
        const transactions = await getTransactions({ from, to });
        const result = transactions.map((item) => {
          const rewards = calculateRewards(item.transaction_amount);
          return {
            ...item,
            rewards,
            rewards_total: rewards.reduce((acc, item) => acc + (item.points * item.amount), 0),
          }
        });
        setLoading(false);
        setData(result);
        setError(null);
      } catch (e) {
        setLoading(false);
        setData([]);
        setError(e);
      }
    }
    func();
  }, [calculateRewards, from, to]);

  return { loading, data, error };
};

export default useRewards;
