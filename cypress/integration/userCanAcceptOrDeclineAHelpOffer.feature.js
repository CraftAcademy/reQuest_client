describe("User can", () => {
  beforeEach(() => {
    cy.stubMain();
  });
  describe("successfully accept a help offer by clicking 'Accept'", () => {
    beforeEach(() => {
      cy.route({
        method: "GET",
        url: "**/my_request/requests",
        response: "fixture:list_of_my_requests.json",
        headers: {
          uid: "me@mail.com",
        },
      });
      cy.route({
        method: "GET",
        url: "**/my_request/requests/1",
        response: "fixture:view_specific_request_with_pending_offers.json",
        headers: {
          uid: "me@mail.com",
        },
      });
      cy.route({
        method: "PUT",
        url: "**/offers/*",
        response: "fixture:putOffer_accepted.json",
        headers: {
          uid: "me@mail.com",
        },
      });
      cy.login();
      cy.get("#myrequest-home-link").click();
      cy.get("#requests-link").click();
      cy.get("#request-1").click();
      cy.get("#helper-message").should("not.be.visible");
      cy.get("#offer-1").within(() => {
        cy.get(".helper-email-1").should("be.visible");
      });
      cy.get(".helper-email-1").click();
      cy.get("button#accepted").should("be.visible");
      cy.get("button#declined").should("be.visible");
      cy.wait(1000);
    });

    it("success message is shown", () => {
      cy.get("button#accepted").contains("Accept").click();
      cy.get("p#status-message").contains(
        "You accepted help from helper@mail.com"
      );
    });
  });

  describe("When offer it accepted it's not shown in my pending offers", () => {
    beforeEach(() => {
      cy.route({
        method: "GET",
        url: "**/my_request/requests",
        response: "fixture:list_of_my_requests.json",
        headers: {
          uid: "me@mail.com",
        },
      });
      cy.route({
        method: "GET",
        url: "**/my_request/requests/1",
        response: "fixture:view_specific_request_with_updated_offers.json",
        headers: {
          uid: "me@mail.com",
        },
      });
      cy.login();
      cy.get("#myrequest-home-link").click();
      cy.get("#requests-link").click();
      cy.get("#request-1").click();
      cy.wait(1000);
    });

    it("the offers disappears from pending", () => {
      cy.get(".helper-email-2").should("be.visible");
      cy.get(".helper-email-1").should("not.be.visible");
    });
  });

  describe("successfully decline a help offer by clicking 'Decline'", () => {
    beforeEach(() => {
      cy.route({
        method: "GET",
        url: "**/my_request/requests",
        response: "fixture:list_of_my_requests.json",
        headers: {
          uid: "me@mail.com",
        },
      });
      cy.route({
        method: "GET",
        url: "**/my_request/requests/1",
        response: "fixture:view_specific_request_with_pending_offers.json",
        headers: {
          uid: "me@mail.com",
        },
      });
      cy.route({
        method: "PUT",
        url: "**/offers/*",
        response: "fixture:putOffer_declined.json",
        headers: {
          uid: "me@mail.com",
        },
      });
      cy.login();
      cy.get("#myrequest-home-link").click();
      cy.get("#requests-link").click();
      cy.get("#request-1").click();
      cy.get("#helper-message").should("not.be.visible");
      cy.get("#offer-2").within(() => {
        cy.get(".helper-email-2").should("be.visible").click();
      });
      cy.get("button#declined").should("be.visible");
      cy.wait(1000);
    });

    it("and sees a decline success message", () => {
      cy.get("button#declined").contains("Decline").click();
      cy.get("p#status-message").contains(
        "You declined help from helper@mail.com"
      );
    });
  });
});
