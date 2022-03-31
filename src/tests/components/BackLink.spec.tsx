import { render, screen } from '@testing-library/react';
import { BackLink } from '../../components/BackLink';

describe('BackLink component', () => {
  beforeEach(() => {
    render(<BackLink text='voltar' route='/' />);
  });

  it('renders correctly', () => {
    expect(screen.getByText('voltar')).toBeInTheDocument();
  });

  it('must receive a href', () => {
    const backLink = screen.getByText('voltar');

    expect(backLink.closest('a')).toHaveAttribute('href', '/');
  });
});
