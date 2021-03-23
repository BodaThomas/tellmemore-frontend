import React from 'react'
import { Link } from 'react-router-dom'
import { Plus } from 'react-feather'

class NewFormDashBlock extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Link to="/createForm" className="flex bg-gradient-to-r from-green-200 bg-green-400 text-white font-bold rounded-md h-44 p-4 w-72">
                <div className="m-auto">
                    <Plus className="m-auto"/>
                    <p>
                        Nouveau formulaire
                    </p>
                </div>
            </Link>
        )
    }
}

export default NewFormDashBlock
