import { render, screen } from '@testing-library/react';
import { ManEnteringImg } from '.';

describe('Button component', () => {
  it('renders correctly', () => {
    render(<ManEnteringImg />);

    expect(screen.getByAltText('Ilustração de login')).toBeInTheDocument();
  });
});
