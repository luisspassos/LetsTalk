/* eslint-disable jest/valid-title */
/* eslint-disable jest/no-export */
import { render, screen } from '@testing-library/react';
import { Component, MockedFunc } from 'utils/types';
import { testUnknownError } from '../testUnknownError';

type TestBlock = () => void;

export type fillOutFormAndPressTheButton = (
  obj?:
    | {
        email: string;
      }
    | undefined
) => Promise<void>;

type TestFormParams = {
  name: string;
  Component: Component;
  fillOutFormAndPressTheButton: fillOutFormAndPressTheButton;
  tests?: {
    email?: TestBlock;
    others?: TestBlock;
  };
  mockedFunc: MockedFunc;
};

export function testFormWithEmail({
  name,
  Component,
  fillOutFormAndPressTheButton,
  tests,
  mockedFunc,
}: TestFormParams) {
  describe(`${name} form`, () => {
    beforeEach(async () => {
      render(<Component />);
    });

    describe('Email', () => {
      const patternTests = [
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

      for (const { emailValue, errorMessage, title } of patternTests) {
        it(title, async () => {
          await fillOutFormAndPressTheButton({ email: emailValue });

          expect(screen.getByText(errorMessage)).toBeInTheDocument();
        });
      }

      tests?.email && tests?.email();
    });

    tests?.others && tests.others();

    testUnknownError(async () => {
      mockedFunc.mockImplementationOnce(() => {
        throw 'err';
      });

      await fillOutFormAndPressTheButton();
    });
  });
}
