import { render, screen } from '@testing-library/react'
import StatCard from './StatCard';

describe('StatCard component', () => {
  it('renders without crashing', async () => {
    render(<StatCard title='' content='' />);
    expect(screen.getByTestId('stat-card')).toBeInTheDocument();
  });

  it('renders the expected output', () => {
    render(<StatCard title='test title' content='test content' icon='test icon' variant='variant' />);
    expect(screen.getByTestId('stat-card')).toHaveClass('stat-card--variant');
    expect(screen.getByTestId('stat-card-title')).toHaveTextContent('test title');
    expect(screen.getByTestId('stat-card-content')).toHaveTextContent('test content');
    expect(screen.getByTestId('stat-card-icon')).toHaveTextContent('test icon');
  })
});

