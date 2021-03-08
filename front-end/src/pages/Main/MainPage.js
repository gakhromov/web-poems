import React from 'react'
import {Container, Form, Button, Alert} from "react-bootstrap";
import {NavigationBar} from "../../components/nav/Nav";

export class MainPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showResults: false,
            grade: null,
        }
    }

    updateResultField = (data) => {
        this.setState({ showResults: !this.state.showResults, grade: data.grades.poem })
    }

    getResult = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                poem: this.poem.value,
                username: this.firstName.value,
            })
        }
        fetch('http://localhost:9000/poem-info', requestOptions)
            .then(async response => {
                // console.log('click!')
                const data = await response.json();

                if (!response.ok) {
                    const error = (data && data.message) || response.status;
                    return Promise.reject(error);
                } else {
                    this.updateResultField(data)
                }
            })
            .catch(error => {
                this.setState({ errorMessage: error.toString() });
                console.error('There was an error!', error);
            });
    }

    render() {
        const gradeOfPoemShow = (
            <Alert variant="success">
                Ваша оценка: {this.state.grade}
            </Alert>
        )

        return (
            <>
                <NavigationBar/>
                <Container>
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>Твое имя</Form.Label>
                            <Form.Control type="text" placeholder="Мария" ref={(ref) => {this.firstName = ref}} />
                        </Form.Group>

                        <Form.Group controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Твой стих</Form.Label>
                            <Form.Control as="textarea" rows={4} ref={(ref) => {this.poem = ref}} />
                        </Form.Group>
                    </Form>
                    <Button variant="primary" onClick={this.getResult}>Проверить стих</Button>
                    { (this.state.showResults) ? gradeOfPoemShow : null }
                </Container>
            </>
        )
    }
}
