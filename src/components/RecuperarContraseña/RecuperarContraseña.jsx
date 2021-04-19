import { React, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import '../../sass/styles.scss';
import styles from './_recuperarContraseña.module.scss';
import Secure from '../../img/secure.svg';
import abslogin from '../../img/abslogin.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { getPassword, resetPasswordForget } from '../../redux/userDucks';
import Swal from 'sweetalert2';

const RecuperarContraseña = () => {

    const { register, errors, handleSubmit } = useForm();
    const [palabraSecreta, setPalabraSecreta] = useState('')
    const passwordForget = useSelector(store => store.usuario.passwordForget)
    const history = useHistory()
    const distpach = useDispatch()


    const onChange = (e) => {
        setPalabraSecreta(
            e.target.value
        )
    };

    const returnLogin = () => {
        history.goBack()
    }

    const onSubmit = (data, e) => {
        console.log(data)
        validarKeyWord()
    }

    const validarKeyWord = () => {
        distpach(getPassword(palabraSecreta))
    }

    useEffect(() => {
        if (passwordForget !== null) {
            Swal.fire(
                'Se encontró tu contraseña!',
                `Tu contraseña es: ${passwordForget}`,
                'success'
            ).then((result) => {
                if (result.isConfirmed) {
                    history.goBack()
                    distpach(resetPasswordForget())
                }
            })
        }
    }, [passwordForget])


    return (
        <section className={`${styles.forgetpassword} flex flex-jc-c flex-ai-c`}>
            <img className={`${styles.abs_img}`} src={abslogin} alt="abs"></img>
            <i onClick={() => { returnLogin() }}><FontAwesomeIcon icon="arrow-left" /></i>
            <section className={`${styles.forgetpassword__content} container`}>
                <h2>Recupera  tu Contraseña</h2>
                <div className={`${styles.secure_img}`}>
                    <img src={Secure} alt="segurar"></img>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className={`${styles.input} input_format`}>
                        <span>Palabra Secreta</span>
                        <input
                            name="palabraSecreta"
                            placeholder="Ingrese su palabra secreta"
                            autoComplete="off"
                            ref={
                                register({
                                    required: { value: true, message: 'Necesitas una palabra secreta' },
                                    minLength: { value: 3, message: '3 letras minimas' }
                                })
                            }
                            className={`${errors.palabraSecreta?.message ? 'input-invalid' : ''}`}
                            value={palabraSecreta}
                            onChange={(e) => onChange(e)}
                        ></input>
                        <div className="error-message">{errors.palabraSecreta?.message}</div>
                    </div>
                    <button type="submit">Validar</button>
                </form>
            </section>
        </section>
    );
}

export default RecuperarContraseña;