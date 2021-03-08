import React from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.css"
import {MainPage} from "../../pages/Main/MainPage"
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {LeaderBoardPage} from "../../pages/LeaderBoard/LeaderBoard"

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route
                    path="/home"
                    component={MainPage}
                />
                <Route
                    path="/leaderboard"
                    component={LeaderBoardPage}
                />
            </Switch>
        </BrowserRouter>
    )
}

export default App
