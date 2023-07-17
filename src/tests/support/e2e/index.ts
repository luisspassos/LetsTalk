import './commands';
import 'services/firebase';

// Uncaught Exceptions

Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('ResizeObserver loop limit exceeded')) {
    return false;
  }
});
