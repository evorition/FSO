describe("Bloglist", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", () => {
    cy.contains("log in to application");
  });
});
