Cypress.Commands.add("login", () => {
  cy.request({
    method: "POST",
    url: "http://localhost:3000/api/authentication/login",
    body: {
      email: "test1@email.tt",
      password: "test12",
    },
  }).then((response) => {
    window.localStorage.setItem("authenticationToken", response.body.token);
  });
});
