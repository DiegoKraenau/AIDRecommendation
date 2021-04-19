import styles from './_register.module.scss';
import { Fragment, React, useState } from 'react';
import '../../sass/styles.scss';
import profile from '../../img/profile.svg';
import doctorface from '../../img/dface3.svg';
import pacientface from '../../img/pface.svg';
import abslogin from '../../img/abslogin.svg';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from 'loading-screen-kraenau';
import { registerUser } from '../../redux/userDucks';

const Register = () => {

    /*
     1: pacient
     2:doctor
    */
    const [rolSelected, setRolSelect] = useState(1)
    const { register, errors, handleSubmit } = useForm()
    const history = useHistory();
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        "Nombre": '',
        "Apellido": '',
        "DNI": '',
        "Edad": null,
        "Correo": '',
        "Usuario": '',
        "Contrasenia": '',
        "PalabraSecreta": '',
        "Sexo": '',
        "Especialidad": '',
        "Colegiatura": '',
        "Rol": null
    })
    const loading = useSelector(store => store.global.loading);

    const changeToDoctor = () => {
        setRolSelect(2)
    }

    const changeToPacient = () => {
        setRolSelect(1)
    }

    const onSubmit = (data, e) => {

        data = {
            ...data,
            "Rol": rolSelected
        }

        /*Make if to use the endpoint */
        e.target.reset()
        dispatch(registerUser(data));
        /*Alert success */
        Swal.fire(
            'Buen Trabajo',
            'Te has registrado con exito',
            'success'
        ).then((result) => {
            if (result.isConfirmed) {
                history.push('/')
            }
        })
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

    const onChangeNumbers = (e) => {
        setUser(
            {
                ...user,
                [e.target.name]: e.target.value.replace(/[^0-9]/gi, "")
            }
        )
    }



    return (
        <Fragment>
            {
                loading === true &&
                <LoadingScreen></LoadingScreen>
            }
            <section className={`${styles.register} flex flex-jc-c flex-ai-c`}>

                <img className={`${styles.abs_img}`} src={abslogin} alt="abs"></img>
                <section className={`${styles.register__content} container`}>
                    <div className={`${styles.register__content__left}`}>
                        <img src={profile} alt="imgregister"></img>
                    </div>
                    <div className={`${styles.register__content__right}`}>
                        <h2>Registro</h2>
                        <div className={`${styles.register_roles} flex flex-jc-sb`}>
                            <div onClick={() => changeToPacient()} className={`${styles.pacient} ${rolSelected === 1 ? styles.default : styles.grey}`}>
                                <img src={pacientface} alt="pacient"></img>
                                <p>Paciente</p>
                            </div>
                            <div onClick={() => changeToDoctor()} className={`${styles.doctor} ${rolSelected === 2 ? styles.default : styles.grey}`}>
                                <img src={doctorface} alt="doctor"></img>
                                <p>Doctor</p>
                            </div>
                        </div>
                        <div className={`${styles.forms__content}`}>
                            <form className={`${styles.form} flex`} onSubmit={handleSubmit(onSubmit)}>
                                <div className={`${styles.input}`}>
                                    <span>Nombre</span>
                                    <input
                                        type="string"
                                        name="Nombre"
                                        placeholder="Ingrese un nombre"
                                        autoComplete="off"
                                        ref={
                                            register({
                                                required: { value: true, message: 'Necesitas un nombre' },
                                                minLength: { value: 3, message: '3 letras minimas' }
                                            })
                                        }
                                        className={`${errors.Name?.message ? 'input-invalid' : ''}`}
                                        value={user.Nombre}
                                        onChange={(e) => onChange(e)}
                                    >
                                    </input>
                                    <div className="error-message">{errors.Name?.message}</div>
                                </div>
                                <div className={`${styles.input}`}>
                                    <span>Apellido</span>
                                    <input
                                        name="Apellido"
                                        placeholder="Ingrese un apellido"
                                        autoComplete="off"
                                        ref={
                                            register({
                                                required: { value: true, message: 'Necesitas un apellido' },
                                                minLength: { value: 3, message: '3 letras minimas' }
                                            })
                                        }
                                        className={`${errors.Apellido?.message ? 'input-invalid' : ''}`}
                                        value={user.Apellido}
                                        onChange={(e) => onChange(e)}
                                    ></input>
                                    <div className="error-message">{errors.Apellido?.message}</div>
                                </div>
                                <div className={`${styles.input}`}>
                                    <span>DNI</span>
                                    <input
                                        name="DNI"
                                        placeholder="Ingrese un DNI"
                                        autoComplete="off"
                                        ref={
                                            register({
                                                required: { value: true, message: 'Necesitas un dni' },
                                                minLength: { value: 8, message: 'El DNI debe tener 8 dígitos' },
                                                maxLength: { value: 8, message: 'El DNI debe tener 8 dígitos' }
                                            })
                                        }
                                        className={`${errors.DNI?.message ? 'input-invalid' : ''}`}
                                        value={user.DNI}
                                        onChange={(e) => onChangeNumbers(e)}
                                    ></input>
                                    <div className="error-message">{errors.DNI?.message}</div>
                                </div>
                                <div className={`${styles.input}`}>
                                    <span>Edad</span>
                                    <input
                                        name="Edad"
                                        type="number"
                                        placeholder="Ingrese su edad"
                                        autoComplete="off"
                                        ref={
                                            register({
                                                required: { value: true, message: 'Necesitas una edad' },
                                                minLength: { value: 1, message: '1 número minimo' }
                                            })
                                        }
                                        className={`${errors.Edad?.message ? 'input-invalid' : ''}`}
                                    ></input>
                                    <div className="error-message">{errors.Edad?.message}</div>
                                </div>
                                <div className={`${styles.input}`}>
                                    <span>Correo</span>
                                    <input
                                        name="Correo"
                                        type="email"
                                        placeholder="Ingrese un correo"
                                        autoComplete="off"
                                        ref={
                                            register({
                                                required: { value: true, message: 'Necesitas un correo' },
                                                minLength: { value: 5, message: '5 letras minimas' }
                                            })
                                        }
                                        className={`${errors.Correo?.message ? 'input-invalid' : ''}`}
                                    ></input>
                                    <div className="error-message">{errors.Correo?.message}</div>
                                </div>
                                <div className={`${styles.input}`}>
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
                                <div className={`${styles.input}`}>
                                    <span>Contraseña</span>
                                    <input
                                        name="Contrasenia"
                                        type="password"
                                        placeholder="Ingrese una contraseña"
                                        autoComplete="off"
                                        ref={
                                            register({
                                                required: { value: true, message: 'Necesitas una contraseña' },
                                                minLength: { value: 5, message: '5 letras minimas' }
                                            })
                                        }
                                        className={`${errors.Contrasenia?.message ? 'input-invalid' : ''}`}
                                    ></input>
                                    <div className="error-message">{errors.Contrasenia?.message}</div>
                                </div>
                                <div className={`${styles.input}`}>
                                    <span>Palabra secreta</span>
                                    <input
                                        name="PalabraSecreta"
                                        placeholder="Ingrese una palabra secreta"
                                        autoComplete="off"
                                        ref={
                                            register({
                                                required: { value: true, message: 'Necesitas un palabra secreta' },
                                                minLength: { value: 5, message: '5 letras minimas' }
                                            })
                                        }
                                        className={`${errors.PalabraSecreta?.message ? 'input-invalid' : ''}`}
                                        value={user.PalabraSecreta}
                                        onChange={(e) => onChange(e)}
                                    ></input>
                                    <div className="error-message">{errors.PalabraSecreta?.message}</div>
                                </div>
                                <div className={`${styles.input}`}>
                                    <span>Sexo</span>
                                    <div className="select-style">
                                        <select
                                            name="Sexo"
                                            ref={
                                                register({
                                                    required: { value: true, message: 'Necesitas un sexo' }
                                                })
                                            }
                                            className={`${errors.Sexo?.message ? 'input-invalid' : 'select'}`}
                                        >
                                            <option value="Masculino">Masculino</option>
                                            <option value="Femenino">Femenino</option>
                                            <option value="Ambos">Ambos</option>
                                        </select>
                                        <div className="arrow">&#9660;</div>
                                    </div>
                                    <div className="error-message">{errors.Sexo?.message}</div>
                                </div>
                                <div className={`${styles.input}  ${rolSelected === 2 ? 'display-block' : 'display-none'}`}>
                                    <span>Especialidad</span>
                                    <input
                                        name="Especialidad"
                                        placeholder="Ingrese la especialidad"
                                        autoComplete="off"
                                        ref={
                                            rolSelected === 2 ? (
                                                register({
                                                    required: { value: true, message: 'Necesitas una especialidad' },
                                                    minLength: { value: 5, message: '5 letras minimas' }
                                                })
                                            ) : (
                                                register({
                                                    required: { value: false }
                                                })
                                            )
                                        }
                                        className={`${errors.Especialidad?.message ? 'input-invalid' : ''}`}
                                    ></input>
                                    <div className="error-message">{errors.Especialidad?.message}</div>
                                </div>
                                <div className={`${styles.input} ${rolSelected === 2 ? 'display-block' : 'display-none'}`}>
                                    <span>Colegiatura</span>
                                    <input
                                        name="Colegiatura"
                                        placeholder="Ingrese el número de colegiatura"
                                        autoComplete="off"
                                        ref={
                                            rolSelected === 2 ? (
                                                register({
                                                    required: { value: true, message: 'Necesitas un colegiatura' },
                                                    minLength: { value: 5, message: '5 letras minimas' }
                                                })
                                            ) : (
                                                register({
                                                    required: { value: false }
                                                })
                                            )
                                        }
                                        className={`${errors.Colegiatura?.message ? 'input-invalid' : ''}`}
                                    ></input>
                                    <div className="error-message">{errors.Colegiatura?.message}</div>
                                </div>
                                <div className="button__content">
                                    <button type="submit" className="button"> Registrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </section>
            </section>
        </Fragment>

    );
}

export default Register;