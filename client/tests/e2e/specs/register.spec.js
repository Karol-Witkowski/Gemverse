describe('Register test', () => {
  beforeEach(() => {
    cy.exec('npm run seed:db');
    cy.visit('/register');
  });

  it('Successfully register', () => {
    cy.get('input[name=username]').type('newUser');
    cy.get('input[name=email]').type('tester@email.tt');
    cy.get('input[name=password]').type('test123');

    cy.get('.v-btn').contains('sign up').click();

    // Check if user were redirected to /roomlist
    cy.url().should('include', '/roomlist');
  });

  it('Displays errors when username is already in use', () => {
    cy.get('input[name=username]').type('user1');
    cy.get('input[name=email]').type('random@email.com');
    cy.get('input[name=password]').type('test12');

    cy.get('.v-btn').contains('sign up').click();

    // Check if user are still on the register page
    cy.url().should('include', '/register');

    // Check if errors are visible
    cy.get('.v-messages').should('contain', 'Name user1 is already in us');
  });

  it('Displays errors when email address is already in use', () => {
    cy.get('input[name=username]').type('newUser');
    cy.get('input[name=email]').type('test4@email.tt');
    cy.get('input[name=password]').type('test12');

    cy.get('.v-btn').contains('sign up').click();

    // Check if user are still on the register page
    cy.url().should('include', '/register');

    // Check if errors are visible
    cy.get('.v-messages').should('contain', 'test4@email.tt address is already in use');
  });

  it('Displays errors on wrong email pattern', () => {
    cy.get('input[name=username]').type('newUser');
    cy.get('input[name=email]').type('testEmail.tt');
    cy.get('input[name=password]').type('test12');

    // Check if errors are visible
    cy.get('.v-messages').contains('Invalid e-mail');

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
    cy.get('.v-messages').should('contain', 'Characters range: 3 - 15');
    cy.get('.v-messages').should('contain', 'E-mail adress must be at least 8 characters long');
    cy.get('.v-messages').should('contain', 'Password must be at least 6 characters long');

    cy.get('input[name=username]').type(' ');

    cy.get('.v-messages').should('contain', 'No blank spaces allowed');
  });

  it('Clear input errors', () => {
    cy.get('input[name=username]').type('newUser');
    cy.get('input[name=email]').type('testEmail.tt');
    cy.get('input[name=password]').type('test12');

    // Check if errors are visible
    cy.get('.v-messages').should('contain', 'Invalid e-mail');

    // Check if button is disabled
    cy.contains('sign up').should('be.disabled');

    cy.get('input[name=email]').clear();

    // Check if errors are not visible after clear
    cy.get('.v-messages').contains('Invalid e-mail').should('not.exist');
  });

  it('Disable button on empty required input', () => {
    cy.get('input[name=username]').type('newUser');
    cy.get('input[name=email]').type('test4@email.tt');

    cy.contains('sign up').should('be.disabled');
  });
});
