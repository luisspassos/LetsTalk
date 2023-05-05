import { screen } from '@testing-library/dom';

export function getImg() {
  const img = screen.getByRole('img', { name: 'Página não encontrada' });

  return { img };
}
