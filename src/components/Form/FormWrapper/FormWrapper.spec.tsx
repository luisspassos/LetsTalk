import { render, screen } from '@testing-library/react';
import { FormWrapper } from '.';

describe('FormWrapper component', () => {
  it('renders correctly', () => {
    render(<FormWrapper children={<p>text</p>} />);

    expect(screen.getByText('text')).toBeInTheDocument();
  });
});
