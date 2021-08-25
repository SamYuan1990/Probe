import React from 'react';
import Card from 'react-bootstrap/Card';
import ReactJson from 'react-json-view';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

export default class ReactJsonView extends React.Component{

        constructor(props){
            super(props)
            this.state = {
                showImport: false,
                showExport: false,
            }
            this.import = this.import.bind(this);
            this.handleshowImport = this.handleshowImport.bind(this);
            this.handleshowExport = this.handleshowExport.bind(this);
        }

        import(event){
            this.props.dispatch(
                ({
                    type: 'CHANGEALL',
                    value: event.target.value,
                })
            )
        }

        handleshowImport(e){
            let value = this.state.showImport;
            this.setState({
                showImport: !value,
            })
        }

        handleshowExport(e){
            let value = this.state.showExport;
            this.setState({
                showExport: !value,
            })
        }
    
        render(){
            return(
                <Card>
			    <Card.Header>
                <Button
                    onClick={this.handleshowImport}
                    aria-controls="example-collapse-text"
                    aria-expanded={open}
                >
                    for import, please copy your data here 
                </Button>
                </Card.Header>
                <Card.Body>
                <div id="example-collapse-text">
                    <input type="text" placeholder="Import form Json" onChange={this.import} ></input>
                </div>
                </Card.Body>
                <Card.Header>
                <Button
                    onClick={this.handleshowExport}
                    aria-controls="example-collapse-text2"
                    aria-expanded={open}
                >
                    for export, please copy your data from list below
                </Button>
                </Card.Header>
                <Card.Body>
                    <ReactJson src={this.props.DATAJson}/>
                </Card.Body>
                </Card>      
            )
        }
    }