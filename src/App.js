import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './components/Login/Login';
import './sass/styles.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Login></Login>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
