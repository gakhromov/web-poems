import React from 'react'
import {Link} from 'react-router-dom'
import {Container, Button, Modal, Form, Row, Col} from 'react-bootstrap'
import {NavigationBar} from '../../components/NavigationBar/NavigationBar'
import {Competition} from '../../pages/Competition/Competition'
import Popup from 'reactjs-popup';

export class JoinCompetition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "Игрок",
            sessionId: 1,
            showCompetition: false,
        };

    }

    handleUsernameChange = (event) => {
        let val = event.target.value;
        if (val === "")
            val = "Игрок";
        this.setState({username: val});
    }

    handleSessionIdChange = (event) => {
        let val = event.target.value;
        if (val === "")
            alert("Неверный номер сессии!");
        this.setState({sessionId: val});
    }

    createRoom = (event) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: this.state.username,
            })
        };
        fetch('http://localhost:9000/game/new', requestOptions)
        .then(async response => {
            const data = await response.json();

            if (!response.ok) {
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            } else {
                this.setState({sessionId: data.session_id, showCompetition: true});
            }
        })
        .catch(error => {
            this.setState({ errorMessage: error.toString() })
            console.error('There was an error!', error)
        });
    }

    render() {
        if (!this.state.showCompetition)
            return (
            <>
                <NavigationBar activePage="join-competition"/>
                <Container>
                    <Row>
                        <Col>
                            <Popup modal nested trigger={
                                <Button variant="outline-primary" size="lg">Создать комнату</Button>
                            } position="bottom">
                                {close => (
                                    <Modal.Dialog>
                                    <Modal.Header closeButton onClick={close}>
                                        <Modal.Title>Создание комнаты</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body>
                                        <Form.Label>Введите Ваше имя</Form.Label>
                                        <Form.Control placeholder="Иван" onChange={this.handleUsernameChange}/>
                                    </Modal.Body>

                                    <Modal.Footer>
                                        <Link to={{pathname: "/competition", state: this.state}}>
                                            <Button onClick={this.createRoom} variant="primary">Создать</Button>
                                        </Link>
                                    </Modal.Footer>
                                    </Modal.Dialog>
                                )}
                            </Popup>
                        </Col>
                        <Col>
                            <Popup modal nested trigger={
                                <Button variant="outline-primary" size="lg">Присоединиться к комнате</Button>
                            } position="bottom">
                                {close => (
                                    <Modal.Dialog>
                                    <Modal.Header closeButton onClick={close}>
                                        <Modal.Title>Присоединиться к комнате</Modal.Title>
                                    </Modal.Header>

                                    <Modal.Body>
                                        <Form.Label>Введите Ваше имя</Form.Label>
                                        <Form.Control placeholder="Иван" name="username" onChange={this.handleUsernameChange}/>
                                        <Form.Label>Введите номер сессии</Form.Label>
                                        <Form.Control placeholder="1" name="sessionId" onChange={this.handleSessionIdChange}/>
                                    </Modal.Body>

                                    <Modal.Footer>
                                        <Button variant="primary">Присоединиться</Button>
                                    </Modal.Footer>
                                    </Modal.Dialog>
                                )}
                            </Popup>
                        </Col>
                    </Row>
                </Container>
            </>
        )
        return (
            <>
                <NavigationBar activePage="join-competition"/>
                <Container>
                    <Competition 
                        username={this.state.username}
                        sessionId={this.sessionId}/>
                </Container>
            </>
        )
    }
}
