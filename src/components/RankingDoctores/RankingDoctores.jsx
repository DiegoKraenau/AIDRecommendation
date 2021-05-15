import { Fragment, useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import LoadingScreen from 'loading-screen-kraenau';
import { useDispatch, useSelector } from "react-redux";
import { getInfoUser } from "../../redux/userDucks";
import { getRankingDoctores } from "../../redux/doctorDucks";
import '../../sass/styles.scss';
import styles from './_rankingDoctores.module.scss';
import Paginator from "../Paginator/Paginator";

const RankingDoctores = () => {

    //Redux
    const distpach = useDispatch()
    const doctores = useSelector(store => store.doctor.listRanking)
    const userInfo = useSelector(store => store.usuario.userInside)
    const loading = useSelector(store => store.global.loading);

    //States
    const [currentPage, setcurrentPage] = useState(1)
    const [doctorsPerPage] = useState(7);

    //For paginator
    const indexOfLastDeficit = currentPage * doctorsPerPage;
    const indexOfFirtsDeficit = indexOfLastDeficit - doctorsPerPage;
    const currentDoctors = doctores?.slice(indexOfFirtsDeficit, indexOfLastDeficit);

    //Functions
    const paginate = (pageNumber) => setcurrentPage(pageNumber)

    useEffect(() => {
        // dispatch(listDeficits());
        if (userInfo === null) {
            distpach(getInfoUser())
            //dispatch(listDeficits(userInfo.id))
        } else {
            distpach(getRankingDoctores())
            //console.log(userInfo.id)
        }
    }, [])

    useEffect(() => {
        if (userInfo !== null) {
            distpach(getRankingDoctores())
        }

    }, [userInfo])


    return (
        <Fragment>
            <Navbar></Navbar>
            {
                (loading === true || doctores === null) &&
                <LoadingScreen></LoadingScreen>
            }
            <section className={`${styles.ranking} flex flex-jc-c flex-ai-c`}>
                <section className={`${styles.ranking__content} container`}>
                    <h2>Ranking Doctores</h2>
                    {

                        doctores?.length !== 0 ? (
                            <table className={`${styles.list_ranking}`}>
                                <thead>
                                    <tr>
                                        <th>Nombre Completo</th>
                                        <th>Puntaje(1 al 10)</th>
                                        <th>Nro. consultas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        currentDoctors?.map(doctor => (
                                            <tr key={doctor.id}>
                                                <td>{doctor.Nombre + ' ' + doctor.Apellido}</td>
                                                <td>{doctor.PromedioPuntuacion} puntos</td>
                                                <td>{doctor.consultas} consultas</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        ) : (
                            <table className={`${styles.list_ranking}`}>
                                <thead>
                                    <tr>
                                        <th>Nombre Completo</th>
                                        <th>Puntaje(1 al 10)</th>
                                        <th>Nro. consultas</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        <tr>
                                            <td colSpan="2" className="center">No hay calificaciones por el momento.</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        )

                    }
                    {
                        doctores !== null &&
                        <Paginator array={doctores} arrayPerPage={doctorsPerPage} onChangeValue={paginate}></Paginator>

                    }
                </section>
            </section>
        </Fragment>
    );
}

export default RankingDoctores;