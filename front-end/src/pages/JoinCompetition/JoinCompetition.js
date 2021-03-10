import React from 'react'
import {Link} from 'react-router-dom'
import {Container, Button, InputGroup, Form} from 'react-bootstrap'
import {NavigationBar} from '../../components/NavigationBar/NavigationBar'
import Popup from 'reactjs-popup';

export class JoinCompetition extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "Игрок",
        };

    }

    handleChange = (event) => {
        let val = event.target.value;
        if (val === "")
            val = "Игрок";
        this.setState({username: val});
    }

    render() {
        return (
            <>
                <NavigationBar activePage="join-competition"/>
                <Container>
                    <Form.Label>Ваше имя</Form.Label>
                    <InputGroup>
                        <Form.Control type="text" required placeholder="Иван" onChange={this.handleChange}/>
                        <InputGroup.Append>
                            <Link to={{pathname: "/competition", state: {username: this.state.username}}}>
                                <Button variant="outline-primary" style={{borderRadius: "10"}}>Создать комнату</Button>
                                <Button variant="outline-primary" style={{borderRadius: "10"}}>Присоединиться</Button>
                            </Link>
<Popup modal nested trigger={<button>Trigger</button>} position="bottom">
    {close => (
      <div>
        Content here
        <a className="close" onClick={close}>
          &times;
        </a>
      </div>
    )}
  </Popup>
                        </InputGroup.Append>
                    </InputGroup>
                </Container>
            </>
        )
    }
}
