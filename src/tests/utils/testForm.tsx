/* eslint-disable jest/valid-title */
/* eslint-disable jest/no-export */
import { act, fireEvent, render, screen } from '@testing-library/react';
import { FirebaseError } from 'firebase/app';
import { mocked } from 'jest-mock';
import { Component } from 'utils/types';
import { testUnknownError } from './testUnknownError';

type MockImplementationTest = {
  title: string;
  implementation: () => void;
  errorMessage: string;
};

type TestFormParams = {
  name: string;
  Component: Component;
  submitButtonName: string;
  mockImplementation: {
    tests?: MockImplementationTest[];
    funcToBeMocked: (args: any) => any;
  };
};

export function throwFirebaseError(code: string) {
  throw new FirebaseError(code, '');
}

export function testForm({
  name,
  Component,
  submitButtonName,
  mockImplementation,
}: TestFormParams) {
  describe(`${name} form`, () => {
    beforeEach(async () => {
      render(<Component />);
    });

    describe('Email', () => {
      async function fillInInputAndPressTheButton({
        email = 'email@gmail.com',
      } = {}) {
        const submitButton = screen.getByRole('button', {
          name: submitButtonName,
        });
        const emailInput = screen.getByLabelText('Email');

        fireEvent.change(emailInput, {
          target: { value: email },
        });

        await act(async () => {
          fireEvent.click(submitButton);
        });
      }

      describe('Pattern errors', () => {
        const tests = [
          {
            title: 'should be required',
            emailValue: '',
            errorMessage: 'E-mail obrigatório',
          },
          {
            title: 'should be valid',
            emailValue: 'email',
            errorMessage: 'E-mail inválido',
          },
        ];

        for (const { emailValue, errorMessage, title } of tests) {
          it(title, async () => {
            await fillInInputAndPressTheButton({ email: emailValue });

            expect(screen.getByText(errorMessage)).toBeInTheDocument();
          });
        }
      });

      describe('Mock errors', () => {
        const tests = [
          {
            title: 'should show an error message if the user was not found',
            implementation: () => {
              throwFirebaseError('auth/user-not-found');
            },
            errorMessage: 'Este usuário não existe',
          },
          ...(mockImplementation.tests ?? []),
        ];

        async function triggerError(
          implementation?: MockImplementationTest['implementation']
        ) {
          const defaultImplementation = () => {
            throw 'error';
          };

          const newImplementation = implementation ?? defaultImplementation;

          const funcMocked = mocked(mockImplementation.funcToBeMocked);

          funcMocked.mockImplementationOnce(newImplementation);

          await fillInInputAndPressTheButton();
        }

        for (const { errorMessage, title, implementation } of tests) {
          it(title, async () => {
            await triggerError(implementation);

            expect(screen.getByText(errorMessage)).toBeInTheDocument();
          });
        }

        testUnknownError(triggerError);
      });
    });
  });
}
