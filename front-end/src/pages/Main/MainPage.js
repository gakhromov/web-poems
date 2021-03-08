import React from 'react'
import {Container, Form, Button} from "react-bootstrap";

const Results = () => (
    <div>
        Some Results
    </div>
)

export class MainPage extends React.Component {
    state = {
        showResults: false
    }

    updateResultField = (data) => {
        this.setState({ showResults: true })
        console.log("data: ", data, "showResults: ", this.showResults)
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
        const res = (this.showResults) ? <Results /> : null
        console.log(this.state, res)

        return (
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
                { res }
            </Container>
        )
    }
}
