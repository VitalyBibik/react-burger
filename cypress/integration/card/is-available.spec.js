describe('service is available', function () {
  it('should be available on localhost:3000', function () {
    cy.visit('http://localhost:3000');
  });
  it('Drag', function () {
    cy.get('[data-item="60cb6564fce49c00269d4018"]').trigger('dragstart');
    cy.get('[data-dropContainer="main"]').trigger('drop', { force: true });
    cy.get('[data-item="60cb6564fce49c00269d401e"]').trigger('dragstart');
    cy.get('[data-dropContainer="main"]').trigger('drop', { force: true });
  });
  // it('should dragndrop', () => {
  //         cy.visit('http://localhost:3000')
  //         cy.get('[data-item="60cb6564fce49c00269d4018"]').drag('[data-dropContainer="main"]')
  // })
});
