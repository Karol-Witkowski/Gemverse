beforeEach(() => {
  cy.exec('npm run seed:db');
  cy.visit('/login');
});

describe('Login test', () => {
  it('Successfully login', () => {
    cy.get('input[name=email]').type('test1@email.tt');
    cy.get('input[name=password]').type('test12');

    cy.get('button[name=login]').click();

    cy.url().should('include', '/roomlist');
  })

  it('Displays errors when user does not exist', () => {
    cy.get('input[name=email]').type('random@email.com');
    cy.get('input[name=password]').type('test12');

    cy.get('button[name=login]').click();

    // Check if user are still on the login page
    cy.url().should('include', '/login');

    // Check if errors are visible
    cy.get('.v-messages').should('contain', 'User not found - Try again');
  });

  it('Displays errors when password is wrong', () => {
    cy.get('input[name=email]').type('test1@email.tt');
    cy.get('input[name=password]').type('123456');

    cy.get('button[name=login]').click();

    // Check if user are still on the login page
    cy.url().should('include', '/login');

    // Check if errors are visible
    cy.get('.v-messages').should('contain', 'Invalid password');
  });

  it('Clear input errors', () => {
    cy.get('input[name=email]').type('test1@email.tt');
    cy.get('input[name=password]').type('123456');

    cy.get('button[name=login]').click();

    // Check if user are still on the login page
    cy.url().should('include', '/login');

    // Check if errors are visible
    cy.get('.v-messages').should('contain', 'Invalid password');

    cy.get('input[name=password]').clear();

    // Check if errors are not visible after clear
    cy.get('.v-messages').contains('Invalid password').should('not.exist');
  });

  it('Disable button on empty required inputs', () => {
    cy.get('input[name=email]').type('test1@email.tt');

    cy.get('button[name=login]').should('be.disabled');
  });
});
