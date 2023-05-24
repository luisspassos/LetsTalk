import { fireEvent } from '@testing-library/dom';
import { act } from 'react-dom/test-utils';

export async function clickButton(button: HTMLElement) {
  await act(async () => {
    fireEvent.click(button);
  });
}
