describe('User can see a list of all quests', () => {
  beforeEach(() => {
    cy.stubMain()
    cy.login()
    cy.get('#myrequest-home-link').click()
    
  })
  
  describe('when there is something to show', () => {
    beforeEach(() => {
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/my_request/quests",
        response: "fixture:quests/list_of_user_quests.json",
      })
      cy.get("#quests-link").click()
    });
    
    it('user can see all their active quests', () => {
      cy.get('#active').click()
      cy.get('#my-list').should('contain', 'I need help with this 1')
      cy.get('#my-list').should('contain', 'I need help with this 2')
      cy.get('#my-list').should('not.contain', 'I needed help with this 1')
      cy.get('#my-list').should('not.contain', 'I will need help with this 1')
    })

    it('user can see all their pending quests', () => {
      cy.get('#pending').click()
      cy.get('#my-list').should('contain', 'I will need help with this 1')
      cy.get('#my-list').should('contain', 'I will need help with this 2')
      cy.get('#my-list').should('not.contain', 'I need help with this 1')
      cy.get('#my-list').should('not.contain', 'I needed help with this 1')
    })
  
    it('user can see all their completed quests', () => {
      cy.get('#completed').click()
      cy.get('#my-list').should('contain', 'I needed help with this 1')
      cy.get('#my-list').should('contain', 'I needed help with this 2')
      cy.get('#my-list').should('not.contain', 'I need help with this 1')
      cy.get('#my-list').should('not.contain', 'I will need help with this 1')
    })
  })
  
  describe('when there is nothing to show', () => {
    beforeEach(() => {
      cy.route({
        method: "GET",
        url: "http://localhost:3000/api/my_request/quests",
        response: { quests: [] },
      })
      cy.get("#quests-link").click()
    });
    
    it('shows a message instead', () => {
      cy.get('#no-requests-message').should('exist')
    });
  })
})
