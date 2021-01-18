import React from 'react';
import ReactDOM from 'react-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import MyInput from './MyInput.jsx';
import $ from 'jquery';

export default class MyList extends React.Component {
	// in this is a list of MyInput
	constructor(props) {
		super(props);
		this.RUN =this.RUN.bind(this);
		this.Check =this.Check.bind(this);
	}


	RUN(event){
		alert("send to back end as starting "+JSON.stringify(this.props.todos));
		//$.post('/api/run',this.state)
	}

	Check(event){
		alert("send to back end as starting "+JSON.stringify(this.props.todos));
	} 

	render () {
		// console.log(JSON.stringify(this.state.arr));
		return (
			<div>
			<Card>
			<Card.Header>Input Your Commands</Card.Header>
			<Card.Body>
			<ListGroup variant="flush">
			{
				this.props.todos.todos.map((item, index) => 
				<ListGroup.Item key={item.orderer}>
					<MyInput data={item}
							 typeTape={this.props.typeTape}/>
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