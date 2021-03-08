import React from 'react'
import {Container, Form, Button} from "react-bootstrap";

export const MainPage = () => {
    const getResult = () => {
        // console.log('123')
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
            body: JSON.stringify({ poem: 'React POST Request Example' })
        }
        fetch('http://localhost:9000/poems-info', requestOptions)
            .then(response => response.json())
            .then(response => console.log(response.json()))
    }

    return (
        <Container>
            <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>Твое имя</Form.Label>
                    <Form.Control type="email" placeholder="Мария" />
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Твой стих</Form.Label>
                    <Form.Control as="textarea" rows={4} />
                </Form.Group>
            </Form>
            <Button variant="primary" onClick={getResult}>Проверить стих</Button>
        </Container>
    )
}