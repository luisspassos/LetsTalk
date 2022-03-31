import { toast } from '../../../utils/Toasts/toast';
import { unknownErrorToast } from '../../../utils/Toasts/unknownErrorToast';

jest.mock('../../../utils/Toasts/toast', () => {
  return {
    toast: jest.fn(),
  };
});

describe('unknown error toast', () => {
  it('toast must be run with status property with "error"', () => {
    unknownErrorToast();

    expect(toast).toHaveBeenCalledWith(
      expect.objectContaining({
        status: 'error',
      })
    );
  });
});
