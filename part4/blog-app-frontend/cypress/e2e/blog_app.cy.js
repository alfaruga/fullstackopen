describe("blogg app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });
  it("front page can be open", function () {
    cy.contains("Blogs app");
    cy.contains("Blogs app made by Alexis Ruiz");
  });
  /*  it("front page contains random text", function () {
    cy.visit("http://localhost:3000");
    cy.contains("wtf is this app?");
  }); */

  it("login form can be opened", function () {
    cy.contains("login").click();
    cy.get("#username").type("Norma");
    cy.get("#password").type("2011");
    cy.get("#login-button").click();
    cy.contains("Norma has loged in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("login").click();
      cy.get("#username").type("Norma");
      cy.get("#password").type("2011");
      cy.get("#login-button").click();
    });

    it("a new blog can be created", function () {
      cy.contains("Add blog").click();
      cy.get("#title").type("End to end testing with Cypress is fun!");
      cy.get("#url").type("wwww.example.com");
      cy.get("#author").type("Alexis Ruiz");
      cy.get("#submit-button").click();
      cy.contains(`new blog: End to end testing with Cypress is fun! added`);
    });
  });
});
