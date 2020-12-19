// const listHelper = require('../utils/list_helper')
const supertest = require('supertest');
const mongoose  = require('mongoose')
const listHelper = require('../utils/list_helper')

const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog');
const User = require('../models/user');

let savedUser = null
let token = null

beforeEach(async()=>{
          
    // delete all Blogs 

    await Blog.deleteMany({})
    console.log("cleared")

    // delete all User

    await User.deleteMany({})
    
    const initialUser ={
       name:"dev",
       username:"devd",
       password:"devd"
    }

    // create new User
    savedUser = await api
                      .post('/api/users')
                      .send(initialUser)
                      .expect(200)
                      .expect('Content-Type','application\/json; charset=utf-8')
                       
   

     
    console.log("The saved user is ",savedUser.body)

     for ( const blog of listHelper.initialBlogs){
           const newBlog =  new Blog(blog)
           newBlog.user=savedUser.body.id
           console.log("The new blog to be saved is ",newBlog)
           const commitedBlog =  await newBlog.save()
           console.log("The commited blog is ",commitedBlog)
          }   

   console.log("finished")
   console.log('The new user being logged in is ',initialUser)

   const loggedInUser= await api
    .post('/api/login')
    .send(initialUser)
    .expect(200)

   
    console.log(" ----------------------------------------------------------------The logged in user is ---------------------------------------------------------------- ") 
    console.log(loggedInUser.body)
    console.log(" ----------------------------------------------------------------The logged in user is ---------------------------------------------------------------- ")
    token=loggedInUser.body.token
//      console.log("The token is ",token)
//      console.log("The saved user is ",savedUser)
})

describe("run tests using supertest ",()=>{
    test('the list has 2 entries',async ()=>{
  
      const response= await  
      api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type','application\/json; charset=utf-8')
      
      console.log("The response body is ",response.body)



      expect(response.body).toHaveLength(listHelper.initialBlogs.length)
            
    })

    test( 'verifies that the unique identifier property of the blog posts is named id ',async()=>{
               
         const response =await api.get('/api/blogs')
         const firstBlog = response.body[0]
         console.log("The blogs are ",response.body)
         expect(firstBlog.id).toBeDefined()

    })

    test( 'verify that the total number of blogs is increased by one' , async()=>{
                

         const newBlog ={
         "title" : "New title",
          "likes":5,
          "author": "xxxx",
          "url" : "www.xxx.com",
          "user": savedUser.body.id,
      }
        

      console.log("The new blog being sent is ",newBlog)
      
        await api.post('/api/blogs')
        .set({Authorization:'Bearer '+token})
        .send(newBlog)
        .expect(201)
        .expect('Content-Type','application\/json; charset=utf-8')
  

       const allBlogs = await listHelper.blogsInDb()

       expect(allBlogs).toHaveLength(listHelper.initialBlogs.length+1)
       
       const allTitle = allBlogs.map(blog => blog.title)

       expect(allTitle).toContain("New title")

    })

    test( 'if the likes property is missing from the request, it will default to the value 0' ,async()=>{
          const newBlog ={
             title :"New title",
             author :" New author",
             url :"www.newUrl.com",
             "user": savedUser.body.id,
         }
  
       const savedBlog=  await api
        .post('/api/blogs')
       .set({Authorization:'Bearer '+token})
        .send(newBlog)
        .expect(201)
        .expect('Content-Type','application\/json; charset=utf-8')

        console.log("The saved blog is : ",savedBlog.body)

        expect(savedBlog.body.likes).toBeDefined()

        expect(savedBlog.body.likes).toEqual(0)
    })

    test (' check if title and url are present ',async()=>{

                const newBlog ={
                    author : "new author",
                    user: savedUser.body.id,                
                }
  

          await api
                .post('/api/blogs')
              .set({Authorization:'Bearer '+token})
                .send(newBlog)
                .expect(400)

        const blogs = await listHelper.blogsInDb()

        expect(blogs).toHaveLength(listHelper.initialBlogs.length)

    })


})

describe('deleting operations',()=>{


     test('deleteing a blog reduces the total blogs by 1',async()=>{
                 
      const allBlogs = await api.get('/api/blogs')
      const blogToDelete=allBlogs.body[0]
    
             console.log("The blog to be deleted is ",blogToDelete)
                  await api
                  .delete(`/api/blogs/${blogToDelete.id}`)
                  .set({Authorization:'Bearer '+token})
                  .expect(204)
                  .send({result:"deleted blog"})
        
             const blogs = await listHelper.blogsInDb()

             expect(blogs).toHaveLength(listHelper.initialBlogs.length-1)
                
            
     })
})

    afterAll(() => {
  mongoose.connection.close()

})

describe('updating operation',()=>{

  test('updating a blog changes the likes ',async()=>{
        
      const allBlogs=await api.get('/api/blogs')

      const blogToUpdate=allBlogs.body[0]
      
      console.log("The blog to update is ",blogToUpdate)

      const blog ={
        likes :999,
        title: blogToUpdate.title,
        author:blogToUpdate.author,
        url : blogToUpdate.url,
        id: blogToUpdate.id,
        user:blogToUpdate.user
      }

    const updatedBlog=  await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .set({Authorization:'Bearer '+token})
      .send(blog)
      .expect(200)

       
      console.log("In the testing block ,the updatedBlog is ",updatedBlog.body)
      const changedBlogs = await api.get('/api/blogs')
      const changedBlog=changedBlogs.body[0]

      console.log('The new blog is ',blog)
      console.log('The changed blog is',changedBlog)
      
      expect(updatedBlog.body.likes).toEqual(JSON.parse(JSON.stringify(blog.likes)));
      expect(updatedBlog.body.id).toEqual(JSON.parse(JSON.stringify(blog.id)))

  })
})


