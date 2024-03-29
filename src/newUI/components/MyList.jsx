import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import MyInput from './MyInput.jsx';
import ReactJsonView from './MyImportExport.jsx';
import Collapse from 'react-bootstrap/Collapse';
import $ from 'jquery';

export default class MyList extends React.Component {
	// in this is a list of MyInput
	constructor(props) {
		super(props);
		this.state = {
			showSample: false,
		}
		this.RUN =this.RUN.bind(this);
		this.Check =this.Check.bind(this);
		this.changePath =this.changePath.bind(this);
		this.changeBatchTimeout =this.changeBatchTimeout.bind(this);
		this.changeMaxMessageCount =this.changeMaxMessageCount.bind(this);
		this.changeAbsoluteMaxBytes =this.changeAbsoluteMaxBytes.bind(this);
		this.changePreferredMaxBytes =this.changePreferredMaxBytes.bind(this);
		this.handleshowSample = this.handleshowSample.bind(this);
	}


	RUN(event){
		//alert("send to back end as starting "+JSON.stringify(this.props.todos));
		let data = {};
		data.BatchTimeout = this.props.todos.todos.BatchTimeout;
		data.MaxMessageCount = this.props.todos.todos.MaxMessageCount;
		data.AbsoluteMaxBytes = this.props.todos.todos.AbsoluteMaxBytes;
		data.PreferredMaxBytes = this.props.todos.todos.PreferredMaxBytes;
		data.path = this.props.todos.todos.path;
		data.cmd = JSON.stringify(this.props.todos.todos.cmd);
		//alert('will run at path '+data.path);
		//alert('will run with Batch timeout list '+ data.BatchTimeout);
		//alert('will run with Max message count list '+ data.MaxMessageCount);
		//alert('will run with Absolute max bytes list '+ data.AbsoluteMaxBytes);
		//alert('will run with PreferredMaxBytes '+ data.PreferredMaxBytes);
		$.post('/api/run/new',data);
	}

	Check(event){
		let data = {};
		data.BatchTimeout = this.props.todos.todos.BatchTimeout;
		data.MaxMessageCount = this.props.todos.todos.MaxMessageCount;
		data.AbsoluteMaxBytes = this.props.todos.todos.AbsoluteMaxBytes;
		data.PreferredMaxBytes = this.props.todos.todos.PreferredMaxBytes;
		data.path = this.props.todos.todos.path;
		data.cmd = JSON.stringify(this.props.todos.todos.cmd);
		alert('config run at path '+data.path);
		alert('config with Batch timeout list '+ data.BatchTimeout);
		alert('config with Max message count list '+ data.MaxMessageCount);
		alert('config with Absolute max bytes list '+ data.AbsoluteMaxBytes);
		alert('config with PreferredMaxBytes '+ data.PreferredMaxBytes);
	} 

	changePath(event){
		this.props.dispatch(
			({
				type: 'CHANGE_PATH',
				value: event.target.value,
			})
		)
	}

	changeBatchTimeout(event){
		this.props.dispatch(
			({
				type: 'CHANGE_BATCHTIMEOUT',
				value: event.target.value,
			})
		)
	}

	changeMaxMessageCount(event){
		this.props.dispatch(
			({
				type: 'CHANGE_MAXMSG',
				value: event.target.value,
			})
		)
	}

	changeAbsoluteMaxBytes(event){
		this.props.dispatch(
			({
				type: 'CHANGE_ABS',
				value: event.target.value,
			})
		)
	}

	changePreferredMaxBytes(event){
		this.props.dispatch(
			({
				type: 'CHANGE_PREFERED',
				value: event.target.value,
			})
		)
	}

	handleshowSample(e){
		let value = this.state.showSample;
		this.setState({
			showSample: !value,
		})
	}

	render () {
		// console.log(JSON.stringify(this.state.arr));
		return (
			<div>
			<Card>
			<Card.Header>
			<ReactJsonView dispatch={this.props.dispatch} DATAJson={this.props.todos}/>
			</Card.Header>
			<Card.Body>
			<Button
                        variant="info"
                        onClick={this.handleshowSample}
                        aria-controls="showSample"
                        aria-expanded={open}
                    >
                        Try Samples
            </Button>
			<Collapse in={this.state.showSample}>
            <div id="showSample">
				<Card>
					<Card.Body>
					<Card.Title>TestNetwork with Tape</Card.Title>
					<Card.Text>This Sample will use test network under fabric sample to build fabric network, and use tape to test it.</Card.Text>
					<Button variant="success" onClick={this.props.ApplyTestNetwork}>Apply</Button>
					</Card.Body>
				</Card>
				<Card>
					<Card.Body>
					<Card.Title>TestNetwork with Monitor</Card.Title>
					<Card.Text>This Sample will use test network under fabric sample to build fabric network, and use tape to test it, additionally it will have a monitor on test network.</Card.Text>
					<Button variant="success" onClick={this.props.ApplyTestNetworkWithMonitor}>Apply</Button>
					</Card.Body>
				</Card>
				<Card>
					<Card.Body>
					<Card.Title>Minifab with Tape</Card.Title>
					<Card.Text>This Sample will use minifab to build fabric network, and use tape to test it.</Card.Text>
					<Button variant="success" onClick={this.props.ApplyTestNetworkMinifab}>Apply</Button>
					</Card.Body>
				</Card>
				<Card>
					<Card.Body>
					<Card.Title>TestNetwork with Caliper</Card.Title>
					<Card.Text>This Sample will use test network under fabric sample to build fabric network, and use caliper to test it.</Card.Text>
					<Button variant="success" onClick={this.props.ApplyTestNetworkMinifab}>Apply</Button>
					</Card.Body>
				</Card>
			</div>
			</Collapse>
			<ListGroup variant="flush">
            General Settings
			<ListGroup>Path <input type="text" onChange={this.changePath} placeholder={this.props.todos.todos.path}/> </ListGroup>
			<ListGroup>BatchTimeout List <input type="text" onChange={this.changeBatchTimeout} placeholder={this.props.todos.todos.BatchTimeout}/> </ListGroup>
			<ListGroup>MaxMessageCount List <input type="text" onChange={this.changeMaxMessageCount} placeholder={this.props.todos.todos.MaxMessageCount}/> </ListGroup>
			<ListGroup>AbsoluteMaxBytes List <input type="text" onChange={this.changeAbsoluteMaxBytes} placeholder={this.props.todos.todos.AbsoluteMaxBytes}/> </ListGroup>
			<ListGroup>PreferredMaxBytes List <input type="text" onChange={this.changePreferredMaxBytes} placeholder={this.props.todos.todos.PreferredMaxBytes}/> </ListGroup>
			<ListGroup>Commands for each round</ListGroup>
			{
				this.props.todos.todos.cmd.map((item, index) => 
				<ListGroup.Item key={item.orderer}>
					<MyInput data={item}
							 dispatch={this.props.dispatch}/>
				</ListGroup.Item>) // 需要带上 key 属性 <li >{item}</li>
      		}
			</ListGroup>
			</Card.Body>
			<Card.Footer className="text-muted">
				<Button variant="info" onClick={this.props.addItem}>Add Command</Button>
				<Button variant="warning" onClick={this.props.removeItem}>Remove Last Command</Button>
				<Button variant="success" onClick={this.Check}>Check</Button>
				<Button variant="success" onClick={this.RUN}>Submit</Button>
			</Card.Footer>
			</Card>
			</div>
		);
	}
}