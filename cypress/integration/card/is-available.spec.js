describe('service is available', function () {
  it('should be available on localhost:3000', function () {
    cy.visit('http://localhost:3000')
  })
  it('should be Drag Bun and Ingredient', function () {
    cy.get('[data-item="60d3b41abdacab0026a733c7"]').trigger('dragstart')
    cy.get('[data-dropcontainer="main"]').trigger('drop', { force: true })
    cy.get('[data-item="60d3b41abdacab0026a733cd"]').trigger('dragstart')
    cy.get('[data-dropcontainer="main"]').trigger('drop', { force: true })
  })
  it('should be elements bun and ingredient in containers', function () {
    cy.get('[data-buncontainer="1"')
      .children()
      .should($children => {
        expect($children).to.have.length(1)
      })
    cy.get('[data-buncontainer="2"')
      .children()
      .should($children => {
        expect($children).to.have.length(1)
      })
    cy.get('[data-productcontainer="1"]')
      .children()
      .should($children => {
        expect($children).to.have.length(1)
      })
  })
})
