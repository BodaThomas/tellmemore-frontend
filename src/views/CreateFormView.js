import React from 'react'
import PropTypes from 'prop-types'
import API from '../api'
import { ChevronLeft, Check, Trash, FileText, Star } from 'react-feather'
import { Link } from 'react-router-dom'
import { EditorQuestion, Answer } from '../components'

class CreateFormView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isNewForm: false,
            mode: 'questions',
            name: null,
            data: [],
            results: [],
            needSave: false
        }
    }

    componentDidMount() {
        if (this.props.match.params.formId) {
            API.get('/getFormData?id=' + this.props.match.params.formId)
                .then(json => json.data)
                .then(data => this.setState({name: data.name, data: data.data, isNewForm: false}))
            API.get('/getResults?formId=' + this.props.match.params.formId)
                .then(json => json.data)
                .then(data => this.setState({results: data}))
        } else {
            this.setState({isNewForm: true})
        }
    }

    handleAddTextQuestion = () => {
        let data = this.state.data

        data.push({ type: 'text', value: null })
        this.setState({data: data, needSave: true})
    }

    handleAddNoteQuestion = () => {
        let data = this.state.data

        data.push({ type: 'note', value: null })
        this.setState({data: data, needSave: true})
    }

    handleSaveTitle = (e) => {
        e.preventDefault()
        if (e.target[0].value)
            this.setState({name: e.target[0].value, needSave: true})
    }

    handleSaveQuestion = (questionData, i) => {
        let data = this.state.data

        data[i - 1] = questionData
        this.setState({data: data, needSave: true})
    }

    handleDeleteQuestion = (i) => {
        let data = this.state.data

        data.splice(i - 1, 1)
        this.setState({data: data, needSave: true})
    }

    handleSave = () => {
        if (this.state.isNewForm) {
            if (this.state.name)
                API.post('/createForm', {name: this.state.name, data: this.state.data})
                    .then(json => json.data)
                    .then(data => {
                        console.log(data)
                        this.setState({needSave: false})
                    })
            else
                alert('Vous devez ajouter un nom à ce formulaire et le valider, avant de sauvegarder.')
        } else {
            API.post('/updateForm', {id: this.props.match.params.formId, name: this.state.name, data: this.state.data})
                .then(json => json.data)
                .then(data => {
                    console.log(data)
                    this.setState({needSave: false})
                })
        }
    }

    handleDeleteForm = () => {
        API.delete('/deleteForm?id=' + this.props.match.params.formId)
            .then(json => {
                console.log(json.data)
                window.location.href = '/'
            })
    }

    handleGoToForm = () => {
        if (!this.state.isNewForm) {
            window.location.href = '/form/' + this.props.match.params.formId
        } else {
            alert('Vous ne pouvez pas accèder à ce formulaire, car celui-ci n\'a pas encore été créé.')
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
                        <form className="text-center" onSubmit={this.handleSaveTitle}>
                            <input className="border font-bold bg-white rounded-md p-3 mr-2 align-bottom flex-auto focus:outline-none" placeholder="Nom du formulaire" defaultValue={this.state.name}/>
                            <button type="submit" className="border p-3 text-green-500 border-green-500 bg-white rounded-md focus:outline-none"><Check/></button>
                        </form>
                        <div className="text-right">
                            <button onClick={this.handleDeleteForm} className="border p-3 text-red-500 border-red-500 bg-white rounded-md focus:outline-none mr-2"><Trash/></button>
                            <button onClick={this.handleGoToForm} className="border p-3 text-white bg-green-500 border-green-500 rounded-md font-bold align-bottom focus:outline-none">Répondre</button>
                        </div>
                    </div>
                    <div className="bg-green-50 w-full min-h-full rounded-md mt-5 p-10">
                        <div className="inline-flex">
                            <h1 onClick={() => this.setState({mode: 'questions'})} className={'text-xl font-bold cursor-pointer mr-14 ' + (this.state.mode === 'questions' ? 'text-black underline' : 'text-green-500')}>Questions</h1>
                            <h1 onClick={() => this.setState({mode: 'results'})} className={'text-xl font-bold cursor-pointer ' + (this.state.mode === 'results' ? 'text-black underline' : 'text-green-500')}>Réponses</h1>
                        </div>
                        {
                            this.state.mode === 'questions' ?
                                <div className="pt-10">
                                    <div className="space-y-10 mb-14">
                                        { this.state.isNewForm || (this.state.data && !this.state.data.length) ?
                                            <div className="text-2xl font-bold text-center text-green-500">
                                                <h1>Ce formulaire est vide</h1>
                                            </div> :
                                            <div className="space-y-10">
                                                {
                                                    this.state.data.map((e, i) => <EditorQuestion key={i} data={e} number={i + 1} handler={this.handleSaveQuestion} handleDelete={this.handleDeleteQuestion}/>)
                                                }
                                            </div>
                                        }
                                    </div>
                                    <div>
                                        <button onClick={this.handleAddTextQuestion} className="border p-3 rounded-md font-bold border-green-500 text-green-500 inline-flex focus:outline-none mr-4">
                                            <FileText className="mr-2"/> Ajouter une question &quot;Texte&quot;
                                        </button>
                                        <button onClick={this.handleAddNoteQuestion} className="border p-3 rounded-md font-bold border-green-500 text-green-500 inline-flex focus:outline-none">
                                            <Star className="mr-2"/> Ajouter une question &quot;Note&quot;
                                        </button>
                                    </div>
                                    <div className="text-right">
                                        {
                                            this.state.needSave ?
                                                <div className="inline-flex mr-4 text-red-500">
                                                    Certaines modifications n&apos;ont pas été sauvegardées
                                                </div> :
                                                null
                                        }
                                        <button onClick={this.handleSave} className="border p-3 text-white bg-green-500 border-green-500 rounded-md font-bold align-bottom focus:outline-none">
                                            Sauvegarder
                                        </button>
                                    </div>
                                </div> :
                                <div>
                                    <div className="space-y-10 mb-14">
                                        { this.state.isNewForm || (this.state.results && !this.state.results.length) ?
                                            <div className="text-2xl font-bold text-center text-green-500">
                                                <h1>Ce formulaire n&apos;a aucune réponses</h1>
                                            </div> :
                                            <div className="divide-y space-y-10 divide-green-500">
                                                {
                                                    this.state.results.map((e, i) => <Answer key={i} result={e}/>)
                                                }
                                            </div>
                                        }
                                    </div>
                                </div>
                        }
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
