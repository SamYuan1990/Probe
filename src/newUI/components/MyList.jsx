import React from 'react';
import ReactDOM from 'react-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import MyInput from './MyInput.jsx'
import $ from 'jquery';

export default class MyList extends React.Component {
	// in this is a list of MyInput
	constructor(props) {
		super(props);
		this.state = {
			arr: [1,2,3,4,5]
		};
		this.AddItem =this.AddItem.bind(this);
		this.RemoveItem =this.RemoveItem.bind(this);
		this.RUN =this.RUN.bind(this);
		this.Check =this.Check.bind(this);
	}

	AddItem(event) {
		var arrs = this.state.arr;
		arrs.push(arrs.length);
		this.setState({
			arrs:arrs
		});
	}

	RemoveItem(event){
		var arrs = this.state.arr;
		arrs.pop()
		this.setState({
			arrs:arrs
		});
	}

	RUN(event){
		// alert("send to back end as starting "+JSON.stringify(this.state));
		//$.post('/api/run',this.state)
	}

	Check(event){
		alert("send to back end as starting "+JSON.stringify(this.state));
	}

	render () {
		return (
			<div>
			<Card className="text-center">
			<Card.Header>Input Your Commands</Card.Header>
			<Card.Body>
			<ListGroup variant="flush">
			{
				this.state.arr.map((item, index) => 
				<ListGroup.Item key={index}><MyInput/></ListGroup.Item>) // 需要带上 key 属性 <li >{item}</li>
      		}
			</ListGroup>
			</Card.Body>
			<Card.Footer className="text-muted">
				<Button variant="info" onClick={this.AddItem}>Add Command</Button>
				<Button variant="warning" onClick={this.RemoveItem}>Remove Last Command</Button>
				<Button variant="success" onClick={this.Check}>Check</Button>
				<Button variant="success" onClick={this.RUN}>Submit</Button>
			</Card.Footer>
			</Card>
			</div>
		);
	}
}

// Rendering the entire react application
ReactDOM.render(<MyList/>, document.getElementById('root'));