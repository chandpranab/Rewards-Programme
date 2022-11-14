import { render, screen, within } from '@testing-library/react'
import RewardsContext from 'contexts/rewardsContext';
import { mockRewardsData } from 'mock/test-data';
import RewardsTable from './RewardsTable';

describe('RewardsTable component', () => {
  const renderRewardsTable = () => render(
    <RewardsContext.Provider value={{
      loading: false,
      data: mockRewardsData,
      error: null,
    }}>
      <RewardsTable />
    </RewardsContext.Provider>
  );


  it('renders without crashing', async () => {
    renderRewardsTable();
    await screen.findByTestId('rewards-details');
    expect(screen.getByTestId('rewards-details')).toBeInTheDocument();
  });
  it('renders correct rewards columns', async () => {
    renderRewardsTable();
    await screen.findByTestId('rewards-details');
    const tableRow = screen.getByTestId('table-header-row');
    expect(within(tableRow).getAllByRole('columnheader')[0]).toHaveTextContent('Transaction Date');
    expect(within(tableRow).getAllByRole('columnheader')[1]).toHaveTextContent('Transaction Amount');
    expect(within(tableRow).getAllByRole('columnheader')[2]).toHaveTextContent('Reward Breakdown');
    expect(within(tableRow).getAllByRole('columnheader')[3]).toHaveTextContent('Reward Points');
  });
  it('renders correct rewards data', async () => {
    renderRewardsTable();
    await screen.findByTestId('rewards-details');
    const row1 = screen.getAllByRole('row')[1];
    expect(within(row1).getAllByRole('cell')[0]).toHaveTextContent('Nov 13, 2022');
    expect(within(row1).getAllByRole('cell')[1]).toHaveTextContent('$364.66');
    expect(within(row1).getAllByRole('cell')[2]).toHaveTextContent('2x$264 + 1x$50');
    expect(within(row1).getAllByRole('cell')[3]).toHaveTextContent('578');
  });
});
