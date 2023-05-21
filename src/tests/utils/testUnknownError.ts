import { screen, waitForElementToBeRemoved } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

/* eslint-disable jest/no-export */
export function testUnknownError(triggerError: Function) {
  it('should show an unknown error and last 6 seconds', async () => {
    await triggerError();

    const start = performance.now();

    function queryError() {
      const message = 'Ocorreu um erro desconhecido. Tente novamente';

      return screen.queryAllByRole('alert', {
        name: message,
      });
    }

    await act(async () => {
      jest.runAllTimers();
    });

    await waitForElementToBeRemoved(() => queryError());

    const end = performance.now();

    expect(queryError()).toHaveLength(0);

    const duration = end - start;

    const errDuration = 6000; // 6 seconds in milliseconds;
    const extra = 1052;
    const totalDuration = errDuration + extra;

    expect(duration).toBe(totalDuration);
  });
}
