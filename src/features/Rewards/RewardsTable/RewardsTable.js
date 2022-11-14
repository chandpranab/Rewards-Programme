import Table from 'components/Table';
import RewardsContext from 'contexts/rewardsContext';
import moment from 'moment';
import { useCallback, useContext } from 'react';
import { currencyToNumber, numberToCurrency } from 'utils/functions';
import { columns } from './constants';

const RewardsTable = () => {
  const { loading, data } = useContext(RewardsContext);

  // Return true for showing the total row 
  const totalCondition = useCallback((item, prev) => {
    if (!prev) {
      return false;
    }
    // true when the month changes between rows
    const currentMonth = moment(Number(item.transaction_date)).month();
    const prevMonth = moment(Number(prev.transaction_date)).month();
    return currentMonth !== prevMonth;
  }, []);

  // Return the data set for showing in the total row
  const totalRow = useCallback((data) => ({
    transaction_amount: numberToCurrency(data.reduce((acc, item) => acc + currencyToNumber(item.transaction_amount), 0)),
    rewards_total: data.reduce((acc, item) => acc + item.rewards_total, 0),
  }), []);

  return (
    <div data-testid="rewards-details">
      <Table
        columns={columns}
        data={data}
        loading={loading}
        totalCondition={totalCondition}
        totalRow={totalRow}
      />
      {loading ? 'Loading...' : ''}
    </div>
  )
}

export default RewardsTable;
