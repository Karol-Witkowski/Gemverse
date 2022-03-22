describe("Chat test", () => {
  beforeEach(() => {
    cy.exec("npm run db:seed");
    cy.login();
    cy.visit("/room/room2");
  });

  it("Successfully send message", () => {
    cy.get("input[name=message]").type("test message");
    cy.get("button").eq(3).click();

    cy.contains("test message").should("exist");
  });

  it("Prevent send an empty message", () => {
    cy.get("input[name=message]").type(" ");
    cy.get("button").eq(3).click();

    cy.get(".v-messages").should("contain", "Message can not be empty");
  });

  it("Clear message", () => {
    cy.get("input[name=message]").type("test message");
    cy.get("button").eq(2).click();

    cy.get("input[name=message]").should("contain", "");
  });

  it("Redirect to room list on leave event", () => {
    cy.get("button[name=panel]").eq(0).click();
    cy.get("[name=leave]").eq(0).click();

    cy.url().should("include", "/roomlist");
  });
});
