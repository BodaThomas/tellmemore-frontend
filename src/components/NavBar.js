import React from 'react'
import Logo from '../logoTellMeMore.svg'

class NavBar extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="fixed top-0 w-full h-20 border-b bg-white pl-14 pt-5 inline-block">
                <img src={Logo} className="" />
            </div>
        )
    }
}

export default NavBar
