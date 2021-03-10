import React from 'react'
import {Link} from 'react-router-dom'
import {Container, Row, Col, Button} from 'react-bootstrap'
import {NavigationBar} from '../../components/NavigationBar/NavigationBar'

export class JoinCompetition extends React.Component {
    state = {
        username: null,
    }

    render() {
        return (
            <>
                <NavigationBar activePage="join-competition"/>
                <Container>
                    <Row>
                        <Col align="center">
                            <Link to="/competition">
                                <Button size="lg">Создать комнату</Button>
                            </Link>
                        </Col>
                        <Col align="center">
                            <Link to="/competition">
                                <Button size="lg">Присоединиться</Button>
                            </Link>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}
