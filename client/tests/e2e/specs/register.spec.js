describe('Register test', () => {
  beforeEach(() => {
    cy.exec('npm run seed:db');
    cy.visit('/register');
  });

  it('Successfully register', () => {
    cy.get('input[name=username]').type('newUser');
    cy.get('input[name=email]').type('tester@email.tt');
    cy.get('input[name=password]').type('test123');

    cy.contains('sign up').click();

    // Check if user were redirected to /roomlist
    cy.url().should('include', '/roomlist');
  });

  it('Displays errors when username is already in use', () => {
    cy.get('input[name=username]').type('user1');
    cy.get('input[name=email]').type('random@email.com');
    cy.get('input[name=password]').type('test12');

    cy.contains('sign up').click();

    // Check if user are still on the register page
    cy.url().should('include', '/register');

    // Check if errors are visible
    cy.contains('Name user1 is already in use');
  });

  it('Displays errors when email address is already in use', () => {
    cy.get('input[name=username]').type('newUser');
    cy.get('input[name=email]').type('test4@email.tt');
    cy.get('input[name=password]').type('test12');

    cy.contains('sign up').click();

    // Check if user are still on the register page
    cy.url().should('include', '/register');

    // Check if errors are visible
    cy.contains('test4@email.tt address is already in use');
  });

  it('Displays errors on wrong email pattern', () => {
    cy.get('input[name=username]').type('newUser');
    cy.get('input[name=email]').type('testEmail.tt');
    cy.get('input[name=password]').type('test12');

    // Check if errors are visible
    cy.contains('Invalid e-mail');

    // Check if button is disabled
    cy.contains('sign up').should('be.disabled');
  });

  it('Displays errors when data is invalid', () => {
    cy.get('input[name=username]').type('1');
    cy.get('input[name=email]').type('1');
    cy.get('input[name=password]').type('1');

    // Check if button is disabled
    cy.contains('sign up').should('be.disabled');

    // Check if errors are visible
    cy.contains('Characters range: 3 - 15');
    cy.contains('E-mail adress must be at least 8 characters long');
    cy.contains('Password must be at least 6 characters long');
  });

  it('Clear input errors', () => {
    cy.get('input[name=username]').type('newUser');
    cy.get('input[name=email]').type('testEmail.tt');
    cy.get('input[name=password]').type('test12');

    // Check if errors are visible
    cy.contains('Invalid e-mail');

    // Check if button is disabled
    cy.contains('sign up').should('be.disabled');

    cy.get('input[name=email]').clear();

    // Check if errors are not visible after clear
    cy.contains('Invalid e-mail').should('not.exist');
  });

  it('Disable button on empty required input', () => {
    cy.get('input[name=username]').type('newUser');
    cy.get('input[name=email]').type('test4@email.tt');

    cy.contains('sign up').should('be.disabled');
  });
});
