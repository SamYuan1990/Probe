
import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

class ProbeNav extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			lng: "en",
			loaded: false,
		};
		this.changeLanguage = this.changeLanguage.bind(this);
	}

	componentDidMount() {
		this.timerID = setInterval(
		  () => this.tick(),
		  1000
		);
	  }
	
	  componentWillUnmount() {
		clearInterval(this.timerID);
	  }

	  tick() {
		if (!this.props.i18n.hasResourceBundle('en','welcome') || !this.state.loaded) {
			console.log('aaaa');
			console.log(this.props.i18n.hasResourceBundle(this.state.lng,'welcome'));
			this.props.i18n.changeLanguage(this.state.lng);
			this.setState({
				loaded: true
			});
		}
	}

	changeLanguage(event){
		let lng = event.target.getAttribute('label');
		console.log(lng);
		this.props.i18n.changeLanguage(lng);
		this.setState({
			lng:lng
		})
	};

	render () {
		const i18n = this.props.i18n;
		return (
			<Navbar bg="light" expand="lg">
			<Navbar.Brand href="https://github.com/SamYuan1990/Probe">{i18n.t('welcome')}</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
				<Nav.Link href="/quick/config">{i18n.t('demo_config')}</Nav.Link>
				<Nav.Link href="/">{i18n.t('move')}</Nav.Link>
				<NavDropdown title={i18n.t('result_header')} id="basic-nav-dropdown">
					<NavDropdown.Item href="/result/BatchTimeout">{i18n.t('resultBatchTimeout')}</NavDropdown.Item>
					<NavDropdown.Item href="/result/MaxMessageCount">{i18n.t('resultMaxMessageCount')}</NavDropdown.Item>
					<NavDropdown.Item href="/result/AbsoluteMaxBytes">{i18n.t('resultAbsoluteMaxBytes')}</NavDropdown.Item>
					<NavDropdown.Item href="/result/PreferredMaxBytes">{i18n.t('resultPreferredMaxBytes')}</NavDropdown.Item>
					<NavDropdown.Divider />
				</NavDropdown>
				<NavDropdown title={i18n.t('change_lang')} id="basic-nav-dropdown">
					<NavDropdown.Item label='en' onClick={this.changeLanguage}>Eng</NavDropdown.Item>
					<NavDropdown.Item label='zh' onClick={this.changeLanguage}>中文</NavDropdown.Item>
					<NavDropdown.Divider />
				</NavDropdown>
				<Nav.Link href="https://github.com/SamYuan1990/Probe/issues">{i18n.t('Feedback')}</Nav.Link>
				</Nav>
			</Navbar.Collapse>
			</Navbar>
		)
	}
}

export default ProbeNav;