import { React, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import LoadingScreen from 'loading-screen-kraenau';
import axios from 'axios';
import { showPopUpError, turnLoading } from '../../Extras/Validations';
import '../../sass/styles.scss';
import styles from './_listaDoctores.module.scss';
import Paginator from '../Paginator/Paginator';

const ListaDoctores = () => {

    //Redux
    const distpach = useDispatch();
    const loading = useSelector(store => store.global.loading);
    const [listaPacientes, setListaPacientes] = useState(null);
    //States
    const [currentPage, setcurrentPage] = useState(1)
    const [doctorsPerPage] = useState(7);

    //For paginator
    const indexOfLastDeficit = currentPage * doctorsPerPage;
    const indexOfFirtsDeficit = indexOfLastDeficit - doctorsPerPage;
    const currentDoctors = listaPacientes?.slice(indexOfFirtsDeficit, indexOfLastDeficit);

    //Functions
    const paginate = (pageNumber) => setcurrentPage(pageNumber)


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_URL_BASE_BACKEND}/doctors`, { headers: { "token": `${localStorage.getItem('token')}` } })
            .then(response => {
                if (response.data.data) {
                    setListaPacientes(response.data.data);
                    turnLoading(false, distpach)
                }

            }
            )
            .catch(error => {
                turnLoading(false, distpach)
                showPopUpError()
                console.log(error)
            })
    }, [])

    return (
        <>
            <Navbar></Navbar>
            {
                (loading === true || listaPacientes === null) &&
                <LoadingScreen></LoadingScreen>
            }
            <section className={`${styles.ranking} flex flex-jc-c flex-ai-c`}>
                <section className={`${styles.ranking__content} container`}>
                    <h2>Lista Doctores</h2>
                    {

                        listaPacientes?.length !== 0 ? (
                            <table className={`${styles.list_ranking}`}>
                                <thead>
                                    <tr>
                                        <th>DNI</th>
                                        <th>Nombre completo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        currentDoctors?.map(doctor => (
                                            <tr key={doctor.id}>
                                                <td>{doctor.DNI}</td>
                                                <td>{doctor.Nombre + ' ' + doctor.Apellido}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        ) : (
                            <table className={`${styles.list_ranking}`}>
                                <thead>
                                    <tr>
                                        <th>DNI</th>
                                        <th>Nombre completo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        <tr>
                                            <td colSpan="2" className="center">No hay doctores por el momento</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        )

                    }
                    {
                        listaPacientes !== null &&
                        <Paginator array={listaPacientes} arrayPerPage={doctorsPerPage} onChangeValue={paginate}></Paginator>

                    }
                </section>
            </section>
        </>
    );

}

export default ListaDoctores;