import React from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.css"
import {JoinCompetition} from "../../pages/JoinCompetition/JoinCompetition"
import {Competition} from "../../pages/Competition/Competition"
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {LeaderBoardPage} from "../../pages/LeaderBoard/LeaderBoard"
import {SingleUserModePage} from "../../pages/SingleUserMode/SingleUserModePage";
import {MainPage} from "../../pages/Main/Main"

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
                <Route
                    path="/"
                    component={MainPage}
                />
            </Switch>
        </BrowserRouter>
    )
}

export default App
