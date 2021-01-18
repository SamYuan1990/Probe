import React from 'react';
import ReactDOM from 'react-dom';
import MyList from './components/MyList.jsx'
import { createStore } from 'redux'
import rootReducer from './reducers'

const store = createStore(rootReducer)
const rootEl = document.getElementById('root')
// Rendering the entire react application 
function render(){
	ReactDOM.render(
		<MyList
			todos={store.getState()}
			addItem={() => store.dispatch({ type: 'ADD_TODO' })}
			removeItem={() => store.dispatch({ type: 'REMOVE_TODO' })}
			typeTape={() => store.dispatch({ type: 'TYPE_TAPE' })}
		/>
	,rootEl);
}

render();
store.subscribe(render);
