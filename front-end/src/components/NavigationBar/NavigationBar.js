import React from 'react'
import { Navbar, Nav } from 'react-bootstrap'

export const NavigationBar = (props) => {
    console.log(props)
    return (
        <Navbar bg="light" variant="light" >
            <Navbar.Brand href="/">
                <img src="/logo.png" alt="" height="50"/>
            </Navbar.Brand>

            <Nav className="mr-auto" defaultActiveKey={props.activePage}>
                <Nav.Link href="single-user-mode">Оцени себя</Nav.Link>
                <Nav.Link href="competition">Соревнование</Nav.Link>
                <Nav.Link href="leaderboard">Лидер боард</Nav.Link>
            </Nav>
        </Navbar>
    )
}
