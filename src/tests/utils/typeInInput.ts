import { fireEvent } from '@testing-library/dom';

type Params = {
  input: HTMLElement;
  text?: string;
  fallbackText: string;
};

export function typeInInput({ input, text, fallbackText }: Params) {
  fireEvent.change(input, {
    target: { value: text ?? fallbackText },
  });
}
