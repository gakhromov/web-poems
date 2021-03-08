import React from 'react'
import './App.css'
import "bootstrap/dist/css/bootstrap.css"
import {SingleUserModePage} from "../../pages/Main/SingleUserModePage"
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
            </Switch>
        </BrowserRouter>
    )
}

export default App
