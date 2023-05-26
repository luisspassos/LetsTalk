import { screen } from '@testing-library/dom';

export function formErrorExpect(errorMessage: string) {
  expect(screen.getByText(errorMessage)).toBeVisible();
}
