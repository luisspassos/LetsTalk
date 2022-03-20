import { RegistrationLink } from '../../../components/Form/RegistrationLink';
import { render, screen } from '@testing-library/react';

describe('RegistrationLink component', () => {
  it('renders correctly', () => {
    render(<RegistrationLink />);

    expect(screen.getByText('Cadastre-se!')).toBeInTheDocument();
  });
});
