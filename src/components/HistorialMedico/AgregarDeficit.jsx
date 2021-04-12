import { Fragment, React, useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import styles from './_agregarDeficit.module.scss';
import { useForm } from 'react-hook-form';
import '../../sass/styles.scss';
import LoadingScreen from 'loading-screen-kraenau';
import { useDispatch, useSelector } from 'react-redux';
import { addDeficit, resetDeficitRegistered } from '../../redux/deficitDucks';
import { getInfoUser } from '../../redux/userDucks';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router';


const AgregarDeficit = () => {

    const { register, errors, handleSubmit } = useForm();
    const userInfo = useSelector(store => store.usuario.userInside)
    const deficitRegistered = useSelector(store => store.deficit.deficitRegistered)
    const dispatch = useDispatch();
    const loading = useSelector(store => store.global.loading);
    const history = useHistory();
    const [HistorialMedico, setHistorialMedico] = useState({
        TipoDeficit: 'Enfermedad',
        Deficit: '',
        EdadSufrioEnfermedad: 0,
        Cronico: 'Si',
        Detalles: ''
    })



    //Form completed
    const onSubmit = (data, e) => {
        //dispatch(addDeficit(userInfo.id, HistorialMedico))
        // console.log(HistorialMedico)
        // console.log("hola entro aqui")
        dispatch(addDeficit(userInfo.patientOdoctor.id, HistorialMedico))
        e.target.reset()
        setHistorialMedico({
            ...HistorialMedico,
            "Deficit":'',
            "EdadSufrioEnfermedad":'',
            "Detalles":''
        })
    }



    /*Validations */

    const onChange = (e) => {
        setHistorialMedico(
            {
                ...HistorialMedico,
                [e.target.name]: e.target.value.replace(/[^a-z, A-Z\s]/gi, "")
            }
        )
    };

    const onChangeNumbers = (e) => {
        setHistorialMedico(
            {
                ...HistorialMedico,
                [e.target.name]: e.target.value.replace(/[^0-9]/gi, "")
            }
        )
    }

    const onChangeNoChanges = (e) => {
        setHistorialMedico(
            {
                ...HistorialMedico,
                [e.target.name]: e.target.value
            }
        )
    }

    //After rendered
    useEffect(() => {
        if (userInfo === null) {
            dispatch(getInfoUser())
            //dispatch(listDeficits(userInfo.id))
        }
    }, [])

    useEffect(() => {
        if (deficitRegistered !== null) {
            Swal.fire(
                'Buen Trabajo',
                'Agregó un deficit exitosamente',
                'success'
            ).then((result) => {
                if (result.isConfirmed) {
                    dispatch(resetDeficitRegistered())
                    history.push('/historialmedico')
                }
            })
        }
    }, [deficitRegistered])









    return (
        <Fragment>
            {
                loading === true &&
                <LoadingScreen></LoadingScreen>
            }
            <Navbar></Navbar>
            <section className={`${styles.historialmedico} flex flex-jc-c flex-ai-c`}>
                <section className={`${styles.historialmedico__content} container`}>
                    <div className={`${styles.historialmedico__form}`}>
                        <h2>Registrar Deficit</h2>
                        <form className={`${styles.hm_form}`} onSubmit={handleSubmit(onSubmit)}>
                            <div className={`${styles.input} input_format`}>
                                <span>Tipo de déficit</span>
                                <div className="select-style">
                                    <select
                                        name="TipoDeficit"
                                        ref={
                                            register({
                                                required: { value: true, message: 'Necesitas un tipo de déficit' }
                                            })
                                        }
                                        className={`${errors.TipoDeficit?.message ? 'input-invalid' : 'select'}`}
                                        value={HistorialMedico.TipoDeficit}
                                        onChange={(e) => onChangeNoChanges(e)}
                                    >
                                        <option value="Enfermedad">Enfermedad</option>
                                        <option value="Alergia">Alergia</option>
                                    </select>
                                    <div className="arrow">&#9660;</div>
                                </div>
                                <div className="error-message">{errors.TipoDeficit?.message}</div>
                            </div>
                            <div className={`${styles.input} input_format`}>
                                <span>Nombre de Deficit</span>
                                <input
                                    name="Deficit"
                                    placeholder="Ingrese un deficit"
                                    autoComplete="off"
                                    ref={
                                        register({
                                            required: { value: true, message: 'Necesitas un deficit' },
                                            minLength: { value: 5, message: '5 letras minimas' }
                                        })
                                    }
                                    className={`${errors.Deficit?.message ? 'input-invalid' : ''}`}
                                    value={HistorialMedico.Deficit}
                                    onChange={(e) => onChange(e)}
                                ></input>
                                <div className="error-message">{errors.Deficit?.message}</div>
                            </div>
                            <div className={`${styles.input} input_format`}>
                                <span>Edad en que sufrio la enfermedad</span>
                                <input
                                    name="EdadSufrioEnfermedad"
                                    placeholder="Ingrese la edad que sufrio la enfermedad"
                                    autoComplete="off"
                                    ref={
                                        register({
                                            required: { value: true, message: 'Necesitas una edad donde sugrio la enfermedad' },
                                            minLength: { value: 1, message: '1 número minimo' }
                                        })
                                    }
                                    className={`${errors.EdadSufrioEnfermedad?.message ? 'input-invalid' : ''}`}
                                    value={HistorialMedico.EdadSufrioEnfermedad}
                                    onChange={(e) => onChangeNumbers(e)}
                                ></input>
                                <div className="error-message">{errors.EdadSufrioEnfermedad?.message}</div>
                            </div>
                            <div className={`${styles.input} input_format`}>
                                <span>Cronico</span>
                                <div className="select-style">
                                    <select
                                        name="Cronico"
                                        ref={
                                            register({
                                                required: { value: true, message: 'Necesitas determinar si fue cronico' }
                                            })
                                        }
                                        className={`${errors.Cronico?.message ? 'input-invalid' : 'select'}`}
                                        value={HistorialMedico.Cronico}
                                        onChange={(e)=>onChangeNoChanges(e)}
                                    >
                                        <option value="Si">Si</option>
                                        <option value="No">No</option>
                                    </select>
                                    <div className="arrow">&#9660;</div>
                                </div>
                                <div className="error-message">{errors.Cronico?.message}</div>
                            </div>
                            <div className={`${styles.input} ${styles.textArea_format} input_format`}>
                                <span>Detalles</span>
                                <textarea
                                    name="Detalles"
                                    placeholder="Ingrese el detalle"
                                    autoComplete="off"
                                    ref={
                                        register({
                                            required: { value: true, message: 'Necesitas escribir el detalle' },
                                            minLength: { value: 3, message: '3 letras minimas' }
                                        })
                                    }
                                    className={`${errors.Detalles?.message ? 'input-invalid' : ''}`}
                                    value={HistorialMedico.Detalle}
                                    onChange={(e) => onChangeNoChanges(e)}
                                >
                                </textarea>
                                <div className="error-message">{errors.Detalles?.message}</div>
                            </div>
                            <div className="button__content">
                                <button type="submit" className="button"> Registrar</button>
                            </div>
                        </form>
                    </div>
                </section>
            </section>
        </Fragment>
    );
}

export default AgregarDeficit;