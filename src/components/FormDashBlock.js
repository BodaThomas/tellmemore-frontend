/* Form Block présent sur la page d'accueil listant les forms */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class FormDashBlock extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (!this.props.data.name || !this.props.data._id)
            return null
        console.log(this.props.data)
        return (
            <div className="grid grid-rows-3 bg-gray-100 rounded-md h-44 p-4 w-72 gap-2 overflow-hidden">
                <p className="row-span-1 text-xs text-left self-start">FORMULAIRE</p>
                <div className="row-span-3 text-left text-md font-bold self-center overflow-auto">
                    {this.props.data.name}
                </div>
                <div className="row-span-1 self-end text-right mb-1">
                    <Link to={'/edit/' + this.props.data._id} className="font-bold text-green-500 text-xs mr-2">Editer</Link>
                    <Link to={'/form/' + this.props.data._id} className="font-bold text-white bg-green-500 p-2.5 rounded-md text-xs m-2 mr-0">Répondre</Link>
                </div>
            </div>
        )
    }
}

FormDashBlock.propTypes = {
    data: PropTypes.object.isRequired
}

export default FormDashBlock
