import { Fragment, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import styles from './_DetalleConsulta.module.scss';
import '../../sass/styles.scss';
import { useDispatch, useSelector } from "react-redux";
import { getInfoUser } from "../../redux/userDucks";
import { getConsultation, updateAnswersPacient, resetAnswersUpdated, finishConsultation } from "../../redux/consultationDucks";
import { useHistory, useParams } from "react-router";
import { emptyInputs } from '../../Extras/Validations';
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const DetalleConsulta = () => {

    //Redux
    const distpach = useDispatch();
    const userInfo = useSelector(store => store.usuario.userInside)
    const consultationInformation = useSelector(store => store.consultation.consultationDetail)
    const history = useHistory();
    const consultationUpdated = useSelector(store => store.consultation.consultationUpdated)
    let { id } = useParams();//Obtain param from URL

    //States
    const [consultation, setConsultation] = useState({
        id: '',
        createdAt: '',
        Dolencia: '',
        Estado: '',
        DoctorName: '',
        Prescripcion: '',
        Observaciones: '',
        Preguntas: []
    })


    //Functions

    const endConsultation = (consultation) => {
        Swal.fire({
            title: '¿Como calificarías tu consulta?',
            icon: 'question',
            input: 'range',
            inputLabel: 'Tu puntaje nos importa',
            inputAttributes: {
                min: 0,
                max: 10,
                step: 1
            },
            inputValue: 10
        }).then((result) => {
            if (result.isConfirmed) {
                consultationInformation.Estado = 2
                consultationInformation.Puntuacion = result.value
                distpach(finishConsultation(userInfo.patientOdoctor.id, consultationInformation))
                let timerInterval
                Swal.fire({
                    title: 'Se esta finalizando la consulta',
                    html: 'Espere porfavor...',
                    timer: 4000,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                        timerInterval = setInterval(() => {
                            const content = Swal.getContent()
                            if (content) {
                                const b = content.querySelector('b')
                                if (b) {
                                    b.textContent = Swal.getTimerLeft()
                                }
                            }
                        }, 100)
                    },
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                        history.goBack()
                    }
                })
            }
        })
    }


    const updateAnswers = () => {
        let foundEmptyInputs = emptyInputs(consultation.Preguntas, 'respuesta')
        if (foundEmptyInputs) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Necesita rellenar todos los campos'
            })
        } else if (consultation.Preguntas.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No tienes nada que responder'
            })
        } else {
            // console.log(consultation)
            distpach(updateAnswersPacient(id, consultation))

        }
    }

    //Hooks
    useEffect(() => {
        if (userInfo === null) {
            distpach(getInfoUser())
        } else {
            distpach(getConsultation(userInfo.patientOdoctor.id, id))
            // distpach(getDiseases())
        }
        alert("Los medicamentos recomendados por la aplicación son una sugerencia mas no se asegura su efectiva en todos los casos en un 100% , de presentar una molestia consultar con el doctor")
    }, [])

    useEffect(() => {
        if (userInfo !== null) {
            distpach(getConsultation(userInfo.patientOdoctor.id, id))
          
        }
    }, [userInfo])

    useEffect(() => {
        if (consultationInformation !== null) {
            setConsultation(consultationInformation)
        }
    }, [consultationInformation])


    useEffect(() => {

        if (consultationUpdated === 1) {
            console.log(consultationUpdated)
            Swal.fire(
                'Buen Trabajo',
                'Respondio las preguntas exitosamente',
                'success'
            ).then((result) => {
                if (result.isConfirmed) {
                    // console.log(consultationInformation)
                    distpach(updateAnswersPacient(userInfo.patientOdoctor.id), consultationInformation)
                    distpach(resetAnswersUpdated())
                    history.push('/consultasPacientes')
                }
            })

        } else {
            distpach(resetAnswersUpdated())
        }
    }, [consultationUpdated])

    const renderState = (param) => {
        switch (param) {
            case 0:
                return (
                    <p>Pendiente</p>
                );
            case 1:
                return (
                    <p>Aceptado</p>
                );
            case 2:
                return (
                    <p>Finalizado</p>
                );
            default:
                return (
                    <p>Pendiente</p>
                );
        }
    }


    //Validations
    const onChangeAnswers = (e, position) => {
        let newArr = [...consultation.Preguntas];
        newArr[position].respuesta = e.target.value;
        setConsultation({
            ...consultation,
            Preguntas: newArr
        })

    }


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
                                <p>{consultation.createdAt}</p>
                            </div>
                            <div className={`${styles.information}`}>
                                <h4>Dolencia:</h4>
                                <p>{consultation.Dolencia}</p>
                            </div>
                            <div className={`${styles.information}`}>
                                <h4>Estado de la consulta:</h4>
                                {
                                    renderState(consultation.Estado)
                                }
                            </div>
                            <div className={`${styles.information}`}>
                                <h4>Doctor asignado:</h4>
                                {
                                    consultation.DoctorName.length !== 0 ? (
                                        <Link to={`/informaciónDoctor/${consultation.doctorId}`}>{consultation.DoctorName + ' ' + consultation.DoctorApellido}</Link>

                                    ) : (
                                        <p>Pendiente</p>
                                    )
                                }
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
                                    consultation.Preguntas.map((question, i) => (
                                        <div className={`${styles.question}`} key={i}>
                                            <p>{question.pregunta}</p>
                                            <div className={`${styles.textArea_format} input_format`}>
                                                <textarea
                                                    name="Detalles"
                                                    placeholder="Ingrese la respuesta"
                                                    autoComplete="off"
                                                    value={question.respuesta}
                                                    onChange={(e) => onChangeAnswers(e, i)}
                                                    disabled={`${consultation.Estado === 2 ? 'disable' : ''}`}
                                                >
                                                </textarea>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No tiene preguntas por el momento</p>
                                )
                            }
                        </div>
                        {
                            consultation.Estado !== 2 && (
                                <div className={`${styles.botones} flex flex-jc-c flex-ai-c`}>
                                    <div className={`${styles.contenedorButton} button__content`}>
                                        <button
                                            type="submit"
                                            className="button"
                                            onClick={() => updateAnswers()}
                                        >
                                            Responder
                                     </button>
                                    </div>
                                    {
                                        consultation.Estado === 1 && (
                                            <div className={`${styles.contenedorButton} button__content`}>
                                                <button
                                                    type="submit"
                                                    className="button"
                                                    onClick={() => endConsultation()}
                                                >
                                                    Finalizar
                                         </button>
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                </section>
            </section>
        </Fragment >
    );
}

export default DetalleConsulta;