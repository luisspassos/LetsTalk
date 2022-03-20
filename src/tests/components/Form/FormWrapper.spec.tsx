import { render, screen } from '@testing-library/react';
import { FormWrapper } from '../../../components/Form/FormWrapper';

describe('FormWrapper component', () => {
  it('renders correctly', () => {
    render(
      <FormWrapper>
        <p>text</p>
      </FormWrapper>
    );

    expect(screen.getByText('text')).toBeInTheDocument();
  });
});
