import React from 'react';
import ReactDOM from 'react-dom';
import MyList from './components/MyList.jsx'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'

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
const store = createStore(rootReducer)
 
ReactDOM.render(
	<Provider store={store}>
		<App/>
		</Provider>,
document.getElementById('root'));
