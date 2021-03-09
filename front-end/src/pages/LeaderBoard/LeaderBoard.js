import React from "react"
import {NavigationBar} from "../../components/NavigationBar/NavigationBar"
import {Container, Table} from "react-bootstrap"

export class LeaderBoardPage extends React.Component {
    state = {
        users: []
    }

    componentDidMount() {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                amount: 5,
                single: true,
            })
        }
        fetch('http://localhost:9000/leaderboard', requestOptions)
            .then(response => response.json())
            .then(data => this.setState({users: data.leaderboard}))
    }

    render () {
        const rows = this.state.users.map((elem, index) => (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{elem.poem}</td>
                <td>{elem.userscores[0].username}</td>
                <td>{elem.userscores[0].score}</td>
            </tr>
        ))
        return(
            <>
                <NavigationBar activePage="leaderboard" />
                <Container>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Место</th>
                                <th>Стих</th>
                                <th>Имя</th>
                                <th>Оценка</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </Table>
                </Container>
            </>
        )
    }
}