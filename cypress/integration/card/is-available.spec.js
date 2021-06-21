describe('service is available', function () {
  it('should be available on localhost:3000', function () {
    cy.visit('http://localhost:3000');
  });
  it('should be Drag Bun and Ingredient', function () {
    cy.get('[data-item="60cb6564fce49c00269d4018"]').trigger('dragstart');
    cy.get('[data-dropContainer="main"]').trigger('drop', { force: true });
    cy.get('[data-item="60cb6564fce49c00269d401e"]').trigger('dragstart');
    cy.get('[data-dropContainer="main"]').trigger('drop', { force: true });
  });
  it('should be elements bun and ingredient in containers', function () {
    cy.get('[data-bunContainer="1"')
      .children()
      .should(($children) => {
        expect($children).to.have.length(1);
      });
    cy.get('[data-bunContainer="2"')
      .children()
      .should(($children) => {
        expect($children).to.have.length(1);
      });
    cy.get('[data-productContainer="1"]')
      .children()
      .should(($children) => {
        expect($children).to.have.length(1);
      });
  });
});
