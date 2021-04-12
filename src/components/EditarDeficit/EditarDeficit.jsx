import { Fragment, React, useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import styles from './_editarDeficit.module.scss';
import { useForm } from 'react-hook-form';
import '../../sass/styles.scss';
import LoadingScreen from 'loading-screen-kraenau';
import { useDispatch, useSelector } from 'react-redux';
import { addDeficit, getDeficit, resetDeficitUpdated, updateDeficit } from '../../redux/deficitDucks';
import { getInfoUser } from '../../redux/userDucks';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router';
import { useParams } from 'react-router-dom';


const EditarDeficit = () => {

    const { deficitId } = useParams();
    const { register, errors, handleSubmit } = useForm();
    const userInfo = useSelector(store => store.usuario.userInside)
    const deficitUpdated = useSelector(store => store.deficit.deficitUpdated)
    const dispatch = useDispatch();
    const loading = useSelector(store => store.global.loading);
    const history = useHistory();
    const deficit = useSelector(store => store.deficit.deficitDetail)


    const [HistorialMedico, setHistorialMedico] = useState({
        id:'',
        TipoDeficit: 'Enfermedad',
        Deficit: '',
        EdadSufrioEnfermedad: '',
        Cronico: 'Si',
        Detalles: ''
    })


    //Finish render and getDetailDeficit
    useEffect(() => {
        if (userInfo === null) {
            dispatch(getInfoUser())
        } else {
            dispatch(getDeficit(userInfo.patientOdoctor.id, deficitId))
        }
    }, [])


    //If userInfo finish
    useEffect(() => {
        if (userInfo !== null) {
            dispatch(getDeficit(userInfo.patientOdoctor.id, deficitId))
        }
    }, [userInfo])

    //If deficit finish
    useEffect(() => {
        if (deficit !== null) {
            setHistorialMedico(
                {
                    id:deficit.id,
                    TipoDeficit: deficit.TipoDeficit,
                    Deficit: deficit.Deficit,
                    EdadSufrioEnfermedad: deficit.EdadSufrioEnfermedad,
                    Cronico: deficit.Cronico,
                    Detalles: deficit.Detalles
                }
            )
        }
    }, [deficit])



    //When the form is completed and push Edit
    const onSubmit = (data, e) => {
        dispatch(updateDeficit(userInfo.patientOdoctor.id, HistorialMedico))
        e.target.reset()
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

    useEffect(() => {
        if (deficitUpdated !== null) {
            Swal.fire(
                'Buen Trabajo',
                'Agregó un deficit exitosamente',
                'success'
            ).then((result) => {
                if (result.isConfirmed) {
                    dispatch(resetDeficitUpdated())
                    history.push('/historialmedico')
                }
            })
        }
    }, [deficitUpdated])




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
                        <h2>Editar Deficit</h2>
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
                                        onChange={(e) => onChangeNoChanges(e)}
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
                                    value={HistorialMedico.Detalles}
                                    onChange={(e) => onChangeNoChanges(e)}
                                >
                                </textarea>
                                <div className="error-message">{errors.Detalles?.message}</div>
                            </div>
                            <div className="button__content">
                                <button type="submit" className="button"> Editar</button>
                            </div>
                        </form>
                    </div>
                </section>
            </section>
        </Fragment>
    );
}

export default EditarDeficit;