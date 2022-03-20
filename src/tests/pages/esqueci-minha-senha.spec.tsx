import { render, screen } from '@testing-library/react';
import IForgotMyPassword from '../../pages/esqueci-minha-senha';

describe('esqueci-minha-senha page', () => {
  it('renders correctly', () => {
    render(<IForgotMyPassword />);

    expect(screen.getByText('Recuperar senha')).toBeInTheDocument();
  });
});
