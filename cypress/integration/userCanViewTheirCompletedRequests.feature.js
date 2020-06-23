describe("User can view their completed reQuests", () => {
  beforeEach(() => {
    cy.stubMain();
    cy.StubRequestCompleted();
    cy.login();
    cy.get("#myrequest-home-link").click();
    cy.wait(500);
    cy.get("#requests-link").click();
  });

  it('in a list, by navigating to "completed reQuests"', () => {
    cy.get("#completed-link").click();
    cy.get("#request-7").within(() => {
      cy.get(".header").should("contain", "Teach me Korean");
    });
    cy.get("#request-8").within(() => {
      cy.get(".header").should("contain", "Im in prison");
    });
  });

  it("can view a specific reQuest and its offer message", () => {
    cy.get("#completed-link").click();
    cy.get("#request-7").click();
    cy.wait(1000);
    cy.get("#request-description-7").should("be.visible");
    cy.get("#offers > .cards > .ui > .content > .meta").should(
      "contain",
      "pauline@mail.com"
    );
    cy.get("#offer-message").should("contain", "Im a natural, i can teach you");
  });

  it("when a second reQuest is clicked, it's expanded instead of the first", () => {
    cy.get("#completed-link").click();
    cy.get("#request-8").click();
    cy.get("#request-description-8").should("be.visible");
    cy.get("#offers > .cards > .ui > .content > .meta").should(
      "contain",
      "offerer666@mail.com"
    );
    cy.get("#offer-message").should("contain", "I have a saw, I'm fast");
  });

  it("clicking a reQuest a second time makes it collapse", () => {
    cy.get("#completed-link").click();
    cy.get("#request-7").click();
    cy.wait(1000);
    cy.get("#request-7").click();
    cy.get("#request-description-6").should("not.be.visible");
  });

  it("when navigating to another tab, the active reQuest and message disappears", () => {
    cy.get("#completed-link").click();
    cy.get("#request-8").click();
    cy.get("#request-description-8").should("be.visible");
    cy.get("#offers > .cards > .ui > .content > .meta").should(
      "contain",
      "offerer666@mail.com"
    );
    cy.get("#offer-message").should("be.visible");
    cy.get("#pending-link").click();
    cy.get("#request-description-8").should("not.be.visible");
    cy.get("#offer-message").should("not.be.visible");
  });
});
