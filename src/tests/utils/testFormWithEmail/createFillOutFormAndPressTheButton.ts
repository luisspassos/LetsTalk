import { fireEvent, screen } from '@testing-library/dom';
import { clickButton } from '../Button/clickButton';
import { getButton } from '../Button/getButton';

export type Label = string;

type Inputs<L extends Label> = { label: L; defaultValue: string };

export type Params<L extends Label> = {
  inputs?: Inputs<L>[];
  buttonName: string;
};

export function createFillOutFormAndPressTheButton<L extends Label>({
  buttonName,
  inputs = [],
}: Params<L>) {
  const newInputs: Inputs<string>[] = [
    {
      label: 'Email',
      defaultValue: 'test@example.com',
    },
    ...inputs,
  ];

  type InputValues = {
    [K in L]?: string;
  } & {
    Email?: string;
  };

  async function fillOutFormAndPressTheButton(inputValues?: InputValues) {
    const formattedInputs = newInputs.map(({ label }) =>
      screen.getByLabelText(label)
    );

    const button = getButton(buttonName);

    function fillInputs() {
      for (const i in formattedInputs) {
        const { defaultValue, label } = newInputs[i];
        const formattedInput = formattedInputs[i];

        const value = inputValues?.[label.toLowerCase()];

        fireEvent.change(formattedInput, {
          target: { value: value ?? defaultValue },
        });
      }
    }

    fillInputs();

    await clickButton(button);
  }

  return { fillOutFormAndPressTheButton };
}
