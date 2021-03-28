import { React } from 'react';
import { NavLink } from 'react-router-dom';
import '../../sass/styles.scss';
import styles from './_navbar.module.scss';
import Logo from '../../img/logo.svg';
import '../../sass/styles.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Navbar = () => {


    return (
        <section className={`${styles.navbar}`}>
            <section className={`${styles.navbar__content} container flex flex-jc-sb`}>
                <div className={`${styles.navbar__left}`}>
                    <img src={Logo} alt="logo"></img>
                </div>

                <ul className={`${styles.navbar__right} flex flex-ai-c`}>
                    <li>
                        <NavLink activeClassName='active' to='/consultas' defaultChecked>Consultas</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='active' to='/historialmedico' defaultChecked>Historial Médico</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='active' to='/recomendaciones' defaultChecked>Recomendaciones COVID 19</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='active' to='/foro' defaultChecked>Foro COVID 19</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName='active' to='/perfil' defaultChecked>Mi perfil</NavLink>
                    </li>
                    <li>
                        <i className="icon"><FontAwesomeIcon icon="sign-out-alt" /></i>
                    </li>
                </ul>

            </section>
        </section>
    );
}

export default Navbar;