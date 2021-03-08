import React from 'react'
import { Navbar, Form, FormControl, Button, Nav } from 'react-bootstrap'

export const NavigationBar = () => {
    return (
        <Navbar bg="light" variant="light">
            {/*<Navbar.Brand href="home">*/}
            {/*    <img*/}
            {/*        src="logo.png"*/}
            {/*        // width="30"*/}
            {/*        height="30"*/}
            {/*        className="d-inline-block align-top"*/}
            {/*        // alt="React Bootstrap logo"*/}
            {/*    />*/}
            {/*</Navbar.Brand>*/}
            <img src="/logo.png" alt="" height="70"/>
            <Nav className="mr-auto">
                <Nav.Link href="home">Оцени себя</Nav.Link>
                <Nav.Link href="competition">Соревнование</Nav.Link>
                <Nav.Link href="leaderboard">Лидер боард</Nav.Link>
            </Nav>
        </Navbar>
    )
}