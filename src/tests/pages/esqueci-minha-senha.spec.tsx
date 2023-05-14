import { render, screen } from '@testing-library/react';
import Page from 'pages/esqueci-minha-senha';

jest.mock('services/firebase', () => {
  return {
    auth: 'fake-auth',
  };
});

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
    const emailInput = screen.getByLabelText('Email', { selector: 'input' });

    const sendButton = screen.getByRole('button', {
      name: 'ENVIAR',
    });

    expect(emailInput).toBeInTheDocument();
    expect(sendButton).toBeInTheDocument();
  });

  it('should render a back link to the login page', () => {
    const link = screen.getByRole('link', { name: 'Voltar' });

    expect(link).toBeInTheDocument();
  });
});
