import { render, screen } from '@testing-library/react';
import Register from '../../pages/cadastro';

describe('cadastro page', () => {
  it('renders correctly', () => {
    render(<Register />);

    expect(screen.getByText('Cadastro')).toBeInTheDocument();
  });
});
