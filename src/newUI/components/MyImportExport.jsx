import React from 'react';
import ReactJson from 'react-json-view';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import Alert from 'react-bootstrap/Alert';

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
                <div>
                    <Alert variant='ligth'>
                        Config Your Commands
                    </Alert>
                    <Button
                        variant="info"
                        onClick={this.handleshowImport}
                        aria-controls="example-collapse-text"
                        aria-expanded={open}
                    >
                        Import
                    </Button>
                    <Collapse in={this.state.showImport}>
                    <div id="example-collapse-text">
                        <textarea placeholder="Import form Json" onChange={this.import} rows="10" cols="90"></textarea>
                    </div>
                    </Collapse>
                    <Button
                        variant="info"
                        onClick={this.handleshowExport}
                        aria-controls="example-collapse-text2"
                        aria-expanded={open}
                    >
                        Export
                    </Button>
                    <Collapse in={this.state.showExport}>
                    <div id="example-collapse-text2">
                        <ReactJson src={this.props.DATAJson}/>
                    </div>
                    </Collapse>   
                </div>
            )
        }
    }