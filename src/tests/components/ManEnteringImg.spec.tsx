import { render, screen } from '@testing-library/react';
import { ManEnteringImg } from '../../components/ManEnteringImg';

describe('ManEnteringImg component', () => {
  it('renders correctly', () => {
    render(<ManEnteringImg />);

    expect(screen.getByAltText('Ilustração de login')).toBeInTheDocument();
  });
});
