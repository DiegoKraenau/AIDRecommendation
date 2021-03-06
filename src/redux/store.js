import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import userReducer from './userDucks';
import globalReducer from './globalDucks';
import deficitReducer from './deficitDucks';
import diseaseReducer from './diseaseDucks';
import consultationReducer from './consultationDucks';
import doctorReducer from './doctorDucks';
import pacientReducer from './pacientDucks';
import questionReducer from './questionsDucks';


const rootReducer = combineReducers({
    usuario: userReducer,
    global: globalReducer,
    deficit: deficitReducer,
    disease: diseaseReducer,
    consultation: consultationReducer,
    doctor: doctorReducer,
    pacient: pacientReducer,
    question: questionReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;//only if u have the extension

export default function generateStore() {
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
    return store;
}