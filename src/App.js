import React from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { HomeView, CreateFormView } from './views'
import { NavBar } from './components'

class App extends React.Component {
    render() {
        return (
            <Router className="">
                <NavBar/>
                <div className="pt-32">
                    <Switch>
                        <Route exact path="/" component={HomeView}/>
                        <Route exact path="/createForm" component={CreateFormView}/>
                        <Route exact path="/form/:id"/>
                        <Route exact path="/edit/:id"/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default App
