import styles from './_login.module.scss';
import doctorLogin from '../../img/img-login4.svg';
import { Link, useHistory } from 'react-router-dom';
import abslogin from '../../img/abslogin.svg';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../redux/userDucks';
import { useForm } from 'react-hook-form';
import { React, useState, useEffect, Fragment } from 'react';
import '../../sass/styles.scss';
import LoadingScreen from 'loading-screen-kraenau';
import Swal from 'sweetalert2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const Login = () => {


    const test = useSelector(store => store.usuario.token)
    const loading = useSelector(store => store.global.loading)

    const dispatch = useDispatch();
    const { register, errors, handleSubmit } = useForm();
    const history = useHistory();


    const [user, setUser] = useState(
        {
            "Usuario": '',
            "Contrasenia": ''
        }
    )


    const onSubmit = async (data, e) => {
        dispatch(loginAction(user))
        // console.log(localStorage.getItem('token'))
    }

    /*Validations */

    const onChange = (e) => {
        setUser(
            {
                ...user,
                [e.target.name]: e.target.value.replace(/[^a-z, A-Z\s]/gi, "")
            }
        )
    };

    const onChangeAll = (e) => {
        setUser(
            {
                ...user,
                [e.target.name]: e.target.value
            }
        )
    };


    useEffect(() => {

        if (localStorage.getItem('token')) {
            history.push('/foro')


            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })

            Toast.fire({
                icon: 'success',
                title: 'Logueo éxitoso'
            })
        }

    }, [test])



    return (
        <Fragment>
            {

                loading === true &&
                <LoadingScreen></LoadingScreen>

            }
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
                        <form className={`${styles.login_form}`} onSubmit={handleSubmit(onSubmit)}>
                            <h2>Log in</h2>
                            <div className={`${styles.input} input_format`}>
                                <span>Usuario</span>
                                <input
                                    name="Usuario"
                                    placeholder="Ingrese un usuario"
                                    autoComplete="off"
                                    ref={
                                        register({
                                            required: { value: true, message: 'Necesitas un usuario' },
                                            minLength: { value: 5, message: '5 letras minimas' }
                                        })
                                    }
                                    className={`${errors.Usuario?.message ? 'input-invalid' : ''}`}
                                    value={user.Usuario}
                                    onChange={(e) => onChange(e)}
                                ></input>
                                <div className="error-message">{errors.Usuario?.message}</div>
                            </div>
                            <div className={`${styles.input} input_format`}>
                                <span>Contraseña</span>
                                <input
                                    name="Contrasenia"
                                    type="password"
                                    placeholder="Ingrese una contraseña"
                                    autoComplete="off"
                                    ref={
                                        register({
                                            required: { value: true, message: 'Necesitas una contraseña' },
                                            minLength: { value: 4, message: '4 letras minimas' }
                                        })
                                    }
                                    className={`${errors.Contrasenia?.message ? 'input-invalid' : ''}`}
                                    value={user.Contraseña}
                                    onChange={(e) => { onChangeAll(e) }}
                                ></input>
                                <div className="error-message">{errors.Contrasenia?.message}</div>
                            </div>
                            <p className="forgetpass">¿Olvidaste tu contraseña? <Link to="/recuperarContraseña">click aquí</Link></p>
                            <button type="submit" className="button">Log in</button>
                            <p className="forgetpass">Si no tienes una cuenta , <Link to="/register">click aquí</Link></p>
                        </form>
                    </div>
                </section>
            </section>
            <a href="https://api.whatsapp.com/send?phone=51941432379&text=Hola%21%20Quisiera%20m%C3%A1s%20informaci%C3%B3n%20sobre%20Varela%202." className="float" target="_blank">
                <i className="my-float"><FontAwesomeIcon  icon="phone"></FontAwesomeIcon></i>
            </a>
            {
                /*Probando deploy con puerto 8080 -2 */
            }
        </Fragment>
    );
}

export default Login;