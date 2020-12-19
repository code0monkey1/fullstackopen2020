let _ = require('lodash')
const Blog = require('../models/blog')


const initialBlogs =[
    {
    title: "Me and Myself",
    author: "Jim Carry ",
    url: "www.meandbyself.com",
    likes: 51

  }
  , {
    title: "You and Yourself",
    author: "Ecart Tole ",
    url: "www.selfabsorbed.com",
    likes: 1

  }
]

const dummy = (blogs) => {
  // ...
   return blogs.length
}

const blogsInDb = async()=>{
       
    const blogs =  await Blog.find({})

    return blogs

}
const totalLikes=(blogs) =>{
      const totalLikes = blogs.reduce( (result , blog )=> result+blog.likes,0)
      return totalLikes
}

const favoriteBlog=(blogs)=>{
     
    const maxLikes= Math.max(...blogs.map(blog => blog.likes) )
     console.log("blog getting most likes is ",maxLikes);

    const mostLikedBlog= blogs.find(blog => blog.likes===maxLikes)
      console.log("The favorite blog is ",mostLikedBlog)
    return mostLikedBlog

}

const mostBlogsByAuthor=(blogs) =>{
     

       const value=  _(blogs)
                     .groupBy('author')
                     .value()
              
              var arr = [];         
                Object.keys(value).forEach((key) => {
                    arr.push({author:key,blogs: value[key].length});
                });
                
              const maxValue = _.maxBy(arr ,arr=> arr.blogs )

              return maxValue
}

const mostLikesOnAuthorsBlog=(blogs) =>{

              const value=  _(blogs)
                     .groupBy('author')
                     .value()

               var arr = [];         
               Object.keys(value).forEach((key) =>  arr.push({author:key,likes:value[key].reduce((sum,obj)=> sum+obj.likes ,0)}) );

               const maxLikes = _.maxBy(arr ,arr=> arr.likes )
               
               return maxLikes
          
}


module.exports = {
  initialBlogs,
  blogsInDb,
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogsByAuthor,
  mostLikesOnAuthorsBlog
}
