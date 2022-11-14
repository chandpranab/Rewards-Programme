import moment from 'moment';
import data from 'mock/transactions';

export const getTransactions = ({ from, to }) => {
  return Promise.resolve(
    // [{ "id": 9, "transaction_date": "1667112697000", "transaction_amount": "$100" }]
    data
      .filter((item) => moment(Number(item.transaction_date)).isBetween(moment(from), moment(to), 'day'))
      .sort((a, b) => {
        const dateA = Number(a.transaction_date);
        const dateB = Number(b.transaction_date);
        if (dateA > dateB) {
          return - 1;
        } else if (dateA < dateB) {
          return 1
        }
        return 0;
      })
  );
}
