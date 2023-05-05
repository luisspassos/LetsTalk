import { render, screen } from '@testing-library/react';
import { getImg } from 'tests/test_utils/404Page/Img';
import Custom404 from '../../pages/404';

describe('404 Page', () => {
  beforeEach(() => {
    render(<Custom404 />);
  });

  it('should contain an image of 404', () => {
    const { img } = getImg();

    expect(img).toBeInTheDocument();
  });

  it('should contain a description', () => {
    const description = screen.getByRole('heading', {
      name: 'Opss! Parece que esta página não existe...',
    });

    expect(description).toBeInTheDocument();
  });

  it('should contain a link back to the login page', () => {
    const backLink = screen.getByRole('link', { name: 'Voltar' });

    expect(backLink).toBeInTheDocument();
  });
});
