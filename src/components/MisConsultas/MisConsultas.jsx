import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import { addConsultationSelected, consultationsDoctor, pendingQueryList } from "../../redux/consultationDucks";
import { getInfoUser } from "../../redux/userDucks";
import Navbar from "../Navbar/Navbar";
import LoadingScreen from 'loading-screen-kraenau';
import styles from './_MisConsultas.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Paginator from "../Paginator/Paginator";

const MisConsultas = () => {


    //Redux
    const distpach = useDispatch();
    const consultations = useSelector(store => store.consultation.pendingQueryListSelected)
    const userInfo = useSelector(store => store.usuario.userInside)
    const loading = useSelector(store => store.global.loading);
    const history = useHistory();

    //States
    const [currentPage, setcurrentPage] = useState(1)
    const [consultationsPerPage] = useState(3);



    //For paginator
    const indexOfLastDeficit = currentPage * consultationsPerPage;
    const indexOfFirtsDeficit = indexOfLastDeficit - consultationsPerPage;
    const currentConsultations = consultations.slice(indexOfFirtsDeficit, indexOfLastDeficit);

    //Functions
    const paginate = (pageNumber) => setcurrentPage(pageNumber)

    const validConsultation = (consultation) => {
        history.push(`/validarConsulta/${consultation.id}`)
    }

    //Rendered finished
    useEffect(() => {
        // dispatch(listDeficits());
        if (userInfo === null) {
            distpach(getInfoUser())
            //dispatch(listDeficits(userInfo.id))
        } else {
            distpach(consultationsDoctor(userInfo.patientOdoctor.id))
            //console.log(userInfo.id)
        }
    }, [])

    useEffect(() => {
        if (userInfo !== null) {
            distpach(consultationsDoctor(userInfo.patientOdoctor.id))
        }

    }, [userInfo])



    return (
        <Fragment>
            {
                loading &&
                <LoadingScreen></LoadingScreen>
            }
            <Navbar></Navbar>
            <section className={`${styles.listaConsultas} flex flex-jc-c flex-ai-c`}>
                <section className={`${styles.listaConsultas__content} container`}>
                    <h2>Mis Consultas</h2>
                    {

                        consultations.length !== 0 ? (
                            <table className={`${styles.list_consultation}`}>
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Dolencia</th>
                                        <th>Paciente</th>
                                        <th>Prescripción</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        currentConsultations.map(consultation => (
                                            <tr key={consultation.id}>
                                                <td>{consultation.createdAt}</td>
                                                <td>{consultation.Dolencia}</td>
                                                <td>{consultation.Paciente}</td>
                                                <td>{consultation.Prescripcion}</td>
                                                <td><button onClick={() => validConsultation(consultation)}><i><FontAwesomeIcon icon="edit" /></i>Responder</button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        ) : (
                            <table className={`${styles.list_consultation}`}>
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Dolencia</th>
                                        <th>Estado de Consulta</th>
                                        <th>Doctor</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        <tr>
                                            <td colSpan="5" className="center">No tiene ni una consulta registrada</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        )

                    }
                    {
                        consultations !== null &&
                        <Paginator array={consultations} arrayPerPage={consultationsPerPage} onChangeValue={paginate}></Paginator>

                    }
                </section>

            </section>
        </Fragment>
    );
}

export default MisConsultas;