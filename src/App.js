import React, { useState } from 'react';
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
import Consultas from './components/Consultas/Consultas';
import HistorialMedico from './components/HistorialMedico/HistorialMedico';
import Recomendaciones from './components/Recomendaciones/Recomendaciones';
import Foro from './components/Foro/Foro';
import Perfil from './components/Perfil/Perfil';
import './Extras/FontAwsomeIcons';
import ProtectedRoutes from './Extras/ProtectedRoutes';


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

          <ProtectedRoutes
            path="/consultas"
            component={Consultas}
          ></ProtectedRoutes>
          <ProtectedRoutes
            path="/historialmedico"
            component={HistorialMedico}
          ></ProtectedRoutes>
          <ProtectedRoutes
            path="/recomendaciones"
            component={Recomendaciones}
          ></ProtectedRoutes>
          <ProtectedRoutes
            path="/foro"
            component={Foro}
          ></ProtectedRoutes>
          <Route path="/perfil" exact>
            <Perfil></Perfil>
          </Route>
          {
            /*
             <ProtectedRoutes
            path="/perfil"
            component={Perfil}
            isAuth={isAuth}
          ></ProtectedRoutes> */
          }


        </Switch>
      </Router>
    </Provider>

  );
}

export default App;
