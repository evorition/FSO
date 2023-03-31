describe("Bloglist", () => {
  beforeEach(() => {
    cy.request("POST", `${Cypress.env("BACKEND")}/testing/reset`);

    cy.createUser({
      username: "testing",
      name: "Name Surname",
      password: "password",
    });
  });

  it("Login form is shown", () => {
    cy.contains("log in to application");
  });

  describe("login", () => {
    it("succeeds with correct credentials", () => {
      cy.get("#username").type("testing");
      cy.get("#password").type("password");
      cy.get("#login-button").click();

      cy.contains("Name Surname logged in");
    });

    it("fails with wrong credentials", () => {
      cy.get("#username").type("testing");
      cy.get("#password").type("wrongpassword");
      cy.get("#login-button").click();

      cy.contains("wrong username or password").should(
        "have.css",
        "color",
        "rgb(255, 0, 0)"
      );

      cy.get("html").should("not.contain", "Name Surname logged in");
    });

    describe("When logged in", () => {
      beforeEach(() => {
        cy.login({ username: "testing", password: "password" });
      });

      it("A blog can be created", () => {
        cy.contains("new blog").click();

        cy.get("#title").type("New blog");
        cy.get("#author").type("Name Surname");
        cy.get("#url").type("www.google.come");
        cy.get("#create-button").click();

        cy.contains("New blog Name Surname");
      });

      describe("and a blog exists", () => {
        beforeEach(() => {
          cy.createBlog({
            title: "New blog",
            author: "Name Surname",
            url: "www.google.com",
          });
        });

        it("it can be liked", () => {
          cy.contains("New blog Name Surname").contains("show").click();
          cy.contains("like").click();
        });

        it("can be deleted by the user who created it", () => {
          cy.contains("New blog Name Surname").contains("show").click();
          cy.contains("remove").click();

          cy.contains("New blog Name Surname").should("not.exist");
        });

        it("delete button only visible to blog creator", () => {
          cy.createUser({
            username: "testing2",
            name: "Second User",
            password: "password",
          });
          cy.login({ username: "testing2", password: "password" });

          cy.contains("New blog Name Surname").contains("show").click();
          cy.contains("remove").should("not.exist");
        });
      });
    });
  });
});
