import { render, screen } from '@testing-library/react';
import { DividerOr } from 'components/LoginPage/Form/DividerOr';

describe('DividerOr component', () => {
  it('renders correctly', () => {
    render(<DividerOr />);

    expect(screen.getByText('ou')).toBeInTheDocument();
  });
});
