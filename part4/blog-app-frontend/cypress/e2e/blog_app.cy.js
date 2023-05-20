describe("blog app", function () {
  beforeEach(function () {
    const user = {
      username: "Michi",
      password: "01022023",
      name: "admin2",
    };
    cy.request("POST", `${Cypress.env('BACKEND')}/testing/reset`);
    cy.request("POST", `${Cypress.env('BACKEND')}/users`, user);
    cy.visit("");
  });
  it("front page can be open", function () {
    cy.contains("Blogs app");
    cy.contains("Blogs app made by Alexis Ruiz");
  });

  it("login form can be opened and a new session can be started", function () {
    cy.contains("login").click();
    cy.get("#username").type("Michi");
    cy.get("#password").type("01022023");
    cy.get("#login-button").click();
    cy.contains("Michi has loged in");
    cy.contains("Logout").click();
  });

  it("fails login if password is incorrect", function () {
    cy.contains("login").click();
    cy.get("#username").type("Michi");
    cy.get("#password").type("wrong password");
    cy.get("#login-button").click();
    cy.contains("Wrong Credentials");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      //Use command in support instead
      cy.login({
        username: "Michi",
        password: "01022023",
      });
      //This is not recommended check this link for bypassing
      // https://docs.cypress.io/guides/end-to-end-testing/testing-your-app#Fully-test-the-login-flow-but-only-once
      /* cy.contains("login").click();
      cy.get("#username").type("Michi");
      cy.get("#password").type("01022023");
      cy.get("#login-button").click(); */
    });
    it("a new blog can be created", function () {
      cy.contains("Add blog").click();
      cy.get("#title").type("End to end testing with Cypress is fun!");
      cy.get("#url").type("wwww.example.com");
      cy.get("#author").type("Alexis Ruiz");
      cy.get("#submit-button").click();
      cy.contains("End to end testing with Cypress is fun!");
    });
    describe("and a note exists", function () {
      beforeEach(function () {
        cy.addBlog({
          title: "PUT test 1",
          author: "Alex",
          url: "wwww.lel.com",
          likes: "55",
        });
        /* 
      Use a command that bypasses this stuff
      cy.contains("Add blog").click();
        cy.get("#title").type("Default blog for testing!");
        cy.get("#url").type("wwww.example.com");
        cy.get("#author").type("Alexis Ruiz");
        cy.get("#submit-button").click(); */
      });

      it("anyone can like blogs", function () {
        cy.contains("View details").click();
        cy.get("#like-button").click();
        cy.contains("Likes 56");
      });
    });
  });
});
