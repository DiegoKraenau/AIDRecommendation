import { Fragment, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import styles from './_DetalleConsulta.module.scss';
import '../../sass/styles.scss';
import { useDispatch, useSelector } from "react-redux";
import { getInfoUser } from "../../redux/userDucks";
import { getConsultation } from "../../redux/consultationDucks";

const DetalleConsulta = () => {

    //Redux
    const distpach = useDispatch();
    const userInfo = useSelector(store => store.usuario.userInside)
    const consultationInformation = useSelector(store => store.consultation.consultationDetail)

    //States
    const [consultation, setConsultation] = useState({
        id: '',
        Fecha: '',
        Dolencia: '',
        EstaDeConsulta: '',
        DoctorNombre: '',
        Prescripcion: '',
        Observaciones: '',
        Preguntas: []
    })


    //Functions

    //Hooks
    useEffect(() => {
        if (userInfo === null) {
            distpach(getInfoUser())
        } else {
            distpach(getConsultation(userInfo.id, consultationInformation))
            // distpach(getDiseases())
        }
    }, [])

    useEffect(() => {
        if (userInfo !== null) {
            distpach(getConsultation(userInfo.id, consultationInformation))
        }
    }, [userInfo])

    useEffect(() => {
        if (consultationInformation !== null) {
            setConsultation(consultationInformation)
        }
    }, [consultationInformation])



    return (
        <Fragment>
            <Navbar></Navbar>
            <section className={`${styles.detailConsultation} flex flex-jc-c flex-ai-c`}>
                <section className={`${styles.detailConsultation__content} container`}>
                    <h2>Detalle de la Consulta</h2>
                    <div className={`${styles.detailConsultation__content__information}`}>
                        <div className={`${styles.details}`}>
                            <div className={`${styles.information}`}>
                                <h4>Fecha de Consulta:</h4>
                                <p>{consultation.Fecha}</p>
                            </div>
                            <div className={`${styles.information}`}>
                                <h4>Dolencia:</h4>
                                <p>{consultation.Dolencia}</p>
                            </div>
                            <div className={`${styles.information}`}>
                                <h4>Estado de la consulta:</h4>
                                <p>{consultation.EstadoDeConsulta}</p>
                            </div>
                            <div className={`${styles.information}`}>
                                <h4>Doctor asignado:</h4>
                                <p>{consultation.DoctorNombre}</p>
                            </div>
                            <div className={`${styles.information}`}>
                                <h4>Prescripción:</h4>
                                <p>{consultation.Prescripcion}</p>
                            </div>
                        </div>
                        <div className={`${styles.observations}`}>
                            <h4>Observaciones</h4>
                            {
                                consultation.Observaciones.length !== 0 ? (

                                    <p>{consultation.Observaciones}</p>

                                ) : (
                                    <p>No hay observaciones por el momento</p>
                                )
                            }
                        </div>
                        <div className={`${styles.questions}`}>
                            <h4>Preguntas</h4>
                            {
                                consultation.Preguntas.length !== 0 ? (
                                    consultation.Preguntas.map(question => (
                                        <div className={`${styles.question}`}>
                                            <p>{question.pregunta}</p>
                                            <div className={`${styles.textArea_format} input_format`}>
                                                <textarea
                                                    name="Detalles"
                                                    placeholder="Ingrese la respuesta"
                                                    autoComplete="off"
                                                // ref={
                                                //     register({
                                                //         required: { value: true, message: 'Necesitas escribir el detalle' },
                                                //         minLength: { value: 3, message: '3 letras minimas' }
                                                //     })
                                                // }
                                                // className={`${errors.Detalles?.message ? 'input-invalid' : ''}`}
                                                // value={HistorialMedico.Detalle}
                                                // onChange={(e) => onChangeNoChanges(e)}
                                                >
                                                </textarea>
                                                {/* <div className="error-message">{errors.Detalles?.message}</div> */}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No tiene preguntas por el momento</p>
                                )
                            }
                        </div>
                        <div className={`${styles.contenedorButton} button__content`}>
                            <button type="submit" className="button"> Registrar</button>
                        </div>
                    </div>
                </section>
            </section>
        </Fragment>
    );
}

export default DetalleConsulta;