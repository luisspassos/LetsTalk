/* eslint-disable jest/valid-title */
/* eslint-disable jest/no-export */
import { render, screen } from '@testing-library/react';
import { MockableFunction, mocked } from 'jest-mock';
import { Component, MockedFunc } from 'utils/types';
import { testUnknownError } from '../testUnknownError';
import {
  createFillOutFormAndPressTheButton,
  Label,
  Params as FormInfo,
} from './createFillOutFormAndPressTheButton';
import { ReducedParams, testFirebaseError } from './testFirebaseError';

type TestUtils<L extends Label> = {
  mockedFunc: MockedFunc;
  fillOutFormAndPressTheButton: ReturnType<
    typeof createFillOutFormAndPressTheButton<L>
  >['fillOutFormAndPressTheButton'];
  testFirebaseError: (rest: ReducedParams) => Promise<void>;
};

type TestBlock<L extends Label> = (testUtils: TestUtils<L>) => void;

export type fillOutFormAndPressTheButton = (
  obj?:
    | {
        email: string;
      }
    | undefined
) => Promise<void>;

type TestFormParams<L extends Label> = {
  name: string;
  Component: Component;
  tests?: {
    email?: TestBlock<L>;
    others?: TestBlock<L>;
  };
  funcToBeMocked: MockableFunction;
  formInfo: FormInfo<L>;
};

export function testFormWithEmail<L extends Label>({
  name,
  Component,
  tests,
  formInfo,
  funcToBeMocked,
}: TestFormParams<L>) {
  const mockedFunc = mocked(funcToBeMocked);

  const { fillOutFormAndPressTheButton } =
    createFillOutFormAndPressTheButton(formInfo);

  async function newTestFirebaseError(rest: ReducedParams) {
    await testFirebaseError({
      mockedFunc,
      fillOutFormAndPressTheButton,
      ...rest,
    });
  }

  const testUtils: TestUtils<L> = {
    mockedFunc,
    fillOutFormAndPressTheButton,
    testFirebaseError: newTestFirebaseError,
  };

  describe(`${name} form`, () => {
    beforeEach(async () => {
      render(<Component />);
    });

    function emailTests() {
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

          expect(screen.getByText(errorMessage)).toBeVisible();
        });
      }

      tests?.email && tests?.email(testUtils);
    }

    // eslint-disable-next-line jest/valid-describe-callback
    describe('Email', emailTests);

    tests?.others && tests.others(testUtils);

    testUnknownError(async () => {
      mockedFunc.mockImplementationOnce(() => {
        throw 'err';
      });

      await fillOutFormAndPressTheButton();
    });
  });
}
