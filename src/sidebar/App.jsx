import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import i18n from "i18next";

const resources = {
	en: {
	  translation: {
		"welcome": "Welcome, here is Probe",
		"move": "input your parameters and go",
		"demo_header":"or config and run quick demo",
		"demo_config":"How to set up Probe quick demo",
		"run_BatchTimeout":"Probe BatchTimeout",
		"run_MaxMessageCount":"Probe MaxMessageCount",
		"result_header":"Explore result here",
		"resultBatchTimeout":"Base BatchTimeout",
		"resultMaxMessageCount":"Base MaxMessageCount",
		"resultAbsoluteMaxBytes":"Base AbsoluteMaxBytes",
		"resultPreferredMaxBytes":"Base PreferredMaxBytes",
		"Feedback":"Feedback on Github",
		"change_lang":"Switch Language",
	  }
	},
	zh: {
		translation: {
			"welcome": "欢迎使用Probe",
			"move": "输入参数然后执行",
			"demo_header":"配置并运行demo",
			"demo_config":"如何配置Probe",
			"run_BatchTimeout":"运行测试BatchTimeout的Demo",
			"run_MaxMessageCount":"运行测试MaxMessageCount的Demo",
			"result_header":"探索结果",
			"resultBatchTimeout":"基于BatchTimeout",
			"resultMaxMessageCount":"基于MaxMessageCount",
			"resultAbsoluteMaxBytes":"基于AbsoluteMaxBytes",
			"resultPreferredMaxBytes":"基于PreferredMaxBytes",
			"Feedback":"在Github上反馈",
			"change_lang":"切换语言",
		}
	  }
  };

class ProbeNav extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			lng: "en"
		};
		this.change2EN = this.change2EN.bind(this);
		this.change2ZH = this.change2ZH.bind(this);
	}

	change2EN(event){
		this.setState({
			lng:"en"
		})
	}

	change2ZH(event){
		this.setState({
			lng:"zh"
		})
	}

	render () {
		i18n.init({
			resources,
			lng: this.state.lng,
		});
		return (
			<Navbar bg="light" expand="lg">
			<Navbar.Brand href="https://github.com/SamYuan1990/Probe">{i18n.t('welcome')}</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
				<Nav.Link href="/">{i18n.t('move')}</Nav.Link>
				<NavDropdown title={i18n.t('demo_header')}>
					<NavDropdown.Item href="/quick/config">{i18n.t('demo_config')}</NavDropdown.Item>
					<NavDropdown.Item href="/quick/BatchTimeout">{i18n.t('run_BatchTimeout')}</NavDropdown.Item>
					<NavDropdown.Item href="/quick/MaxMessageCount">{i18n.t('run_MaxMessageCount')}</NavDropdown.Item>
					<NavDropdown.Divider />
				</NavDropdown>
				<NavDropdown title={i18n.t('result_header')} id="basic-nav-dropdown">
					<NavDropdown.Item href="/result/BatchTimeout">{i18n.t('resultBatchTimeout')}</NavDropdown.Item>
					<NavDropdown.Item href="/result/MaxMessageCount">{i18n.t('resultMaxMessageCount')}</NavDropdown.Item>
					<NavDropdown.Item href="/result/AbsoluteMaxBytes">{i18n.t('resultAbsoluteMaxBytes')}</NavDropdown.Item>
					<NavDropdown.Item href="/result/PreferredMaxBytes">{i18n.t('resultPreferredMaxBytes')}</NavDropdown.Item>
					<NavDropdown.Divider />
				</NavDropdown>
				<NavDropdown title={i18n.t('change_lang')} id="basic-nav-dropdown">
					<NavDropdown.Item onClick={this.change2EN}>Eng</NavDropdown.Item>
					<NavDropdown.Item onClick={this.change2ZH}>中文</NavDropdown.Item>
					<NavDropdown.Divider />
				</NavDropdown>
				<Nav.Link href="https://github.com/SamYuan1990/Probe/issues">{i18n.t('Feedback')}</Nav.Link>
				</Nav>
			</Navbar.Collapse>
			</Navbar>
		)
	}
}

ReactDOM.render(<ProbeNav/>, document.getElementById('Nav'));