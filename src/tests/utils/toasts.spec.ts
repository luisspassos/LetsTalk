/* eslint-disable jest/expect-expect */
import { successToastWhenRegistering } from '../../pages/cadastro';
import { successToastWhenSendingToEmailToChangePassword } from '../../pages/esqueci-minha-senha';
import { errorToastWhenChangingPassword } from '../../pages/trocar-senha';
import { toast } from '../../utils/Toasts/toast';
import { unknownErrorToast } from '../../utils/Toasts/unknownErrorToast';
import { toasts as loginPageToasts } from '../../pages/index';

jest.mock('../../utils/Toasts/toast', () => {
  return {
    toast: jest.fn(),
  };
});

jest.mock('../../services/firebase', () => {
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
  const testToasts = [
    {
      testTitle:
        'unknownErrorToast must be run with status property with "error"',
      toast: unknownErrorToast,
      status: 'error',
    },
    {
      testTitle:
        'successToastWhenRegistering must be run with status property with "success"',
      toast: successToastWhenRegistering,
      status: 'success',
    },
    {
      testTitle:
        'successToastWhenSendingToEmailToChangePassword must be run with status property with "success"',
      toast: successToastWhenSendingToEmailToChangePassword,
      status: 'success',
    },
    {
      testTitle:
        'errorToastWhenChangingPassword must be run with status property with "error"',
      toast: errorToastWhenChangingPassword,
      status: 'error',
    },
    {
      testTitle:
        'emailVerificationErrorToast must be run with status property with "error"',
      toast: loginPageToasts.emailVerification.error,
      status: 'error',
    },
    {
      testTitle:
        'emailVerificationSuccessToast must be run with status property with "success"',
      toast: loginPageToasts.emailVerification.success,
      status: 'success',
    },
    {
      testTitle:
        'emailVerificationWarningToast must be run with status property with "warning"',
      toast: loginPageToasts.emailVerification.warning,
      status: 'warning',
    },
    {
      testTitle:
        'errorToastWhenResettingPassword must be run with status property with "error"',
      toast: loginPageToasts.passwordReset.error,
      status: 'error',
    },
    {
      testTitle:
        'errorToastWhenResettingPassword must be run with status property with "success"',
      toast: loginPageToasts.passwordReset.success,
      status: 'success',
    },
  ];

  testToasts.forEach(({ status, testTitle, toast }) => {
    // eslint-disable-next-line jest/valid-title
    it(testTitle, () => {
      testToastStatusProperty(toast, status);
    });
  });
});
