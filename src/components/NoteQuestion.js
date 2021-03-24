import React from 'react'
import PropTypes from 'prop-types'

class NoteQuestion extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        if (this.props.answer) {
            return (
                <div className="">
                    <button disabled className={'border border-black cursor-default rounded-tl-md rounded-bl-md w-14 h-14 ' + (this.props.value === 1 ? 'bg-red-300 text-white font-bold' : null)}>1</button>
                    <button disabled className={'border border-l-0 border-black cursor-default w-14 h-14 ' + (this.props.value === 2 ? 'bg-red-300 text-white font-bold' : null)}>2</button>
                    <button disabled className={'border border-l-0 border-black cursor-default w-14 h-14 ' + (this.props.value === 3 ? 'bg-red-300 text-white font-bold' : null)}>3</button>
                    <button disabled className={'border border-l-0 border-black cursor-default w-14 h-14 ' + (this.props.value === 4 ? 'bg-red-300 text-white font-bold' : null)}>4</button>
                    <button disabled className={'border border-l-0 border-black cursor-default rounded-tr-md rounded-br-md w-14 h-14 ' + (this.props.value === 5 ? 'bg-red-300 text-white font-bold' : null)}>5</button>
                </div>
            )
        }
        return (
            <div className="divide-x rounded-md border">
                <button className={'rounded-tl-md rounded-bl-md w-14 h-14 ' + (this.props.value === 5 ? 'bg-red-300 text-white font-bold' : null)}>1</button>
                <button className="w-14 h-14">2</button>
                <button className="w-14 h-14">3</button>
                <button className="w-14 h-14">4</button>
                <button className="w-14 h-14">5</button>
            </div>
        )
    }
}

NoteQuestion.propTypes = {
    value: PropTypes.number,
    answer: PropTypes.bool
}

export default NoteQuestion
