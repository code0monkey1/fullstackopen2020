

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    // create here a user to backend
    const user ={ 'name':'donn','username':'donn','password':'donn' }

    cy.request('POST', 'http://localhost:3001/api/users',user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    // ...
    cy.contains('Login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      // ...
      // get the input with username and type the username
      cy.get('#username').type('donn')
      // get the input with password and type the password
      cy.get('#password').type('donn')

      // get the Login button and click
      cy.contains('Login').click()

      cy.contains('Logout User : donn')

    })

    it('fails with wrong credentials', function() {
      // ...
      // targeting the user and password inputs and entering wrong credentials
      // get the input with username and type the username
      cy.get('#username').type('vonn')
      // get the input with password and type the password
      cy.get('#password').type('vonn')

      // get the Login button and click
      cy.contains('Login').click()
      // if user is not found , 'User not found ' is displayed with red color message
      cy.contains('User not found').should('have.css', 'color', 'rgb(255, 0, 0)')

    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      // log in user here
      const user ={ 'username':'donn','password':'donn' }

      cy.request('POST', 'http://localhost:3001/api/login', user).then(response => {
        //before visiting the page , you gotta set up the user in the localStorage memory
        localStorage.setItem('user', JSON.stringify(response.body))

        cy.visit('http://localhost:3000')

      })

    })

    describe('when a new blog is created',function() {


      beforeEach(function() {
        cy.contains('new blog').click()
        //enter the blog contents
        cy.get('#description').type('my description')
        cy.get('#title').type('my title')
        cy.get('#author').type('my author')
        // submit the blog
        cy.contains('Submit').click()

      })


      it('A blog displays correctly', function() {

        // check if the notification is right
        cy.contains('New blog with title my title has been added')

        // check if the app displays the title and author

        cy.contains('my title')
        cy.contains('my author')

      })

      it(' user can like a blog.',function(){

        cy.contains('show').click()

        cy.get('#like').contains(0)
        cy.contains('Increase Likes').click()
        cy.get('#like').contains(1)

      })

      it('A valid user can delete the blog',function(){
        cy.contains('my title')
        cy.contains('my author')

        cy.contains('show').click()
        cy.contains('remove').click()

        cy.contains('blog deleted')

        // should not exist checks that the text does display on the page
        cy.contains('my title').should('not.exist')
        cy.contains('my author').should('not.exist')

      })

      it('Invalid user cant delete the blog',function(){

        // create here a user to backend
        const user ={ 'name':'pawn','username':'pawn','password':'pawn' }

        cy.request('POST', 'http://localhost:3001/api/users',user)
        cy.visit('http://localhost:3000')

        // log in user here

        cy.request('POST', 'http://localhost:3001/api/login', user).then(response => {
        //before visiting the page , you gotta set up the user in the localStorage memory
          localStorage.setItem('user', JSON.stringify(response.body))

          cy.visit('http://localhost:3000')

        })

        cy.contains('show').click()
        cy.contains('remove').click()

        cy.contains('can\'t delete , blog was created by different user ')
        cy.contains('my title')
        cy.contains('my author')

      })

      it.only('blogs are ordered according to likes with the blog with the most likes being first.',function(){
        cy.contains('new blog').click()
        // //enter the blog contents
        cy.get('#description').type('bigger description')
        cy.get('#title').type('bigger title')
        cy.get('#author').type('bigger author')
        cy.get('#likes').type(5)
        // submit the blog
        cy.contains('Submit').click()
        // make both blogs visible
        cy.contains('show').click()
        cy.contains('show').click()
        // go to the bigger blog and increase like

        cy.get('span')
          .then( res => res.map((i,e) => e))
          .then( res => res.map((i,e) => Number(e.innerHTML)))
          .then(res => {
            cy.expect([res[0],res[1]]).to.deep.eq( [5,0])
          }  )
      })

    })

  })
})