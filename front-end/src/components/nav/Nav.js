import React from 'react'
import { Navbar, Form, FormControl, Button, Nav } from 'react-bootstrap'

export const NavigationBar = () => {
    return (
        <Navbar bg="light" variant="light">
            {/*<Navbar.Brand href="#home">*/}
            {/*    LOGO*/}
            {/*</Navbar.Brand>*/}
            <Nav className="mr-auto">
                <Nav.Link href="#home" className="active" >Оцени свой стих</Nav.Link>
                <Nav.Link href="#features">Соревнование</Nav.Link>
                <Nav.Link href="#pricing">Лидер боард</Nav.Link>
            </Nav>
        </Navbar>
    )
}