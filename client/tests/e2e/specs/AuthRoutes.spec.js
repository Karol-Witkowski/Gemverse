beforeEach(() => {
  cy.exec('npm run seed:db');
  cy.login();
  cy.visit('/roomlist')
  cy.get('[role=tab]').eq(5).click();
});

describe('Auth routes test', () => {
  it('Forbids visit room list if not authenticated', () => {
    cy.visit('/roomlist')

    cy.url().should('include', '/login')
  });

  it('Forbids visit profile panel if not authenticated', () => {
    cy.visit('/profile')

    cy.url().should('include', '/login')
  });

  it('Forbids visit specific room if not authenticated', () => {
    cy.visit('/room/room2')

    cy.url().should('include', '/login')
  });
});
