import { render, screen } from '@testing-library/react';
import { InputError } from '.';

describe('Input error component', () => {
  it('renders correctly', () => {
    render(<InputError message='Error' />);

    expect(screen.getByText('Error')).toBeInTheDocument();
  });
});
