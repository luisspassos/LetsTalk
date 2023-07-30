/// <reference types="cypress" />

import '../sharedCommands';
import { emailMessage } from 'components/Form/Input/Inputs/Email';
import { passwordMessage } from 'components/Form/Input/Inputs/Password';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from 'styles/theme';
import { mount } from 'cypress/react';

Cypress.Commands.add('testEmailEmpty', () => {
  cy.contains(emailMessage.required);

  cy.getBySel('email').type('email{enter}');

  cy.contains(emailMessage.required).should('not.exist');
});

Cypress.Commands.add('testPasswordEmpty', () => {
  cy.contains(passwordMessage.required);

  cy.getBySel('password').type('password{enter}');

  cy.contains(passwordMessage.required).should('not.exist');
});

Cypress.Commands.add('mount', (jsx) => {
  return mount(<ChakraProvider theme={theme}>{jsx}</ChakraProvider>);
});
