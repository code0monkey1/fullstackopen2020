import React from 'react'
import {Link} from 'react-router-dom'
import Header from './Header'

const Nav = () => {
    return (
        <div style={{border:'2px black solid',background:"grey"}}> 
                <Link to='/'>App  |  </Link>
                <Link to='/users'>Users  |  </Link>
                <Link to='/blogs'>Blogs</Link>
                 <Header/>
        </div>
    )
}

export default Nav
