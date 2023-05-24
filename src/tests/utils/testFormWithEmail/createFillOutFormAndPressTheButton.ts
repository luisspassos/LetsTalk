import { fireEvent, screen } from '@testing-library/dom';
import { clickButton } from '../Button/clickButton';
import { getButton } from '../Button/getButton';

type Label = string;

type Inputs<L extends Label> = { label: L; defaultValue: string }[];

type Params<L extends Label> = {
  inputs?: Inputs<L>;
  buttonName: string;
};

export function createFillOutFormAndPressTheButton<L extends Label>({
  buttonName,
  inputs,
}: Params<L>) {
  const newInputs = [
    {
      label: 'email',
      defaultValue: 'test@example.com',
    },
    ...(inputs ?? []),
  ];

  type InputValues = {
    [K in L]?: string;
  };

  function fillOutFormAndPressTheButton(inputValues?: InputValues) {
    const formattedInputs = newInputs.map(({ label }) =>
      screen.getByLabelText(label)
    );

    const button = getButton(buttonName);

    for (const i in formattedInputs) {
      const { defaultValue, label } = newInputs[i];
      const formattedInput = formattedInputs[i];

      const value = inputValues?.[label];

      fireEvent.change(formattedInput, {
        target: { value: value ?? defaultValue },
      });

      clickButton(button);
    }
  }

  return { fillOutFormAndPressTheButton };
}
