import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '.';

describe('Button component', () => {
  it('renders correctly', () => {
    render(<Button text='Entrar' />);

    expect(screen.getByText('Entrar')).toBeInTheDocument();
  });

  it('should perform a function when clicking on it', () => {
    const buttonFunction = jest.fn();

    render(<Button text='Entrar' onClick={buttonFunction} />);

    const button = screen.getByText('Entrar');

    fireEvent.click(button);

    expect(buttonFunction).toHaveBeenCalled();
  });

  it('isLoading has to be true when click button', () => {});
});
