import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'react-feather'
import API from '../api'


class FormView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            step: null,
            name: null,
            data: []
        }
    }

    componentDidMount() {
        API.get('/getFormData?id=' + this.props.match.params.formId)
            .then(json => json.data)
            .then(data => this.setState({name: data.name, data: data.data}))
    }

    render() {
        console.log(this.state.data)
        return (
            <div className="max-w-7xl m-auto" style={{minHeight: 'calc(100vh - 25vh)'}}>
                <div className="grid grid-cols-3 title">
                    <Link to="/" className="inline-flex pt-3">
                        <ChevronLeft/>
                        <p className="ml-4 font-bold">Mes formulaires</p>
                    </Link>
                </div>
                <div className="bg-green-50 w-full rounded-md mt-5 p-10" style={{minHeight: 'calc(100vh - 25vh)'}}>
                    <div className="m-auto space-y-4 absolute top-1/2">
                        <div className="text-sm">
                            SONDAGE
                        </div>
                        <div className="title text-3xl font-bold">
                            {this.state.name}
                        </div>
                        <div className="title font-bold text-lg">
                            {this.state.data.length} questions
                        </div>
                        <div>
                            <button className="title bg-green-500 text-white font-bold p-2.5 rounded-md text-sm focus-within:outline-none">
                            Commencer
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

FormView.propTypes = {
    match: PropTypes.object
}

export default FormView
