import { RegistrationLink } from '../../../components/Login/Form/RegistrationLink';
import { render, screen } from '@testing-library/react';

describe('RegistrationLink component', () => {
  beforeEach(() => {
    render(<RegistrationLink />);
  });

  it('renders correctly', () => {
    expect(screen.getByText('Cadastre-se!')).toBeInTheDocument();
  });

  it('must contain a href for the "/cadastro" route', () => {
    const registrationLink = screen.getByText('Cadastre-se!');

    expect(registrationLink.closest('a')).toHaveAttribute('href', '/cadastro');
  });
});
