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

        it("blogs are orders from the most liked to the least", () => {
          cy.createBlog({
            title: "The title with most likes",
            author: "Name Surname",
            url: "www.google.com",
          });
          cy.createBlog({
            title: "The title with the second likes",
            author: "Name Surname",
            url: "www.google.com",
          });

          cy.contains("The title with most likes").contains("show").click();
          cy.contains("The title with most likes")
            .parent()
            .contains("button", "like")
            .click()
            .wait(1000)
            .click()
            .wait(1000)
            .click()
            .wait(1000);

          cy.contains("The title with the second likes")
            .contains("show")
            .click();
          cy.contains("The title with the second likes")
            .parent()
            .contains("button", "like")
            .click()
            .wait(1000)
            .click();

          cy.get(".blog").eq(0).should("contain", "The title with most likes");
          cy.get(".blog")
            .eq(1)
            .should("contain", "The title with the second likes");
          cy.get(".blog").eq(2).should("contain", "New blog");
        });
      });
    });
  });
});
