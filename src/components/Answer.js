import React from 'react'
import PropTypes from 'prop-types'
import { FileText, Star } from 'react-feather'
import { NoteQuestion } from '../components'

class Answer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let data = this.props.result.data

        return (
            <div className="space-y-7 pt-10">
                {
                    data.map((e, i) => {
                        if (e.type === 'input') {
                            return (
                                <div key={i} className="">
                                    <div className="bg-yellow-500 inline-flex p-1 pr-2 pl-2 mr-6 text-white rounded-md align-bottom">
                                        {i + 1} - <FileText className="ml-1"/>
                                    </div>
                                    <div className="text-green-500 font-bold inline-flex align-top">
                                        {e.title}
                                    </div>
                                    <div className="text-justify ml-20 mr-20">
                                        {e.value}
                                    </div>
                                </div>
                            )
                        } else if (e.type === 'note') {
                            return (
                                <div key={i} className="">
                                    <div className="bg-red-300 inline-flex p-1 pr-2 pl-2 mr-6 text-white rounded-md align-bottom">
                                        {i + 1} - <Star className="ml-1"/>
                                    </div>
                                    <div className="text-green-500 font-bold inline-flex align-top">
                                        {e.title}
                                    </div>
                                    <div className="ml-20 mr-20">
                                        <NoteQuestion answer value={e.value}/>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </div>
        )
    }
}

Answer.propTypes = {
    result: PropTypes.object.isRequired
}

export default Answer
