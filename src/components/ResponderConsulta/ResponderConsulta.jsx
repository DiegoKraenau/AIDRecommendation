import { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getConsultation } from "../../redux/consultationDucks";
import { getInfoUser } from "../../redux/userDucks";
import Navbar from "../Navbar/Navbar";
import styles from './_ResponderConsulta.module.scss';
import '../../sass/styles.scss';
import Swal from "sweetalert2";
import InformacionConsulta from "../InformacionConsulta/InformaciónConsulta";
import ObservacionConsulta from "../ObservacionConsulta/ObservacionConsulta";
import PreguntasConsulta from "../PreguntasConsulta/PreguntasConsulta";

const ResponderConsulta = () => {


    //Redux
    const distpach = useDispatch();
    const userInfo = useSelector(store => store.usuario.userInside)
    const consultationInformation = useSelector(store => store.consultation.consultationDetail)
    const [inputsPreguntas, setInputsPreguntas] = useState([])


    //States
    const [consultation, setConsultation] = useState({
        id: '',
        Fecha: '',
        Dolencia: '',
        EstaDeConsulta: '',
        DoctorNombre: '',
        Prescripcion: '',
        Observaciones: '',
        Preguntas: [],
        updated: false
    })
    const [inputObservation, setInputObservation] = useState(false)
    const [textObservation, setTextObservation] = useState('')




    const updateConsultation = () => {

        let found = false;
        inputsPreguntas.map(x => {
            if (x.pregunta.length === 0) {
                found = true;
            }
        })

        if (inputObservation === true && textObservation.length === 0 || found === true) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Necesitas completas los campos'
            })
        } else {
            let newQuestions = [...consultation.Preguntas];
            setConsultation({
                ...consultation,
                Observaciones: textObservation.length !== 0 ? textObservation : consultation.Observaciones,
                Preguntas: newQuestions.concat(inputsPreguntas),
                updated: true
            })

            setInputsPreguntas([])
        }


    }

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

    useEffect(() => {
        if (consultation.updated === true) {
            console.log(consultation)
        }
    }, [consultation])




    //Validations





    return (
        <Fragment>
            <Navbar></Navbar>
            <section className={`${styles.detailConsultation} flex flex-jc-c flex-ai-c`}>
                <section className={`${styles.detailConsultation__content} container`}>
                    <h2>Detalle de la Consulta</h2>
                    <div className={`${styles.detailConsultation__content__information}`}>
                        <InformacionConsulta consultation={consultation}></InformacionConsulta>
                        <ObservacionConsulta consultation={consultation} inputObservation={inputObservation} setInputObservation={setInputObservation} textObservation={textObservation} setTextObservation={setTextObservation} ></ObservacionConsulta>
                        <PreguntasConsulta consultation={consultation} inputsPreguntas={inputsPreguntas} setInputsPreguntas={setInputsPreguntas}></PreguntasConsulta>
                        <div className={`${styles.contenedorButton} button__content`}>
                            <button type="submit" onClick={() => updateConsultation()} className="button"> Enviar</button>
                        </div>
                    </div>
                </section>
            </section>
        </Fragment>
    );
}

export default ResponderConsulta;