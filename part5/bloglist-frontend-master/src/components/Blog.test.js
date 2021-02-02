
import React from 'react'

import '@testing-library/jest-dom/extend-expect'
import{ render,fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Blog from '../components/Blog'


describe('Blog ',() => {

  let component
  let increaseLikes
  beforeEach(() => {

    increaseLikes = jest.fn()

    const blog={ title:'my title',author:'my author',likes:10,description:'my description',url:'http://www.myUrl.com' }
    component = render(<Blog blog={blog}  increaseLikes={increaseLikes}/>)

  })


  test('should display title and author block and not display description ,likes url ', () => {

    const doesNotDisplay = component.container.querySelector('.doesNotDisplay')
    const doesDisplay = component.container.querySelector('.doesDisplay')

    //https://github.com/testing-library/jest-dom#tobevisible

    expect(doesNotDisplay).not.toBeVisible()
    expect(doesDisplay).toBeVisible()
  })


  test('url and number of likes are shown when the button controlling the shown details has been clicked.',() => {

    const showButton = component.getByText('show')

    fireEvent.click(showButton)

    const doesNotDisplay = component.container.querySelector('.doesNotDisplay')

    expect(doesNotDisplay).toBeVisible()
  })

  test(' if the like button is clicked twice, the event handler the component received as props is called twice.',() => {

    const increaseLikesButton = component.getByText('Increase Likes')

    fireEvent.click(increaseLikesButton)
    fireEvent.click(increaseLikesButton)

    expect(increaseLikes.mock.calls).toHaveLength(2)

  })


})