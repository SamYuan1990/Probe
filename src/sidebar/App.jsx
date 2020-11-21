import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

class ProbeNav extends React.Component {
	render () {
		return (
			<Navbar bg="light" expand="lg">
			<Navbar.Brand>Welcome, here is probe</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
				<Nav.Link href="/">input your parameters and go</Nav.Link>
				<NavDropdown title="result" id="basic-nav-dropdown">
					<NavDropdown.Item href="/result/BatchTimeout">BaseBatchTimeout</NavDropdown.Item>
					<NavDropdown.Item href="/result/MaxMessageCount">BaseMaxMessageCount</NavDropdown.Item>
					<NavDropdown.Item href="/result/AbsoluteMaxBytes">BaseAbsoluteMaxBytes</NavDropdown.Item>
					<NavDropdown.Item href="/result/PreferredMaxBytes">BasePreferredMaxBytes</NavDropdown.Item>
					<NavDropdown.Divider />
				</NavDropdown>
				<Nav.Link href="https://github.com/SamYuan1990/Probe/issues">issue report</Nav.Link>
				</Nav>
			</Navbar.Collapse>
			</Navbar>
		)
	}
}

ReactDOM.render(<ProbeNav/>, document.getElementById('Nav'));