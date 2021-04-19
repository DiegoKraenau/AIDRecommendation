import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import styles from './_ListaConsultas.module.scss';
import '../../sass/styles.scss';
import Paginator from "../Paginator/Paginator";
import { useDispatch, useSelector } from "react-redux";
import { getInfoUser } from "../../redux/userDucks";
import { deleteconsultation, listConsultations } from "../../redux/consultationDucks";
import LoadingScreen from 'loading-screen-kraenau';
import { useHistory } from "react-router";
import Swal from "sweetalert2";

const ListaConsultas = () => {

    //Redux
    const distpach = useDispatch();
    const consultations = useSelector(store => store.consultation.list)
    const userInfo = useSelector(store => store.usuario.userInside)
    const loading = useSelector(store => store.global.loading);
    const history = useHistory();

    //States
    const [currentPage, setcurrentPage] = useState(1)
    const [consultationsPerPage] = useState(7);



    //For paginator
    const indexOfLastDeficit = currentPage * consultationsPerPage;
    const indexOfFirtsDeficit = indexOfLastDeficit - consultationsPerPage;
    const currentConsultations = consultations.slice(indexOfFirtsDeficit, indexOfLastDeficit);

    //Functions
    const paginate = (pageNumber) => setcurrentPage(pageNumber)

    const changeToDetails = (id) => {
        history.push(`/detalleConsulta/${id}`)
    }

    const deleteConsultation = (consultationId) => {
        Swal.fire({
            title: '¿Estas seguro de eliminar este Deficit?',
            text: "No podras revertirlo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4B4BE0',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                distpach(deleteconsultation(userInfo.patientOdoctor.id, consultationId))
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    const addConsultation = () => {
        history.push('/agregarConsulta')
    }

    const renderState = (param) => {
        switch (param) {
            case 0:
                return (
                    <td>Pendiente</td>
                );
            case 1:
                return (
                    <td>Aceptado</td>
                );
            case 2:
                return (
                    <td>Finalizado</td>
                );
            default:
                return (
                    <td>Pendiente</td>
                );
        }
    }

    //Rendered finished
    useEffect(() => {
        // dispatch(listDeficits());
        if (userInfo === null) {
            distpach(getInfoUser())
            //dispatch(listDeficits(userInfo.id))
        } else {
            distpach(listConsultations(userInfo.patientOdoctor.id))
            //console.log(userInfo.id)
        }
    }, [])

    useEffect(() => {
        if (userInfo !== null) {
            distpach(listConsultations(userInfo.patientOdoctor.id))
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
                    <div className={`${styles.button_add_section}`}>
                        <button onClick={() => addConsultation()}><i><FontAwesomeIcon icon="plus-square" /></i>Registrar Consulta</button>
                    </div>

                    {

                        consultations.length !== 0 ? (
                            <table className={`${styles.list_consultation}`}>
                                <thead>
                                    <tr>
                                        <th>Fecha</th>
                                        <th>Dolencia</th>
                                        <th>Estado</th>
                                        <th>Doctor</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        currentConsultations.map(consultation => (
                                            <tr key={consultation.id}>
                                                <td>{consultation.createdAt}</td>
                                                <td>{consultation.Dolencia}</td>
                                                {
                                                    renderState(consultation.Estado)
                                                }

                                                {
                                                    consultation.doctorId === 1 ? (
                                                        <td>Pendiente</td>
                                                    ) : (
                                                        <td>{consultation.DoctorName + ' ' + consultation.DoctorApellido}</td>
                                                    )
                                                }
                                                <td><button onClick={() => changeToDetails(consultation.id)}><i><FontAwesomeIcon icon="edit" /></i>Detalles</button></td>
                                                <td><button onClick={() => deleteConsultation(consultation.id)}><i><FontAwesomeIcon icon="trash-alt" /></i>Eliminar</button></td>
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
                                            <td colSpan="6" className="center">No tiene ni una consulta registrada.</td>
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

export default ListaConsultas;