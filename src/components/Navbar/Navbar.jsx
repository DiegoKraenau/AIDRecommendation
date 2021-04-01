import { React, useEffect, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import '../../sass/styles.scss';
import styles from './_navbar.module.scss';
import Logo from '../../img/logo.svg';
import '../../sass/styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux'
import { exitAction, getInfoUser } from '../../redux/userDucks';


const Navbar = () => {

    let history = useHistory();
    const dispatch = useDispatch();
    const userInfo = useSelector(store => store.usuario.userInside)
    const [rol, setRol] = useState(0)

    const exit = () => {
        //localStorage.removeItem('token')
        dispatch(exitAction())
        history.push('/')
    }

    useEffect(() => {
        if (userInfo === null) {
            dispatch(getInfoUser())
        } else {
            setRol(userInfo.Rol)
        }
    }, [])

    useEffect(() => {
        if (userInfo) {
            setRol(userInfo.Rol)
        }
    }, [userInfo])




    return (
        <section className={`${styles.navbar}`}>
            <section className={`${styles.navbar__content} container flex flex-jc-sb`}>
                <div className={`${styles.navbar__left}`}>
                    <img src={Logo} alt="logo"></img>
                </div>

                <ul className={`${styles.navbar__right} flex flex-ai-c`}>
                    {
                        (userInfo?.Rol === 1) ? (
                            <li>
                                <NavLink activeClassName='active' to='/consultasPacientes' defaultChecked>Consultas</NavLink>
                            </li>

                        ) : (
                            <li>
                                <NavLink activeClassName='active' to='/consultasDoctores' defaultChecked>Consultas</NavLink>
                            </li>

                        )
                    }
                    {
                        (userInfo?.Rol === 1) &&
                        <li>
                            <NavLink activeClassName='active' to='/historialmedico' defaultChecked>Historial Médico</NavLink>
                        </li>
                    }
                    {
                        (userInfo?.Rol === 1) &&
                        <li>
                            <NavLink activeClassName='active' to={`/recomendaciones`} defaultChecked>Recomendaciones COVID 19</NavLink>
                        </li>
                    }
                    {
                        (userInfo?.Rol === 1) ? (
                            <li>
                                <NavLink activeClassName='active' to='/foro' defaultChecked>Foro COVID 19</NavLink>
                            </li>

                        ) : (
                            <li>
                                <NavLink activeClassName='active' to='/foroDoctores' defaultChecked>Foro COVID 19</NavLink>
                            </li>
                        )
                    }
                    {
                        (userInfo?.Rol === 2) &&
                        <li>
                            <NavLink activeClassName='active' to='/foro' defaultChecked>Ranking doctores</NavLink>
                        </li>
                    }
                    <li>
                        <NavLink activeClassName='active' to='/perfil' defaultChecked>Mi perfil</NavLink>
                    </li>
                    <li>
                        <i className="icon"><FontAwesomeIcon icon="sign-out-alt" onClick={() => exit()} /></i>
                    </li>
                </ul>
            </section>
        </section>
    );
}

export default Navbar;