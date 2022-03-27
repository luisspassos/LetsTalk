import { render, screen } from '@testing-library/react';
import { FormTitle } from '../../../components/Form/FormTitle';

describe('FormTitle component', () => {
  it('renders correctly', () => {
    render(<FormTitle text='title' />);

    expect(screen.getByText('title')).toBeInTheDocument();
  });
});
