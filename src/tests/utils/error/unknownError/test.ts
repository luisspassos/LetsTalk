import { WinProp } from '../base';
import { testError, Props as PropsBase } from '../test';

type Props<WinPropT extends WinProp> = Omit<
  PropsBase<WinPropT>,
  'checkIfErrorAppeared'
>;

export function testUnknownError<WinPropT extends WinProp>(
  props: Props<WinPropT>
) {
  testError({
    checkIfErrorAppeared: () => {
      cy.get('[id="unknown error"]').should('be.visible');
    },
    ...props,
  });
}
