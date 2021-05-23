beforeEach(() => {
  cy.exec('npm run seed:db');
  cy.login();
  cy.visit('/roomlist');
});

describe('Room list test - adding new room', () => {
  it('Successfully add public room', () => {
    cy.contains('add new room').click();
    cy.get('input[name=name]').type('newRoom');
    cy.get('.v-btn').contains('save').click();

    cy.contains('newRoom');
  });

  it('Successfully add private room', () => {
    cy.contains('add new room').click();
    cy.get('input[name=name]').type('newRoom');
    cy.get('input[name=password]').type('password');
    cy.get('.v-btn').contains('save').click();

    cy.contains('newRoom');
  });

  it('Displays errors when name is already in use', () => {
    cy.contains('add new room').click();
    cy.get('input[name=name]').type('Room 1');
    cy.get('.v-btn').contains('save').click();

    cy.get('.v-messages').should('contain', 'Room 1 name is already in use');
    cy.contains('save').should('be.disabled');
  });

  it('Displays errors on invalid data', () => {
    cy.contains('add new room').click();
    cy.get('input[name=name]').type('1');
    cy.get('input[name=password]').type('1');

    cy.get('.v-messages').should('contain', 'Characters range: 3 - 15');
    cy.get('.v-messages').should('contain', 'Password must be at least 6 characters long');
    cy.contains('save').should('be.disabled');

    cy.get('input[name=password]').type(' ');

    cy.get('.v-messages').should('contain', 'No blank spaces allowed');
    cy.contains('save').should('be.disabled');
  });

  it('Disable button on empty required input', () => {
    cy.contains('add new room').click();
    cy.get('input[name=password]').type('123456');

    cy.contains('save').should('be.disabled');
  });
});

describe('Room list test - enter room', () => {
  it('Successfully join public room', () => {;
    cy.get('[name=public]').eq(0).click();

    cy.url().should('include', '/room/room2');
  });

  it('Successfully join private room', () => {;
    cy.get('[name=private]').eq(0).click();
    cy.get('input[name=password]').eq(1).type('test');
    cy.get('button').eq(11).click();

    cy.url().should('include', '/room/room-1');
  });

  it('Displays errors on invalid password', () => {;
    cy.get('[name=private]').eq(0).click();
    cy.get('input[name=password]').eq(1).type('wrong password');
    cy.get('button').eq(11).click();

    cy.get('.v-messages').should('contain', 'Invalid password');
    cy.url().should('include', '/roomlist');
    cy.get('button').eq(11).should('be.disabled');
  });
});
