import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { HomeView, CreateFormView, FormView } from './views'
import { NavBar } from './components'

class App extends React.Component {
    render() {
        return (
            <Router>
                <NavBar/>
                <div className="pt-32">
                    <Switch>
                        <Route exact path="/" component={HomeView}/>
                        <Route exact path="/createForm" component={CreateFormView}/>
                        <Route exact path="/form/:formId" component={FormView}/>
                        <Route exact path="/edit/:formId" component={CreateFormView}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App
