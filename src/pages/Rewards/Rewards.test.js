import { render, screen, waitFor, within } from '@testing-library/react'
import Rewards from './Rewards';
import * as api from 'services/transactions';
import { mockTransactionData } from 'mock/test-data';

describe('Table component', () => {
  it('renders without crashing', async () => {
    render(<Rewards />);
    await screen.findByTestId('rewards-page');
    expect(screen.getByTestId('rewards-page')).toBeInTheDocument();
  });
  it('renders summary section', async () => {
    render(<Rewards />);
    await screen.findByTestId('rewards-page');
    expect(screen.getByTestId('summary-heading')).toHaveTextContent('Summary');
    expect(screen.getByTestId('rewards-summary')).toBeInTheDocument();
  });
  it('renders details section', async () => {
    render(<Rewards />);
    await screen.findByTestId('rewards-page');
    expect(screen.getByTestId('details-heading')).toHaveTextContent('Last 3 months rewards');
    expect(screen.getByTestId('rewards-details')).toBeInTheDocument();
  });
  it('renders correct rewards', async () => {
    jest.spyOn(api, 'getTransactions').mockImplementation(() => {
      return Promise.resolve(mockTransactionData)
    });
    render(<Rewards />);

    await waitFor(() => screen.findAllByTestId('table-row'));

    const row1 = screen.getAllByRole('row')[1];
    expect(within(row1).getAllByRole('cell')[0]).toHaveTextContent('Nov 13, 2022');
    expect(within(row1).getAllByRole('cell')[1]).toHaveTextContent('$364.66');
    expect(within(row1).getAllByRole('cell')[2]).toHaveTextContent('2x$264 + 1x$50');
    expect(within(row1).getAllByRole('cell')[3]).toHaveTextContent('578');
  });
});
