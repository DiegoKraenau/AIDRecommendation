import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './components/Login/Login';
import Register from './components/register/Register';
import './sass/styles.scss';
import Consultas from './components/Consultas/Consultas';
import Recomendaciones from './components/Recomendaciones/Recomendaciones';
import Foro from './components/Foro/Foro';
import Perfil from './components/Perfil/Perfil';
import './Extras/FontAwsomeIcons';
import ProtectedRoutes from './Extras/ProtectedRoutes';
import ListaHistorialMedico from './components/ListaHistorialMedico/ListaHistorialMedico';
import AgregarDeficit from './components/HistorialMedico/AgregarDeficit';
import EditarDeficit from './components/EditarDeficit/EditarDeficit';
import AgregarConsulta from './components/AgregarConsulta/AgregarConsulta';


function App() {




  return (


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
          component={ListaHistorialMedico}
        ></ProtectedRoutes>
        <ProtectedRoutes
          path="/recomendaciones"
          component={Recomendaciones}
        ></ProtectedRoutes>
        <ProtectedRoutes
          path="/foro"
          component={Foro}
        ></ProtectedRoutes>
        <ProtectedRoutes
          path="/editarDeficit/:deficitId"
          component={EditarDeficit}
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

        <ProtectedRoutes
          path="/agregarDeficit"
          component={AgregarDeficit}
        ></ProtectedRoutes>
        <ProtectedRoutes
          path="/consultasPacientes"
          component={AgregarConsulta}
        ></ProtectedRoutes>

      </Switch>
    </Router>

  );
}

export default App;
