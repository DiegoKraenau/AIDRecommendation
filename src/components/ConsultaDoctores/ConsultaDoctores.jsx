import { Fragment, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import '../../sass/styles.scss';
import styles from './_ConsultaDoctores.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import { getInfoUser } from "../../redux/userDucks";
import { addConsultationSelected, listConsultations, pendingQueryList } from "../../redux/consultationDucks";
import LoadingScreen from 'loading-screen-kraenau';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Paginator from "../Paginator/Paginator";

const ConsultaDoctores = () => {

    //Redux
    const distpach = useDispatch();
    const consultations = useSelector(store => store.consultation.pendingQueryList)
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

    const selectConsultation = (consultation) => {
        Swal.fire(
            'Buen trabajo!',
            'Seleccionaste con éxito esta consulta!',
            'success'
        ).then((result) => {
            if (result.isConfirmed) {
                distpach(addConsultationSelected(userInfo.patientOdoctor.id,consultation))
                // history.push('/historialmedico')
                console.log("ACEPTO")
            }
        })
    }

    //Rendered finished
    useEffect(() => {
        // dispatch(listDeficits());
        if (userInfo === null) {
            distpach(getInfoUser())
            //dispatch(listDeficits(userInfo.id))
        } else {
            distpach(pendingQueryList(userInfo.patientOdoctor.id))
            //console.log(userInfo.id)
        }
    }, [])

    useEffect(() => {
        if (userInfo !== null) {
            distpach(pendingQueryList(userInfo.patientOdoctor.id))
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
                    <h2>Consultas</h2>
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
                                                <td><button onClick={() => selectConsultation(consultation)}><i><FontAwesomeIcon icon="edit" /></i>Seleccionar</button></td>
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

export default ConsultaDoctores;