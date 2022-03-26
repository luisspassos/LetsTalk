import { render, screen } from '@testing-library/react';
import IForgotMyPassword from '../../pages/esqueci-minha-senha';

describe('IForgotMyPassword page', () => {
  it('renders correctly', () => {
    render(<IForgotMyPassword />);

    expect(
      screen.getByText('Envie seu email para recuperar sua senha')
    ).toBeInTheDocument();
  });
});
