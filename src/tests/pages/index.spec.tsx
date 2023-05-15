import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import LoginPage from 'pages';

jest.mock('services/firebase');

describe('Login page', () => {
  it('should render the logo', () => {
    render(<LoginPage />);

    const logo = screen.getByText("Let's Talk");

    expect(logo).toBeInTheDocument();
  });
});
