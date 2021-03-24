import React from 'react'
import PropTypes from 'prop-types'
import { FileText, Star, ChevronUp, ChevronDown, Trash } from 'react-feather'


class EditorQuestion extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="w-full">
                {
                    this.props.data.type && this.props.data.type === 'text' ?
                        <div className="bg-yellow-500 inline-flex p-1 pr-2 pl-2 mr-6 text-white rounded-md align-bottom">
                            {this.props.number} - <FileText className="ml-1"/>
                        </div>
                        :
                        <div className="bg-red-300 inline-flex p-1 pr-2 pl-2 mr-6 text-white rounded-md align-bottom">
                            {this.props.number} - <Star className="ml-1"/>
                        </div>
                }
                <input defaultValue={this.props.data.value} className="p-1 mr-2 inline-flex rounded-md align-bottom"/>
                <div className="inline-flex align-bottom space-x-2 text-right">
                    <button className="p-1 bg-white rounded-md align-bottom"><ChevronUp/></button>
                    <button className="p-1 bg-white rounded-md align-bottom"><ChevronDown/></button>
                    <button className="p-1 bg-white text-red-500 rounded-md align-bottom"><Trash/></button>
                </div>
            </div>
        )
    }
}

EditorQuestion.propTypes = {
    number: PropTypes.string,
    data: PropTypes.array.isRequired
}

export default EditorQuestion
