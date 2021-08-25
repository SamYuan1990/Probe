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
    
            this.handleChange = this.handleChange.bind(this);
            this.handleshowImport = this.handleshowImport.bind(this);
            this.handleshowExport = this.handleshowExport.bind(this);

        }
        
        //改变textarea内容
        handleChange(e){    
            this.setState({
                mockJson: e.target.value,
            })
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
                <Collapse in={this.state.showImport}>
                <div id="example-collapse-text">
                    <textarea placeholder="Import form Json" onChange={this.handleChange} ></textarea>
                </div>
                </Collapse>
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
                <Collapse in={this.state.showExport}>
                <div id="example-collapse-text2">
                    <ReactJson src={this.props.DATAJson}/>
                </div>
                </Collapse>
                </Card.Body>
                </Card>      
            )
        }
    }