import RewardsContext from "contexts/rewardsContext";
import { RewardsSummary, RewardsTable } from "features/Rewards";
import useRewards from "hooks/useRewards";
import moment from "moment";
import { useState } from "react";
import './styles.scss';

const Rewards = () => {
  const [filters] = useState({
    from: moment().subtract(3, 'months').valueOf(),
    to: moment().valueOf()
  });

  // Custom hook for calculating the reward points
  const { loading, data, error } = useRewards({ from: filters.from, to: filters.to });

  return (
    <RewardsContext.Provider value={{ loading, data, error }}>
      <div className="container" data-testid="rewards-page">
        <h1 className="page-header" data-testid="page-header">Rewards Program</h1>
        <div className="rewards">
          <div className="rewards-summary">
            <h2 data-testid="summary-heading">Summary</h2>
            <RewardsSummary />
          </div>
          <div className="rewards-details">
            <h2 data-testid="details-heading">Last 3 months rewards</h2>
            <RewardsTable />
          </div>
        </div>
      </div>
    </RewardsContext.Provider>
  )
}

export default Rewards;
