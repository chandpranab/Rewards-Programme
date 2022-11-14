import { render, screen, within } from '@testing-library/react'
import Table from './Table';

describe('Table component', () => {
  it('renders without crashing', async () => {
    render(<Table columns={[]} data={[]} />);
    expect(screen.getByTestId('table')).toBeInTheDocument();
  });

  it('renders the expected columns', () => {
    render(<Table
      columns={[
        { title: 'Column 1', accessor: 'col1' },
        { title: 'Column 2', accessor: 'col2' }
      ]}
    />);
    const tableRow = screen.getByTestId('table-header-row');
    expect(within(tableRow).getAllByRole('columnheader')[0]).toHaveTextContent('Column 1');
    expect(within(tableRow).getAllByRole('columnheader')[1]).toHaveTextContent('Column 2');
  });

  it('renders the expected rows', () => {
    render(<Table
      columns={[
        { title: 'Column 1', accessor: 'col1' },
        { title: 'Column 2', accessor: 'col2' }
      ]}
      data={[
        { id: 1, col1: 'data 1', col2: 'data 2', },
        { id: 2, col1: 'data 3', col2: 'data 4', }
      ]}
    />);
    const row1 = screen.getAllByRole('row')[1];
    expect(within(row1).getAllByRole('cell')[0]).toHaveTextContent('data 1');
    expect(within(row1).getAllByRole('cell')[1]).toHaveTextContent('data 2');
    const row2 = screen.getAllByRole('row')[2];
    expect(within(row2).getAllByRole('cell')[0]).toHaveTextContent('data 3');
    expect(within(row2).getAllByRole('cell')[1]).toHaveTextContent('data 4');
  });
});
