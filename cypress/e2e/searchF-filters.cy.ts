describe('Search Bar', () => {


  const searchButton = `[aria-label="search-button"]`
  const searchBar = `[aria-label="search-bar"]`
  const subredditOptions = 'r/'
  const userOption = 'u/'
  const defaultOption = 'p/'


  beforeEach(() => {
    cy.visit('http://localhost:3000/') // Visit the home page before each test
    cy.get(searchBar).clear()
    setTimeout(() => {}, 3000)
  })
  Cypress.on('uncaught:exception', err => {
    // we check if the error is
    if (err.message.includes('Minified React error #418;') || err.message.includes('Minified React error #423;')) {
      return false;
    }
  });


  it('should use default endpoint', () => {
    const query = 'cats'
    cy.intercept('https://www.reddit.com/search.json?q='+ query).as('defaultQuery')
    
    cy.get(searchBar).type(query) // Type "cats" into the search bar
    cy.get(searchButton).click() // Click the "Go!" button
    cy.url().should('include', '/search/p/' + query) // Ensure that we've been redirected to the correct page
   // cy.get('div').should('have.class', 'Card') // Ensure that there are some cards on the page
  })

  it('should use users endpoint', () => {
    const query = 'leprekus'
    cy.intercept('https://www.reddit.com/user/' + query + '/.json').as('userQuery')

    
    cy.get(searchBar).type(query) // Type "johndoe" into the search bar
    cy.get('select').select(userOption) // Select "User" from the dropdown
    cy.get(searchButton).click() // Click the "Go!" button
    cy.url().should('include', '/search/u/' + query) // Ensure that we've been redirected to the correct page
    //cy.get('div').should('have.class', 'Card') // Ensure that there are some cards on the page
  })

  it('should use subreddits endpoint', () => {
    const query = 'Nuclear Revenge'
    cy.intercept('https://www.reddit.com/subreddits/search.json?q=' + query).as('subredditQuery')

    cy.get(searchBar).type(query) // Type "react" into the search bar
    cy.get('select').select(subredditOptions) // Select "Post" from the dropdown
    cy.get(searchButton).click() // Click the "Go!" button
    cy.url().should('include', '/search/r/' + query) // Ensure that we've been redirected to the correct page
    //cy.get('div').should('have.class', 'Card') // Ensure that there are some cards on the page
  })

  it('should not allow search with empty input', () => {
    cy.get(searchBar).clear() // Clear the search bar
    cy.get(searchButton).should('be.disabled') // Select "Subreddit" from the dropdown
    //cy.contains('Go!').should('be.disabled') // Ensure that the "Go!" button is disabled
  })

  it('should toggle filters visibility', () => {
    const filterButton = '[aria-label="filter"]'
    //ensures starting state is hidden
    cy.get('select').should('have.class', 'invisible')
    cy.get(filterButton).click() 

    //toggles
    cy.get('select').should('have.class', 'visible')

    //ensures ending state is invisible
    cy.get(filterButton).click() 
    cy.get('select').should('have.class', 'hidden')
  })
})
