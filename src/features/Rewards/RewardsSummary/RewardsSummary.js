import StatCard from 'components/StatCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyBillWave, faGift } from '@fortawesome/free-solid-svg-icons'
import { currencyToNumber, numberToCurrency } from 'utils/functions';
import { useContext, useMemo } from 'react';
import RewardsContext from 'contexts/rewardsContext';

const RewardsSummary = () => {
  const { data } = useContext(RewardsContext);

  // Calculate the total transaction amount
  const transactions = useMemo(() =>
    data ? data.reduce((acc, item) => acc + currencyToNumber(item.transaction_amount), 0) : '-'
    , [data]
  );
  // Calculate the total reward points
  const rewards = useMemo(() =>
    data ? data.reduce((acc, item) => acc + item.rewards_total, 0) : '-'
    , [data]
  );

  return (
    <div data-testid="rewards-summary">
      <StatCard
        title="Transactions"
        content={numberToCurrency(transactions)}
        variant="primary"
        icon={<FontAwesomeIcon icon={faMoneyBillWave} />}
      />
      <StatCard
        title="Reward Points"
        content={rewards}
        variant="info"
        icon={<FontAwesomeIcon icon={faGift} />}
      />
    </div>
  )
};

export default RewardsSummary;
