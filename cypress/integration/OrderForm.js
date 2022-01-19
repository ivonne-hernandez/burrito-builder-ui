describe("Order form test", () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'http://localhost:3001/api/v1/orders',
      {fixture: 'orders.json'}
    );

    cy.intercept(
      'POST',
      'http://localhost:3001/api/v1/orders',
      {fixture: 'new_order.json'}
    );

    cy.visit('http://localhost:3000');
  })

  it("As a user, when I type in an order name, select 1 ingredient and click on submit, I should see my order appear on the homepage", () => {
    cy.get('div[class="order"]').should('have.length', 3)
    
    cy.get('input').type('Alex')
      .get('button[id="beans"]').click()
      .get('p').should('have.text', "Order: beans")
      .get('button[class="submit-order"]').click()
      .get('div[class="order"]').should('have.length', 4)
      .get('h3').last().should('have.text', "Alex")
      .get('li').last().should('have.text', "beans")
  });

  it("As a user, when I type in an order name, select 3 ingredients and click on submit, I should see my order appear on the homepage with all of the selected ingredients", () => {
    cy.intercept(
      'POST',
      'http://localhost:3001/api/v1/orders',
      {fixture: 'more_ingredients_order.json'}
    );

    cy.get('div[class="order"]').should('have.length', 3)
    
    cy.get('input').type('Jerry')
      .get('button[id="beans"]').click()
      .get('button[id="lettuce"]').click()
      .get('button[id="carnitas"]').click()
      .get('p').should('have.text', "Order: beans, lettuce, carnitas")
      .get('button[class="submit-order"]').click()
      .get('div[class="order"]').should('have.length', 4)
      .get('h3').last().should('have.text', "Jerry")
      .get('div[class="order"]').last()
      .should('have.text', "Jerrybeanslettucecarnitas")
  });

  it("As a user, when I haven't selected any ingredients or typed in a name, and click on the submit order button, I shouldn't see see a new order on the homepage", () => {
    cy.get('div[class="order"]').should('have.length', 3)
    cy.get('button[class="submit-order"]').click()
    cy.get('div[class="order"]').should('have.length', 3)

  });

  it("As a user, when I just type in a name, don't select any ingredients and click on the Submit order button I shouldn't see a new order on the homepage", () => {
    cy.get('div[class="order"]').should('have.length', 3)
      .get('input').type('Alex')
    cy.get('button[class="submit-order"]').click()
    cy.get('div[class="order"]').should('have.length', 3)

  });

  it("As a user, when I just select one ingredient, don't type in a name, and click on the Submit order button I shouldn't see a new order on the homepage", () => {
    cy.get('div[class="order"]').should('have.length', 3)
      .get('button[id="beans"]').click()
    cy.get('button[class="submit-order"]').click()
    cy.get('div[class="order"]').should('have.length', 3)
  });

  it("As a user, when I visit the homepage I should see a header, 12 ingredient buttons, an input for the order name and a submit order button", () => {
    cy.get('h1').should('have.text', 'Burrito Builder')
      .get('button[class="ingredient-button"]').should('have.length', 12)
      .get('input').should('be.visible')
      .get('button[class="submit-order"]').should('be.visible')
  });
});