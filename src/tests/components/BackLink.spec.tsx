import { render, screen } from '@testing-library/react';
import { BackLink } from '../../components/BackLink';

describe('BackLink component', () => {
  it('renders correctly', () => {
    render(<BackLink text='voltar' route='/' />);

    expect(screen.getByText('voltar')).toBeInTheDocument();
  });
});
