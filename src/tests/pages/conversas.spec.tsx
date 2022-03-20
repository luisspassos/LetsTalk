import { render, screen } from '@testing-library/react';
import Conversations from '../../pages/conversas';

describe('esqueci-minha-senha page', () => {
  it('renders correctly', () => {
    render(<Conversations />);

    expect(screen.getByText('Conversations')).toBeInTheDocument();
  });
});
