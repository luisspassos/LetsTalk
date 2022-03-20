import { render, screen } from '@testing-library/react';
import { Header } from '.';

describe('Button component', () => {
  it('renders correctly', () => {
    render(<Header />);

    expect(screen.getByAltText("Let's Talk")).toBeInTheDocument();
  });
});
