import { render, screen } from '@testing-library/react';
import { Description } from '.';

describe('Description component', () => {
  it('renders correctly', () => {
    render(<Description />);

    const description = screen.getByText(
      'Opss! Parece que esta página não existe...'
    );

    expect(description).toBeInTheDocument();
  });
});
