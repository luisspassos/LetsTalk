/// <reference types="cypress" />

Cypress.Commands.add('loginByGoogleApi', () => {
  cy.log('Logging in to Google');
  cy.request({
    method: 'POST',
    url: 'https://www.googleapis.com/oauth2/v4/token',
    body: {
      grant_type: 'refresh_token',
      client_id:
        '1002492041049-rdf8vtof5ee4t3chh8hi79i0btm357h4.apps.googleusercontent.com',
      client_secret: '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',
      refresh_token:
        '1//04FzrfDPcZwddCgYIARAAGAQSNwF-L9IrAkwLA75uYYTi3BLvcmc_lnl_7AfrGsO_-Hc17jgBCrNoV5lUuFJrIy_BoxCWi1k2d7k',
    },
  }).then(({ body }) => {
    const { access_token, id_token } = body;

    cy.request({
      method: 'GET',
      url: 'https://www.googleapis.com/oauth2/v3/userinfo',
      headers: { Authorization: `Bearer ${access_token}` },
    }).then(({ body }) => {
      cy.log(body);
      const userItem = {
        token: id_token,
        user: {
          googleId: body.sub,
          email: body.email,
          givenName: body.given_name,
          familyName: body.family_name,
          imageUrl: body.picture,
        },
      };

      window.localStorage.setItem('googleCypress', JSON.stringify(userItem));
      document.cookie = '';
      document.cookie = 'token=' + id_token;
      cy.visit('/');
    });
  });
});
