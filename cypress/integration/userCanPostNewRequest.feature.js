describe("User can post new reQuest, after navigating to creation form", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "**/my_request/requests",
      response: "fixture:requests/post_new_request.json",
      headers: {
        uid: "user@mail.com",
      },
    });
    cy.route({
      method: "GET",
      url: "**/karma_points*",
      response: { karma_points: 500 },
      headers: {
        uid: "user@mail.com",
      },
    });
    cy.login();
    cy.get("#myrequest-home-link").click();
    cy.get("#requests-link").click();
    cy.get("#create-request-link").click();
  });

  describe("successfully", () => {
    it("entering title, description, reward and category", () => {
      cy.get("#title").type("Fix my bike");
      cy.get("#description").type("I cant ride my bike, HILFE, hilfe, pronto!");
      cy.get("#reward").type("100");
      cy.get("#category").click();
      cy.get("#category > .visible > :nth-child(2)").click();
      cy.get("#submit-btn").contains("Submit").click();
      cy.get("#message").should(
        "contain",
        "Your reQuest was successfully created!"
      );
    });

    it("The input fields are cleared on submission", () => {
      cy.get("#title").type("Fix my bike");
      cy.get("#description").type("I cant ride my bike, HILFE, hilfe, pronto!");
      cy.get("#reward").type("100");
      cy.get("#category").click();
      cy.get("#category > .visible > :nth-child(2)").click();
      cy.get("#submit-btn").contains("Submit").click();
      cy.get("#message").should("be.visible");
      cy.get("#title").should("not.have.value", "Fix my bike");
      cy.get("#description").should(
        "not.have.value",
        "I cant ride my bike, HILFE, hilfe, pronto!"
      );
      cy.wait(3000);
      cy.get("#message").should("not.be.visible");
    });
  });

  describe("unsuccessfully", () => {
    it("without entering title", () => {
      cy.get("#submit-btn").contains("Submit").click();
      cy.get("#title").then(($title) => {
        expect($title[0].validationMessage).to.eq(
          "Please fill in this field."
        );
      });
    });

    it("without entering description", () => {
      cy.get("#title").type("Fix my bike");
      cy.get("#submit-btn").contains("Submit").click();
      cy.get("#description").then(($description) => {
        expect($description[0].validationMessage).to.eq(
          "Please fill in this field."
        );
      });
    });

    it("without entering reward", () => {
      cy.get("#title").type("Fix my bike");
      cy.get("#description").type("I cant ride my bike, HILFE, hilfe, pronto!");
      cy.get("#submit-btn").contains("Submit").click();
      cy.get("#reward").then(($reward) => {
        expect($reward[0].validationMessage).to.eq(
          "Please fill in this field."
        );
      });
    });

    it("due to lack of karma points", () => {
      cy.get("#title").type("Fix my bike");
      cy.get("#description").type("I cant ride my bike, HILFE, hilfe, pronto!");
      cy.get("#reward")
        .type("600")
        .then(($input) => {
          expect($input[0].validationMessage).to.eq(
            "Value must be less than or equal to 500."
          );
        });
    });
  });
});
