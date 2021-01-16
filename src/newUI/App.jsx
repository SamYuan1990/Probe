import React from 'react';
import ReactDOM from 'react-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import $ from 'jquery';


class MyInput extends React.Component {
	// in this component receive command and args
	constructor(props) {
		super(props);
		this.state = {
			type: 'Shell',
			args: ['']
		};
		this.AddItem =this.AddItem.bind(this);
		this.RemoveItem =this.RemoveItem.bind(this);
		this.ShellType =this.ShellType.bind(this);
		this.TapeType =this.TapeType.bind(this);
		this.Debug =this.Debug.bind(this);
	}

	ShellType(event){
		this.setState({
			type:'Shell'
		});
	}

	TapeType(event){
		this.setState({
			type:'Tape'
		});
	}

	AddItem(event) {
		var args = this.state.args;
		args.push('');
		this.setState({
			args:args
		});
	}

	RemoveItem(event){
		var args = this.state.args;
		args.pop()
		this.setState({
			args:args
		});
	}

	Debug(event){
		alert("send to back end as starting "+JSON.stringify(this.state));
	}

	render () {
		return (
			<div>
				<DropdownButton
				as={InputGroup.Prepend}
				variant="outline-secondary"
				title="Type"
				id="input-group-dropdown-1"
				>
				<Dropdown.Item as="button" onClick={this.ShellType}>Shell</Dropdown.Item>
				<Dropdown.Item as="button" onClick={this.TapeType}>Tape</Dropdown.Item>
				</DropdownButton>
				<ListGroup.Item>{this.state.type}</ListGroup.Item>
			{
				this.state.args.map((item, index) => 
					<div> 
						<input type="text" key={index} placeholder={item}/> 
						<br/>
					</div> 
				) // 需要带上 key 属性 <li >{item}</li> <ListGroup.Item key={index}>{item}</ListGroup.Item>
      		}
				<Button variant="info" onClick={this.AddItem}>Add Arg</Button>
				<Button variant="warning" onClick={this.RemoveItem}>Remove Last Arg</Button>
				<Button variant="warning" onClick={this.Debug}>Show Command</Button>
			</div>
		);
	}
}

class MyList extends React.Component {
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
			<Card.Header>Input Your Args</Card.Header>
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