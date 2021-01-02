import React from 'react';
import ReactDOM from 'react-dom';

class InputForm extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			Path: './fabric-samples/test-network',
			BatchTimeout: '1,2',
			MaxMessageCount: '10',
			AbsoluteMaxBytes: '2',
			PreferredMaxBytes: '2',
			CoolDown: '5',
			PrepareCLI: './network.sh',
			StartCLI:  './network.sh',
			CCDeployCLI: './network.sh',
			TapeCount: '5000',
			ShutDownCLI: './network.sh',
			Monitor: 'false'
		};
		this.changePath = this.changePath.bind(this);
		this.changeBatchTimeout = this.changeBatchTimeout.bind(this);
		this.changeMaxMessageCount = this.changeMaxMessageCount.bind(this);
		this.changeAbsoluteMaxBytes = this.changeAbsoluteMaxBytes.bind(this);
		this.changePreferredMaxBytes = this.changePreferredMaxBytes.bind(this);
		this.changeCoolDown = this.changeCoolDown.bind(this);
		this.changePrepareCLI = this.changePrepareCLI.bind(this);
		this.changeStartCLI = this.changeStartCLI.bind(this);
		this.changeCCDeployCLI = this.changeCCDeployCLI.bind(this);
		this.changeTapeCount = this.changeTapeCount.bind(this);
		this.changeShutDownCLI = this.changeShutDownCLI.bind(this);
		this.changeMonitor = this.changeMonitor.bind(this);
	}

	changePath(event){
		this.setState({
			Path: event.target.value? event.target.value:'./fabric-samples/test-network'
		})
	}

	changeBatchTimeout(event){
		this.setState({
			BatchTimeout: event.target.value? event.target.value:'1,2'
		})
	}

	changeMaxMessageCount(event){
		this.setState({
			MaxMessageCount: event.target.value? event.target.value:'10'
		})
	}

	changeAbsoluteMaxBytes(event){
		this.setState({
			AbsoluteMaxBytes: event.target.value? event.target.value:'2'
		})
	}

	changePreferredMaxBytes(event){
		this.setState({
			PreferredMaxBytes: event.target.value? event.target.value:'4'
		})
	}
	changeCoolDown(event){
		this.setState({
			CoolDown: event.target.value? event.target.value:'5'
		})
	}

	changePrepareCLI(event){
		this.setState({
			PrepareCLI: event.target.value? event.target.value:'./network.sh'
		})
	}
	changeStartCLI(event){
		this.setState({
			StartCLI: event.target.value? event.target.value:'./network.sh'
		})
	}
	changeCCDeployCLI(event){
		this.setState({
			CCDeployCLI: event.target.value? event.target.value:'./network.sh'
		})
	}
	changeTapeCount(event){
		this.setState({
			TapeCount: event.target.value? event.target.value:'5000'
		})
	}
	changeShutDownCLI(event){
		this.setState({
			ShutDownCLI: event.target.value? event.target.value:'./network.sh'
		})
	}

	changeMonitor(event){
		this.setState({
			Monitor: event.target.value? event.target.value:'false'
		})
	}
	

	render () {
		return (
            <div class="pure-g">
				<div class="pure-u-1-2 pure-u-md-1-2">
					<p>Input</p>
					<form action="./api/run">
						Path: <input type="text" name="Path" placeholder="./fabric-samples/test-network" onChange={this.changePath} /><br/>
						BatchTimeout: <input type="text" name="BatchTimeout" placeholder="1,2" onChange={this.changeBatchTimeout} /> <br/>
						MaxMessageCount: <input type="text" name="MaxMessageCount" placeholder="10" onChange={this.changeMaxMessageCount} /><br/>
						AbsoluteMaxBytes: <input type="text" name="AbsoluteMaxBytes" placeholder="2" onChange={this.changeAbsoluteMaxBytes}/><br/>
						PreferredMaxBytes: <input type="text" name="PreferredMaxBytes" placeholder="4" onChange={this.changePreferredMaxBytes}/><br/>
						CoolDown: <input type="text" name="CoolDown" placeholder="5" onChange={this.changeCoolDown}/><br/>
						PrepareCLI: <input type="text" name="PrepareCLI" placeholder="./prepareConfig.sh" onChange={this.changePrepareCLI}/><br/>
						StartCLI: <input type="text" name="StartCLI" placeholder="./network.sh" onChange={this.changeStartCLI}/><br/>
						CCDeployCLI: <input type="text" name="CCDeployCLI" placeholder="./network.sh" onChange={this.changeCCDeployCLI}/><br/>
						TapeCount: <input type="text" name="TapeCount" placeholder="5000" onChange={this.changeTapeCount}/><br/>
						ShutDownCLI: <input type="text" name="ShutDownCLI" placeholder="./network.sh" onChange={this.changeShutDownCLI}/><br/>
						Monitor: <input type="text" name="Monitor" placeholder="false" onChange={this.changeMonitor}/><br/>
						<input type="submit" value="submit"/>
					</form>
				</div>
				<div class="pure-u-1-2 pure-u-md-1-2">
					<p>Sample base on placeholder</p>
					<p>for BatchTimeout {this.state.BatchTimeout}</p>
					<p>for MaxMessageCount {this.state.MaxMessageCount}</p>
					<p>for AbsoluteMaxBytes {this.state.AbsoluteMaxBytes}</p>
					<p>for PreferredMaxBytes {this.state.PreferredMaxBytess}</p>
					<p>$probedir{this.state.Path}/{this.state.PrepareCLI} $BatchTimeout $MaxMessageCount $AbsoluteMaxBytes $PreferredMaxBytes</p>
					<p hidden={!this.state.Monitor=='true'}>docker network connect net_test prometheus</p>
					<p>$probedir{this.state.Path}/{this.state.StartCLI} up createChannel -i 2.2</p>
					<p>$probedir{this.state.Path}/{this.state.CCDeployCLI} deployCC -d $BatchTimeout</p>
					<p>sleep {this.state.CoolDown}</p>
					<p>docker run --name tape -e TAPE_LOGLEVEL=debug --network host -v $probedir:/config guoger/tape tape -c /config/config.yaml -n {this.state.TapeCount}</p>
					<p hidden={!this.state.Monitor=='true'}>docker network disconnect net_test prometheus</p>
					<p>docker rm tape</p>
					<p>$probedir{this.state.Path}/{this.state.ShutDownCLI} down</p>
					<p>sleep {this.state.CoolDown}</p>
				</div>
			</div>
		   )
		}
}

// Rendering the entire react application
ReactDOM.render(<InputForm/>, document.getElementById('root'));