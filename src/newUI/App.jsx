import React from 'react';
import ReactDOM from 'react-dom';
import MyList from './components/MyList.jsx'

class App extends React.Component {
	render () {
		return (
			<div>
				<MyList />
			</div>
		);
	}
}

// Rendering the entire react application
/* 
ReactDOM.render(
    <Provider store={store}>
		<App/>
	</Provider>,
, document.getElementById('root'));
*/
 
ReactDOM.render(
		<App/>
, document.getElementById('root'));
