describe("Bloglist", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      username: "testing",
      name: "Name Surname",
      password: "password",
    };
    cy.request("POST", "http://localhost:3001/api/users", user);
    cy.visit("http://localhost:3000");
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
        const credentials = {
          username: "testing",
          password: "password",
        };
        cy.request("POST", "http://localhost:3001/api/login", credentials).then(
          ({ body }) => {
            localStorage.setItem("loggedUser", JSON.stringify(body));
            cy.visit("http://localhost:3000");
          }
        );
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
      });
    });
  });
});
