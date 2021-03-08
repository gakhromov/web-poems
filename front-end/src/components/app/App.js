import React from 'react'
import './App.css';
import {NavigationBar} from "../nav/Nav";
import "bootstrap/dist/css/bootstrap.css"
import {MainPage} from "../../pages/Main/MainPage";

const App = () => {
    return (
        <div>
          <NavigationBar />
          <MainPage />
        </div>
    )
}

export default App
