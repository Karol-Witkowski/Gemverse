beforeEach(() => {
  cy.exec('npm run seed:db');
  cy.login();
  cy.visit('/profile');
});

describe('Account delete test', () => {
  it('Successfully delete user account', () => {
    cy.get('button[name=delete]').click();
    cy.get('button[name=accept]').click();

    cy.url().should('include', '/login');
  });
});
