import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { connect } from 'react-redux';

class MyInput extends React.Component {
	// in this component receive command and args
	constructor(props) {
		super(props);
		this.Debug =this.Debug.bind(this);
		this.TapeType = this.TapeType.bind(this);
	}
/*
	ShellType(event){
		this.setState({
			type:'Shell'
		});
	}
*/

	TapeType(event){
		console.log(event.target.id)
		dispatch(
			({
				type: 'TYPE_TAPE',
				order: event.target.id,
			})
		)
	}
/*s
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
	}*/

	Debug(event){
		alert("send to back end as starting "+JSON.stringify(this.props.data));
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
				<Dropdown.Item as="button" id={this.props.data.order} >Shell</Dropdown.Item>
				<Dropdown.Item as="button" id={this.props.data.order} onClick={this.TapeType}>Tape</Dropdown.Item>
				</DropdownButton>
				<ListGroup.Item>{this.props.data.cmdType}</ListGroup.Item>
				{
					this.props.data.args.map((item, index) => 
							<input type="text" key={index} placeholder={item}/> 
					) // 需要带上 key 属性 <li >{item}</li> <ListGroup.Item key={index}>{item}</ListGroup.Item>
      			}
			  	</ListGroup>
				<Button variant="info" >Add New Arg</Button>
				<Button variant="warning" >Remove Last Arg</Button>
				<Button variant="warning" onClick={this.Debug}>Show Command</Button>
			</div>
		);
	}
}

// onClick={this.ShellType}
// onClick={this.TapeType}
// onClick={this.AddItem}
// onClick={this.RemoveItem}

export default connect()(MyInput);