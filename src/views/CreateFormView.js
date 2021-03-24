import React from 'react'
import PropTypes from 'prop-types'
import API from '../api'
import { ChevronLeft, Check, Trash, FileText, Star } from 'react-feather'
import { Link } from 'react-router-dom'
import { EditorQuestion } from '../components'

class CreateFormView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isNewForm: false,
            mode: 'questions',
            name: null,
            data: []
        }
    }

    componentDidMount() {
        if (this.props.match.params.formId) {
            API.get('/getFormData?id=' + this.props.match.params.formId)
                .then(json => json.data)
                .then(data => this.setState({name: data.name, data: data.data, isNewForm: false}))
        } else {
            this.setState({isNewForm: true})
        }
    }

    render() {
        return (
            <div className="min-h-screen">
                <div className="max-w-7xl m-auto">
                    <div className="grid grid-cols-3">
                        <Link to="/" className="inline-flex pt-3">
                            <ChevronLeft/>
                            <p className="ml-4 font-bold">Mes formulaires</p>
                        </Link>
                        <div className="text-center">
                            <input className="border font-bold bg-white rounded-md p-3 mr-2 align-bottom flex-auto focus:outline-none" placeholder="Nom du formulaire" defaultValue={this.state.name}/>
                            <button className="border p-3 text-green-500 border-green-500 bg-white rounded-md focus:outline-none"><Check/></button>
                        </div>
                        <div className="text-right">
                            <button className="border p-3 text-red-500 border-red-500 bg-white rounded-md focus:outline-none mr-2"><Trash/></button>
                            <button className="border p-3 text-white bg-green-500 border-green-500 rounded-md font-bold align-bottom focus:outline-none">Répondre</button>
                        </div>
                    </div>
                    <div className="bg-green-50 w-full min-h-full rounded-md mt-5 p-10">
                        <div className="mb-14 inline-flex">
                            <h1 onClick={() => this.setState({mode: 'questions'})} className={'text-xl font-bold cursor-pointer mr-14 ' + (this.state.mode === 'questions' ? 'text-black underline' : 'text-green-500')}>Questions</h1>
                            <h1 onClick={() => this.setState({mode: 'answers'})} className={'text-xl font-bold cursor-pointer ' + (this.state.mode === 'answers' ? 'text-black underline' : 'text-green-500')}>Réponses</h1>
                        </div>
                        <div className="space-y-10 mb-14">
                            { this.state.isNewForm || (this.state.data && !this.state.data.length) ?
                                <div className="text-2xl font-bold text-center text-green-500">
                                    <h1>Ce formulaire est vide</h1>
                                </div> :
                                <div>
                                    {
                                        this.state.data.map((e, i) => <EditorQuestion key={i} data={e}/>)
                                    }
                                </div>
                            }
                        </div>
                        <div>
                            <button className="border p-3 rounded-md font-bold border-green-500 text-green-500 inline-flex focus:outline-none mr-4">
                                <FileText className="mr-2"/> Ajouter une question &quot;Texte&quot;
                            </button>
                            <button className="border p-3 rounded-md font-bold border-green-500 text-green-500 inline-flex focus:outline-none">
                                <Star className="mr-2"/> Ajouter une question &quot;Note&quot;
                            </button>
                        </div>
                        <div className="text-right">
                            <button className="border p-3 text-white bg-green-500 border-green-500 rounded-md font-bold align-bottom focus:outline-none">
                                Sauvegarder
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CreateFormView.propTypes = {
    match: PropTypes.object
}

export default CreateFormView
