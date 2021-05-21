describe('Login test', () => {
  beforeEach(() => {
    cy.exec('npm run seed:db');
    cy.visit('/login');
  });

  it('Successfully login', () => {
    cy.get('input[name=email]').type('test1@email.tt');
    cy.get('input[name=password]').type('test12');

    cy.contains('sign in').click();

    // Check if user were redirected to /roomlist
    cy.url().should('include', '/roomlist');
  })

  it('Displays errors when user does not exist', () => {
    cy.get('input[name=email]').type('random@email.com');
    cy.get('input[name=password]').type('test12');

    cy.contains('sign in').click();

    // Check if user are still on the login page
    cy.url().should('include', '/login');

    // Check if errors are visible
    cy.contains('User not found - Try again')
  });

  it('Displays errors when password is wrong', () => {
    cy.get('input[name=email]').type('test1@email.tt');
    cy.get('input[name=password]').type('123456');

    cy.contains('sign in').click();

    // Check if user are still on the login page
    cy.url().should('include', '/login');

    // Check if errors are visible
    cy.contains('Invalid password')
  });
});
