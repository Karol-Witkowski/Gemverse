describe('Room list test', () => {
  beforeEach(() => {
    cy.exec('npm run db:seed');
    cy.login();
    cy.visit('/roomlist');
  });

  describe('Adding new room', () => {
    it('Successfully add public room', () => {
      cy.contains('add new room')
        .click();
      cy.get('input[name=name]')
        .type('newRoom');
      cy.get('button[name=save]')
        .click();

      cy.contains('newRoom')
        .should('exist');
    });

    it('Successfully add private room', () => {
      cy.get('button[name=add]')
        .click();
      cy.get('input[name=name]')
        .type('newRoom');
      cy.get('input[name=password]')
        .type('password');
      cy.get('button[name=save]')
        .click();

      cy.contains('newRoom')
        .should('exist');
    });

    it('Displays errors when the name is already in use', () => {
      cy.get('button[name=add]')
        .click();
      cy.get('input[name=name]')
        .type('Room 1');
      cy.get('button[name=save]')
        .click();

      cy.get('.v-messages')
        .should('contain', 'Room 1 name is already in use');
      cy.get('button[name=save]')
        .should('be.disabled');
    });

    it('Displays errors on invalid data', () => {
      cy.get('button[name=add]')
        .click();
      cy.get('input[name=name]')
        .type('1');
      cy.get('input[name=password]')
        .type('1');

      cy.get('.v-messages')
        .should('contain', 'Characters range: 3 - 15');
      cy.get('.v-messages')
        .should('contain', 'Password must be at least 6 characters long');
      cy.get('button[name=save]')
        .should('be.disabled');

      cy.get('input[name=password]')
        .type(' ');

      cy.get('.v-messages')
        .should('contain', 'No blank spaces allowed');
      cy.get('button[name=save]')
        .should('be.disabled');
    });

    it('Disable button on the empty required input', () => {
      cy.get('button[name=add]')
        .click();
      cy.get('input[name=password]')
        .type('123456');

      cy.get('button[name=save]')
        .should('be.disabled');
    });
  });

  describe('Enter room', () => {
    it('Successfully join a public room', () => {
      cy.get('button[name=public]')
        .eq(0)
        .click();

      cy.url()
        .should('include', '/room/room2');
    });

    it('Successfully join a private room', () => {
      cy.get('button[name=private]')
        .eq(0)
        .click();
      cy.get('input[name=password]')
        .eq(1)
        .type('test');
      cy.get('button[name=enter]')
        .eq(1)
        .click();

      cy.url()
        .should('include', '/room/room-1');
    });

    it('Displays errors on invalid password', () => {
      cy.get('button[name=private]')
        .eq(0)
        .click();
      cy.get('input[name=password]')
        .eq(1)
        .type('wrong password');
      cy.get('button[name=enter]')
        .eq(1)
        .click();

      cy.get('.v-messages')
        .should('contain', 'Invalid password');
      cy.url()
        .should('include', '/roomlist');
      cy.get('button[name=enter]')
        .eq(1)
        .should('be.disabled');
    });

    it('Redirect the user to the room list on denied access', () => {
      cy.visit('/room/room-1');

      // Check if the user was redirected to the room list
      cy.url()
        .should('include', '/roomlist');

      // Check if access error is visible
      cy.get('.v-alert')
        .should('contain', 'Access denied');

      cy.get('button[name=access]')
        .click();

      // Check if access error is dismissible
      cy.get('.v-alert')
        .should('not.be.visible');
    });
  });

  describe('Remove room', () => {
    it('Successfully remove room', () => {
      cy.get('button[name=add]')
        .click();
      cy.get('input[name=name]')
        .type('newRoom');
      cy.get('button[name=save]')
        .click();

      // Check if the room was successfully added
      cy.contains('newRoom')
        .should('exist');

      cy.get('[name=delete]')
        .click();
      cy.get('button[name=accept]')
        .click();

      // Check if the room was successfully removed
      cy.contains('newRoom')
        .should('not.exist');
    });
  });
});
