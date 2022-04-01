/* eslint-disable jest/expect-expect */
import { successToastWhenRegistering } from '../../../pages/cadastro';
import { successToastWhenSendingToEmailToChangePassword } from '../../../pages/esqueci-minha-senha';
import { errorToastWhenChangingPassword } from '../../../pages/trocar-senha';
import { toast } from '../../../utils/Toasts/toast';
import { unknownErrorToast } from '../../../utils/Toasts/unknownErrorToast';

jest.mock('../../../utils/Toasts/toast', () => {
  return {
    toast: jest.fn(),
  };
});

jest.mock('../../../services/firebase', () => {
  return {
    auth: 'fake-auth',
  };
});

function testToastStatusProperty(toastFunc: () => void, status: string) {
  toastFunc();

  expect(toast).toHaveBeenCalledWith(
    expect.objectContaining({
      status: status,
    })
  );
}

describe('Toasts', () => {
  it('unknownErrorToast must be run with status property with "error"', () => {
    testToastStatusProperty(unknownErrorToast, 'error');
  });

  it('successToastWhenRegistering must be run with status property with "success"', () => {
    testToastStatusProperty(successToastWhenRegistering, 'success');
  });

  it('successToastWhenSendingToEmailToChangePassword must be run with status property with "success"', () => {
    testToastStatusProperty(
      successToastWhenSendingToEmailToChangePassword,
      'success'
    );
  });

  it('errorToastWhenChangingPassword must be run with status property with "error"', () => {
    testToastStatusProperty(errorToastWhenChangingPassword, 'error');
  });
});
