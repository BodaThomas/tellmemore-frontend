import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { HomeView } from './views'

class App extends React.Component {
    render() {
        return (
            <Router>
                <Route exact path="/" component={HomeView}/>
                <Route exact path="/form/:id"/>
                <Route exact path="/edit/:id"/>
            </Router>
        )
    }
}

export default App
