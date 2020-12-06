import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

class ProbeNav extends React.Component {
	render () {
		return (
			<Navbar bg="light" expand="lg">
			<Navbar.Brand href="https://github.com/SamYuan1990/Probe">Welcome, here is probe</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
				<Nav.Link href="/">input your parameters and go</Nav.Link>
				<NavDropdown title="or config and run quick demo">
					<NavDropdown.Item href="/quick/config">Probe Config</NavDropdown.Item>
					<NavDropdown.Item href="/quick/BatchTimeout">Probe BatchTimeout</NavDropdown.Item>
					<NavDropdown.Item href="/quick/MaxMessageCount">Probe MaxMessageCount</NavDropdown.Item>
					<NavDropdown.Divider />
				</NavDropdown>
				<NavDropdown title="explore result here" id="basic-nav-dropdown">
					<NavDropdown.Item href="/result/BatchTimeout">Base BatchTimeout</NavDropdown.Item>
					<NavDropdown.Item href="/result/MaxMessageCount">Base MaxMessageCount</NavDropdown.Item>
					<NavDropdown.Item href="/result/AbsoluteMaxBytes">Base AbsoluteMaxBytes</NavDropdown.Item>
					<NavDropdown.Item href="/result/PreferredMaxBytes">Base PreferredMaxBytes</NavDropdown.Item>
					<NavDropdown.Divider />
				</NavDropdown>
				<Nav.Link href="https://github.com/SamYuan1990/Probe/issues">feedback on Github</Nav.Link>
				</Nav>
			</Navbar.Collapse>
			</Navbar>
		)
	}
}

ReactDOM.render(<ProbeNav/>, document.getElementById('Nav'));