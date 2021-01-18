import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

export default class MyInput extends React.Component {
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
				<ListGroup horizontal>
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
							<input class="display:inline" type="text" key={index} placeholder={item}/> 
							<br/>
						</div> 
					) // 需要带上 key 属性 <li >{item}</li> <ListGroup.Item key={index}>{item}</ListGroup.Item>
      			}
			  	</ListGroup>
				<Button variant="info" onClick={this.AddItem}>Add New Arg</Button>
				<Button variant="warning" onClick={this.RemoveItem}>Remove Last Arg</Button>
				<Button variant="warning" onClick={this.Debug}>Show Command</Button>
			</div>
		);
	}
}