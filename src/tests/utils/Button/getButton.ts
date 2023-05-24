import { screen } from '@testing-library/dom';

export function getButton(name: string) {
  return screen.getByRole('button', { name });
}
