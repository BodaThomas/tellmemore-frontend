import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../logoTellMeMore.svg'

class NavBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="fixed top-0 w-full h-20 border-b bg-white pl-14 pt-5 inline-block">
                <Link to="/">
                    <img src={Logo}/>
                </Link>
            </div>
        )
    }
}

export default NavBar
