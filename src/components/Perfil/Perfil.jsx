import { Fragment, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import styles from './_Perfil.module.scss';
import '../../sass/styles.scss';
import Men from '../../img/man.svg';
import Woman from '../../img/women.svg';
import { useDispatch, useSelector } from "react-redux";
import { editProfile, getInfoUser, getProfile } from "../../redux/userDucks";
import LoadingScreen from 'loading-screen-kraenau';
import { useForm } from "react-hook-form";

const Perfil = () => {

    //Redux
    const distpach = useDispatch();
    const userInfo = useSelector(store => store.usuario.userInside)
    const profile = useSelector(store => store.usuario.profile)
    const loading = useSelector(store => store.global.loading)
    const { register, errors, handleSubmit } = useForm()
    const [rolSelected, setRolSelect] = useState(null)
    const [user, setUser] = useState(null)

    //Functions

    const onSubmit = (data, e) => {

        // data = {
        //     ...data,
        //     "Rol": rolSelected
        // }

        // /*Make if to use the endpoint */
        // e.target.reset()
        // dispatch(registerUser(data));
        // /*Alert success */
        // Swal.fire(
        //     'Buen Trabajo',
        //     'Te has registrado con exito',
        //     'success'
        // ).then((result) => {
        //     if (result.isConfirmed) {
        //         history.push('/')
        //     }
        // })
        distpach(editProfile(userInfo.id,user))
        
    }
    //Hooks
    useEffect(() => {
        if (userInfo === null) {
            distpach(getInfoUser())
        } else {
            distpach(getProfile(userInfo.id))
        }
    }, [])

    useEffect(() => {
        if (userInfo !== null) {
            distpach(getProfile(userInfo.id))
        }
    }, [userInfo])

    useEffect(() => {
        if (profile !== null) {
            setUser(profile)
            setUser(profile)
            setRolSelect(userInfo.Rol)
        }
    }, [profile])


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
            <Navbar></Navbar>
            {
                (loading===true || user === null) ? (
                    <LoadingScreen></LoadingScreen>

                ) : (
                    <section className={`${styles.profileSection} flex flex-jc-c flex-ai-c`}>
                        <section className={`${styles.profileSection__content} container`}>
                            <div className={`${styles.profile_left}`}>
                                <div className={`${styles.profile}`}>
                                    <h2>Mi Perfil</h2>
                                    {
                                        user?.Sexo === 'Masculino' ? (
                                            <img src={Men} alt="profile"></img>

                                        ) : (
                                            <img src={Woman} alt="profile"></img>
                                        )
                                    }
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
                                            className={`${errors.Nombre?.message ? 'input-invalid' : ''}`}
                                            value={user?.Nombre}
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
                                            value={user?.Apellido}
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
                                            value={user?.DNI}
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
                                            value={user?.Edad}
                                            onChange={(e) => onChangeNumbers(e)}
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
                                            value={user?.Correo}
                                            onChange={(e) => onChange(e)}
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
                                            value={user?.Usuario}
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
                                            value={user?.Contrasenia}
                                            onChange={(e) => onChange(e)}
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
                                            value={user?.PalabraSecreta}
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
                                                value={user?.Sexo}
                                                onChange={(e) => onChange(e)}
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
                                            value={user?.Especialidad}
                                            onChange={(e) => onChange(e)}
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
                                            value={user?.Colegiatura}
                                            onChange={(e) => onChange(e)}
                                        ></input>
                                        <div className="error-message">{errors.Colegiatura?.message}</div>
                                    </div>
                                    <div className="button__content">
                                        <button type="submit" className="button"> Editar</button>
                                    </div>
                                </form>
                            </div>

                        </section>
                    </section>
                )
            }
        </Fragment >
    );
}

export default Perfil;