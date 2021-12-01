import createStore from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import {reducer} from './reducers/index';
// import initialState from './reducers/reducerInitialState'


const store = createStore(reducer);


export default store;