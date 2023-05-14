import { render, screen } from '@testing-library/react';
import Page from 'pages/esqueci-minha-senha';
import { fakeAuth } from 'tests/test_utils/fakeAuth';
import { get } from '../test_utils/esqueci-minha-senha/getComponents';

fakeAuth();

describe('Forgot my password page', () => {
  beforeEach(() => {
    render(<Page />);
  });

  it('should render a title', () => {
    const title = screen.getByRole('heading', {
      name: 'Envie seu email para recuperar sua senha',
    });

    expect(title).toBeInTheDocument();
  });

  it('should render a form', () => {
    const emailInput = get.emailInput();
    const sendButton = get.sendButton();

    expect(emailInput).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
  });

  it('should render a back link to the login page', () => {
    const link = screen.getByRole('link', { name: 'Voltar' });

    expect(link).toBeInTheDocument();
  });
});
