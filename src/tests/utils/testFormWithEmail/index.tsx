/* eslint-disable jest/valid-title */
/* eslint-disable jest/no-export */
import { render } from '@testing-library/react';
import { MockableFunction, mocked } from 'jest-mock';
import { Component, MockedFunc } from 'utils/types';
import { testUnknownError } from '../testUnknownError';
import {
  createFillOutFormAndPressTheButton,
  FillOutFormAndPressTheButton,
  Label,
  Params as FormInfo,
} from './createFillOutFormAndPressTheButton';
import { formErrorExpect } from './formErrorExpect';
import {
  ReducedParams,
  testFirebaseError,
  TestFirebaseErrorReduced,
} from './testFirebaseError';

type TestUtils<L extends Label> = {
  mockedFunc: MockedFunc;
  fillOutFormAndPressTheButton: FillOutFormAndPressTheButton<L>;
  testFirebaseError: (rest: ReducedParams<L>) => Promise<void>;
};

type TestBlock<L extends Label> = (testUtils: TestUtils<L>) => void;

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

  const testFirebaseErrorReduced: TestFirebaseErrorReduced<L> = async (
    rest
  ) => {
    await testFirebaseError({
      mockedFunc,
      fillOutFormAndPressTheButton,
      ...rest,
    });
  };

  const testUtils: TestUtils<L> = {
    mockedFunc,
    fillOutFormAndPressTheButton,
    testFirebaseError: testFirebaseErrorReduced,
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
        // eslint-disable-next-line jest/expect-expect
        it(title, async () => {
          await fillOutFormAndPressTheButton({ Email: emailValue });

          formErrorExpect(errorMessage);
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
