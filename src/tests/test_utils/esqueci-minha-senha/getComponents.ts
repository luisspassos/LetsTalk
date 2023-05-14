import { screen } from '@testing-library/react';

export const get = {
  sendButton: () =>
    screen.getByRole('button', {
      name: 'ENVIAR',
    }),
  emailInput: () => screen.getByLabelText('Email', { selector: 'input' }),
};
