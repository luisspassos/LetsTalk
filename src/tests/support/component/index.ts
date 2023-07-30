import { toast } from '@chakra-ui/react';
import './commands.tsx';

beforeEach(() => {
  function closeToasts() {
    // the toasts persist between the tests, because of that we need to close them.
    toast.closeAll();

    cy.get('[role="listitem"]').should('not.exist');
  }

  closeToasts();
});
