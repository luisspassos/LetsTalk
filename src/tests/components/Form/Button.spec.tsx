import { render, screen } from '@testing-library/react';
import { Button } from '../../../components/Form/Button';

describe('Button component', () => {
  it('renders correctly', () => {
    render(<Button text='Entrar' />);

    expect(screen.getByText('Entrar')).toBeInTheDocument();
  });
});
