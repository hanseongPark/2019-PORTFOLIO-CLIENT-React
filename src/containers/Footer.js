import React from 'react';
import {Container, Col, Row} from 'reactstrap'
import call from '../img/call.png'
import mail from '../img/mail.png'
import git from '../img/git.png'


export default function Footer() {
    return(
		<Container className="footer text-center">
			<Row>
                <Col md={4} xs={12}>
                    <a className="nav-link text-muted" href="https://github.com/hanseongPark" target="_blank"><p><img className="img-circle-footer" src={git} alt="Generic placeholder image" width="30" height="30"/>Github</p></a>
                </Col>
                <Col md={4} xs={12}>
                    <p className="nav-link text-muted"><img className="img-circle-footer" src={mail} alt="Generic placeholder image" width="30" height="30"/>hsung901231@google.com</p>
                </Col>
                <Col md={4} xs={12}>
                    <p className="nav-link text-muted"><img className="img-circle-footer" src={call} alt="Generic placeholder image" width="30" height="30"/>xxx-xxxx-xxxx</p>
                </Col>
                </Row>
		</Container>
    )

}