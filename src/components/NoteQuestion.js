import React from 'react'
import PropTypes from 'prop-types'

class NoteQuestion extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            value: null
        }
    }

    handleSetValue = (e) => {
        e.preventDefault()
        this.setState({value: e.target.value})
        this.props.handlerSet(e.target.value)
    }

    render() {
        if (this.props.answer) {
            return (
                <div className="">
                    <button disabled className={'border border-black cursor-default rounded-tl-md rounded-bl-md w-14 h-14 ' + (this.props.value === 1 || this.props.value === '1' ? 'bg-red-300 text-white font-bold' : null)}>1</button>
                    <button disabled className={'border border-l-0 border-black cursor-default w-14 h-14 ' + (this.props.value === 2 || this.props.value === '2' ? 'bg-red-300 text-white font-bold' : null)}>2</button>
                    <button disabled className={'border border-l-0 border-black cursor-default w-14 h-14 ' + (this.props.value === 3 || this.props.value === '3' ? 'bg-red-300 text-white font-bold' : null)}>3</button>
                    <button disabled className={'border border-l-0 border-black cursor-default w-14 h-14 ' + (this.props.value === 4 || this.props.value === '4' ? 'bg-red-300 text-white font-bold' : null)}>4</button>
                    <button disabled className={'border border-l-0 border-black cursor-default rounded-tr-md rounded-br-md w-14 h-14 ' + (this.props.value === 5 || this.props.value === '5' ? 'bg-red-300 text-white font-bold' : null)}>5</button>
                </div>
            )
        }
        return (
            <div className="">
                <button value={1} onClick={this.handleSetValue} className={'border border-black rounded-tl-md rounded-bl-md w-14 h-14 ' + (this.state.value === '1' ? 'bg-red-300 text-white font-bold' : null)}>1</button>
                <button value={2} onClick={this.handleSetValue} className={'border border-l-0 border-black w-14 h-14 ' + (this.state.value === '2' ? 'bg-red-300 text-white font-bold' : null)}>2</button>
                <button value={3} onClick={this.handleSetValue} className={'border border-l-0 border-black w-14 h-14 ' + (this.state.value === '3' ? 'bg-red-300 text-white font-bold' : null)}>3</button>
                <button value={4} onClick={this.handleSetValue} className={'border border-l-0 border-black w-14 h-14 ' + (this.state.value === '4' ? 'bg-red-300 text-white font-bold' : null)}>4</button>
                <button value={5} onClick={this.handleSetValue} className={'border border-l-0 border-black rounded-tr-md rounded-br-md w-14 h-14 ' + (this.state.value === '5' ? 'bg-red-300 text-white font-bold' : null)}>5</button>
            </div>
        )
    }
}

NoteQuestion.propTypes = {
    value: PropTypes.number || PropTypes.string,
    answer: PropTypes.bool,
    handlerSet: PropTypes.func
}

export default NoteQuestion
