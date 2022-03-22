import { RegistrationLink } from '../../../components/Form/RegistrationLink';
import { render, screen } from '@testing-library/react';

describe('RegistrationLink component', () => {
  it('renders correctly', () => {
    render(<RegistrationLink />);

    expect(screen.getByText('Cadastre-se!')).toBeInTheDocument();
  });

  it('must contain a href for the "/cadastro" route', () => {
    render(<RegistrationLink />);

    const registrationLink = screen.getByText('Cadastre-se!');

    expect(registrationLink.closest('a')).toHaveAttribute('href', '/cadastro');
  });
});
