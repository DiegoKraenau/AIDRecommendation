import styles from './_login.module.scss';
import doctorLogin from '../../img/img-login4.svg';
import { Link } from 'react-router-dom';
import abslogin from '../../img/abslogin.svg';



const Login = () => {
    return (
        <section className={`${styles.login} flex flex-jc-c flex-ai-c`}>
            <img className={`${styles.abs_img}`} src={abslogin} alt="abs"></img>
            <section className={`${styles.login__content}`}>
                <div className={`${styles.login__content__left}`}>
                    <div className={`${styles.login_text}`}>
                        <p>Bienvenido a</p>
                        <p>AID RECOMMENDATION</p>
                    </div>
                    <div className={`${styles.login_img}`}>
                        <img src={doctorLogin} alt="login-img"></img>
                    </div>
                    <div className={`${styles.login_description}`}>
                        <p>Somos una aplicación web dedicada a las consultas médicas a través de la recolección de información de las historas médicas de los pacientes para que así estos puedan brindarle una mejor información sobre qué es lo que se busca en el momento a los doctores</p>
                    </div>
                </div>
                <div className={`${styles.login__content__right} flex flex-jc-c flex-ai-c`}>
                    <form className={`${styles.login_form}`}>
                        <h2>Log in</h2>
                        <input typpe="email" placeholder="Enter a email"></input>
                        <input type="password" placeholder="Enter a password"></input>
                        <button className="button">Log in</button>
                        <p>Si no tienes una cuenta , <Link to="#">click aquí</Link></p>
                    </form>
                </div>
            </section>
        </section>
    );
}

export default Login;