import React from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.css"
import {SingleUserModePage} from "../../pages/Main/SingleUserModePage"
import {JoinCompetition} from "../../pages/JoinCompetition/JoinCompetition"
import {Competition} from "../../pages/Competition/Competition"
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {LeaderBoardPage} from "../../pages/LeaderBoard/LeaderBoard"

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route
                    path="/single-user-mode"
                    component={SingleUserModePage}
                />
                <Route
                    path="/leaderboard"
                    component={LeaderBoardPage}
                />
                <Route
                    path="/join-competition"
                    component={JoinCompetition}
                />
                <Route
                    path="/competition"
                    component={Competition}
                />
            </Switch>
        </BrowserRouter>
    )
}

export default App
