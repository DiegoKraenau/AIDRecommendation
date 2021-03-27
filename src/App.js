import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './components/Login/Login';
import Register from './components/register/Register';
import './sass/styles.scss';
import { Provider } from 'react-redux';
import generateStore from './redux/store';

function App() {

  const store = generateStore()

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Login></Login>
          </Route>
          <Route path="/register" exact>
            <Register></Register>
          </Route>
        </Switch>
      </Router>
    </Provider>

  );
}

export default App;
