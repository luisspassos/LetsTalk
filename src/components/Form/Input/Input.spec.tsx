import { render, screen } from '@testing-library/react';
import { Input } from '.';

describe('Input component', () => {
  it('renders correctly', () => {
    render(<Input label='Email' error={{ type: 'validate' }} id='email' />);

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });
});
