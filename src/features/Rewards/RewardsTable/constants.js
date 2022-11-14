import moment from "moment/moment";

export const columns = [
  {
    title: 'Transaction Date',
    accessor: 'transaction_date',
    renderer: (item) => {
      return <strong>{item ? moment(Number(item)).format('MMM DD, YYYY') : ''}</strong>;
    }
  },
  {
    title: 'Transaction Amount',
    accessor: 'transaction_amount',
    currency: true,
  },
  {
    title: 'Reward Breakdown',
    accessor: 'rewards',
    renderer: (item) => {
      return (item && item.length) ? item.map(reward => `${reward.points}x$${reward.amount}`).join(' + ') : '-';
    }
  },
  {
    title: 'Reward Points',
    accessor: 'rewards_total',
  }
];
