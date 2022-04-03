import { render, screen } from '@testing-library/react';
import Custom404 from '../../pages/404';

describe('404 Page', () => {
  beforeEach(() => {
    render(<Custom404 />);
  });

  it('renders correctly', () => {
    expect(
      screen.getByText('Opss! Parece que esta página não existe...')
    ).toBeInTheDocument();
  });

  it('should contain a link back to the login page', () => {
    const backLink = screen.getByText('Voltar');

    expect(backLink.closest('a')).toHaveAttribute('href', '/');
  });
});
