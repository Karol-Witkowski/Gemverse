describe("Account delete test", () => {
  beforeEach(() => {
    cy.exec("npm run db:seed");
    cy.login();
    cy.visit("/profile");
  });

  it("Successfully delete a user account", () => {
    cy.get("[name=delete]").click();
    cy.get("button[name=accept]").click();

    cy.url().should("include", "/login");
  });
});
