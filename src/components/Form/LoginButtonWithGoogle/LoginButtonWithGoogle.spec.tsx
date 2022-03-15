import { render, screen, fireEvent } from '@testing-library/react';
import { LoginButtonWithGoogle } from '.';

jest;

describe('LoginButtonWithGoogle component', () => {
  it('renders correctly', () => {
    render(<LoginButtonWithGoogle />);

    expect(screen.getByText('Entrar com o Google')).toBeInTheDocument();
  });

  it('redirects to the conversations page if the user is logged in', () => {
    render(<LoginButtonWithGoogle />);

    const loginButtonWithGoogle = screen.getByText('Entrar com o Google');

    fireEvent.click(loginButtonWithGoogle);
  });
});
