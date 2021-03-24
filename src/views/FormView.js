import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { ChevronLeft, ArrowLeft, ArrowRight } from 'react-feather'
import API from '../api'
import { NoteQuestion } from '../components'


class FormView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            step: 0, //SET TO 0
            name: null,
            data: [],
            result: [],
            actualValue: null
        }
    }

    componentDidMount() {
        API.get('/getFormData?id=' + this.props.match.params.formId)
            .then(json => json.data)
            .then(data => this.setState({name: data.name, data: data.data}))
    }

    handleSetActualValue = (value) => {
        this.setState({actualValue: value})
    }

    handleNext = (e, type) => {
        e.preventDefault()
        let step = this.state.step
        let newResult = this.state.result
        let object

        console.log(this.state.data, step)
        if (type === 'text')
            type = 'input'
        if (this.state.actualValue) {
            object = {
                type,
                title: this.state.data[step].value,
                value: this.state.actualValue
            }
            newResult.push(object)
            step++
            console.log(step)
            this.setState({step, actualValue: null, result: newResult}, () => {
                if (step === this.state.data.length) {
                    this.handleSubmit()
                }
            })
        }
    }

    handlePrevious = (e) => {
        e.preventDefault()
        if (this.state.step === 0)
            this.setState({step: null})
        else
            this.setState({step: this.state.step - 1})
    }

    handleSubmit = () => {
        let body = {
            formId: this.props.match.params.formId,
            data: this.state.result
        }

        console.log('submit', body)
        API.post('/addResult', body)
            .then(json => json.data)
            .then(data => console.log(data))
        this.setState({step: 'final'})
    }

    render() {
        let content

        if (this.state.step === null) {
            content = (
                <div className="space-y-4 absolute top-1/2">
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
                        <button onClick={() => this.setState({step: 0})} className="title bg-green-500 text-white font-bold p-2.5 rounded-md text-sm focus-within:outline-none">
                            Commencer
                        </button>
                    </div>
                </div>
            )
        } else if (this.state.step === 'final') {
            content = (
                <div className="space-y-4 absolute top-1/2">
                    <div className="title text-3xl font-bold">
                        Merci d&apos;avoir répondu à ce formulaire
                    </div>
                    <div>
                        <Link to="/" className="title bg-green-500 text-white font-bold p-2.5 rounded-md text-sm focus-within:outline-none">
                            Accéder à mes formulaires
                        </Link>
                    </div>
                </div>
            )
        } else {
            const step = this.state.step
            let input

            if (this.state.data[step] && this.state.data[step].type === 'text')
                input = <textarea onChange={(e) => {this.setState({actualValue: e.target.value})}} className="w-2/3 p-4 text-sm rounded-md" rows={5} placeholder="Répondez ici..."/>
            else if (this.state.data[step] && this.state.data[step].type === 'note')
                input = <NoteQuestion handlerSet={this.handleSetActualValue}/>
            content = (
                <div className="space-y-4 absolute top-1/2 text-center">
                    <div className="text-sm">
                        QUESTION {step + 1}
                    </div>
                    <div className="title text-3xl font-bold">
                        {this.state.data[step] ? this.state.data[step].value : null}
                    </div>
                    <div className="title">
                        {input}
                    </div>
                    <div className="inline-flex bottom-0">
                        <button onClick={this.handlePrevious} className="title inline-flex text-green-500 font-bold p-2.5 rounded-md text-sm focus-within:outline-none">
                            <ArrowLeft className="mr-1"/>
                            Précédent
                        </button>
                        <button onClick={(e) => this.handleNext(e, this.state.data[step] ? this.state.data[step].type : null)} className="title inline-flex bg-green-500 text-white font-bold p-2.5 rounded-md text-sm focus-within:outline-none">
                            Suivant
                            <ArrowRight className="ml-1"/>
                        </button>
                    </div>
                </div>
            )
        }
        return (
            <div className="max-w-7xl m-auto" style={{minHeight: 'calc(100vh - 25vh)'}}>
                <div className="grid grid-cols-3 title">
                    <Link to="/" className="inline-flex pt-3">
                        <ChevronLeft/>
                        <p className="ml-4 font-bold">Mes formulaires</p>
                    </Link>
                </div>
                <div className="bg-green-50 w-full rounded-md mt-5 p-10" style={{minHeight: 'calc(100vh - 25vh)'}}>
                    {content}
                </div>
            </div>
        )
    }
}

FormView.propTypes = {
    match: PropTypes.object
}

export default FormView
