import React from 'react'

import '@testing-library/jest-dom/extend-expect'
import{ render,fireEvent } from '@testing-library/react'
import BlogForm from '../components/BlogForm'


describe('BlogForm',() => {

  let component
  let addNewBlog

  beforeEach(() => {

    addNewBlog =jest.fn()
    component =  render(<BlogForm addNewBlog={addNewBlog} />)

  })

  test('calls the event handler it received as props with the right details when a new blog is created.',() => {

    const author = component.container.querySelector('#author')
    fireEvent.change(author,{ target:{ value:'berman' } })

    const form = component.container.querySelector('form')

    fireEvent.submit(form)

    // this ensures that addNewNote is called only once
    expect(addNewBlog.mock.calls).toHaveLength(1)
    //the first argument of the first call to have body
    //have content value to be  ' This will be input '

    // console.log(addNewBlog.mock.calls) // shows the event call array

    expect(addNewBlog.mock.calls[0][0].author).toBe('berman')


  })

})