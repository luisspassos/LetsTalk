import { FirebaseError } from 'firebase/app';

export type SubmitForm = () => void;
export type WinProp = keyof Cypress.AUTWindow;
export type FuncToBeStubbed<WinPropT extends WinProp> = [
  WinPropT,
  keyof Cypress.AUTWindow[WinPropT]
];

export type Props<WinPropT extends WinProp> = {
  err: FirebaseError | string;
  submitForm: SubmitForm;
  funcToBeStubbed: FuncToBeStubbed<WinPropT>;
  checkIfErrorAppeared: () => void;
};

/**
 * A function that tests if an error is being displayed based on the error thrown
 *
 * @param props An object containing the following properties:
 * @param props.err The error to be thrown. Can be a string or a firebase error.
 * @param props.funcToBeStubbed An array containing the property of window where the function to be stubbed is. The format must be: `[winProp, funcToBeStubbed]`
 * @param props.submitForm A function that fills and submits the form
 * @param props.checkIfErrorAppeared A function that verifies if error is being displayed
 */

export function base<WinPropT extends WinProp>({
  err,
  funcToBeStubbed: [winProp, funcToBeStubbed],
  submitForm,
  checkIfErrorAppeared,
}: Props<WinPropT>) {
  cy.window().then((win) => {
    cy.stub(win[winProp], funcToBeStubbed).callsFake(() => {
      throw err;
    });

    submitForm();

    checkIfErrorAppeared();
  });
}
