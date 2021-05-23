describe('Room test', () => {
  beforeEach(() => {
    cy.exec('npm run seed:db');
    cy.login();
  });

  it('Successfully add public room', () => {
    cy.visit('/roomlist');
    cy.contains('add new room').click();

    cy.get('input[name=name]').type('newRoom');

    cy.contains('save').click();

    // Check if user were redirected to /roomlist
    cy.url().should('include', '/roomlist');
  });
});
