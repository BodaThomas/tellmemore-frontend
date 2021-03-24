import React from 'react'
import API from '../api'
import { FormDashBlock, NewFormDashBlock } from '../components'

class HomeView extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            formList: []
        }
    }

    componentDidMount() {
        API.get('/getForms')
            .then(json => json.data)
            .then(data => this.setState({formList: data}))
    }

    render() {
        return (
            <div className="App min-h-screen">
                <header className="">
                    <div className="max-w-4xl m-auto">
                        <h1 className="text-left font-bold text-2xl mb-5 title">
                            Mes formulaires
                        </h1>
                        <div className="">
                            <div className="grid grid-cols-3 gap-4">
                                <NewFormDashBlock/>
                                {
                                    this.state.formList !== undefined ?
                                        this.state.formList.map((e, i) => {
                                            console.log(e)
                                            return <FormDashBlock key={i} data={e}/>
                                        }) : null
                                }
                            </div>
                        </div>
                    </div>
                </header>
            </div>
        )
    }
}

export default HomeView
