import React from 'react'
import {Container} from 'react-bootstrap'
import {NavigationBar} from '../../components/NavigationBar/NavigationBar'

export class Competition extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <>
                <Container>
                    {this.props.location.state.username} hi
                </Container>
            </>
        )
    }
}