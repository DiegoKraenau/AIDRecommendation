import { Fragment, useEffect, React } from "react";
import Navbar from "../Navbar/Navbar";
import styles from './_infoDoctor.module.scss';
import '../../sass/styles.scss';
import Doctor from '../../img/doctor.svg';
import Medico from '../../img/medico.svg';
import { useDispatch, useSelector } from "react-redux";
import { getInfoUser } from "../../redux/userDucks";
import { useHistory, useParams } from "react-router";
import { getDoctorById } from "../../redux/doctorDucks";
import LoadingScreen from 'loading-screen-kraenau';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const InfoDoctor = () => {

    //Redux
    const distpach = useDispatch();
    const userInfo = useSelector(store => store.usuario.userInside)
    const doctor = useSelector(store => store.doctor.information)
    const loading = useSelector(store => store.global.loading)
    const history = useHistory();
    let { id } = useParams();//Obtain param from URL


    //Functions

    //Hooks
    useEffect(() => {
        if (userInfo === null) {
            distpach(getInfoUser())
        } else {
            distpach(getDoctorById(id))
        }
    }, [])

    useEffect(() => {
        if (userInfo !== null) {
            distpach(getDoctorById(id))
        }
    }, [userInfo])

    return (
        <Fragment>
            <Navbar></Navbar>
            {
                loading === true ? (
                    <LoadingScreen></LoadingScreen>

                ) : (
                    <section className={`${styles.informationDoctor}  flex flex-jc-c flex-ai-c`}>
                        <section className={`${styles.informationDoctor__content} container`}>
                            <h2>Detalles del Doctor</h2>
                            <div className={`${styles.doctorProfile}`}>
                                <div className={`${styles.doctorImg}`}>
                                    {
                                        doctor?.Sexo === 'Masculino' ? (
                                            <img src={Doctor} alt="imgDoctor" />
                                        ) : (
                                            <img src={Medico} alt="imgDoctor" />
                                        )
                                    }
                                    <p>{doctor?.Nombre +' ' +doctor?.Apellido}</p>
                                </div>
                            </div>
                            <div className={`${styles.details}`}>
                                <div className={`${styles.information}`}>
                                    <h4>DNI:</h4>
                                    <p>{doctor?.DNI}</p>
                                </div>
                                <div className={`${styles.information}`}>
                                    <h4>Edad:</h4>
                                    <p>{doctor?.Edad} años</p>
                                </div>
                                <div className={`${styles.information}`}>
                                    <h4>Correo:</h4>
                                    <p>{doctor?.Correo}</p>
                                </div>
                                <div className={`${styles.information}`}>
                                    <h4>Sexo:</h4>
                                    <p>{doctor?.Sexo}</p>
                                </div>
                                <div className={`${styles.information}`}>
                                    <h4>Número de Colegiatura:</h4>
                                    <p>{doctor?.Colegiatura}</p>
                                </div>
                                <div className={`${styles.information}`}>
                                    <h4>Especialidad:</h4>
                                    <p>{doctor?.Especialidad}</p>
                                </div>
                            </div>
                            <div className={`${styles.button_back_section}`}>
                                <button onClick={() => { history.goBack() }}><i><FontAwesomeIcon icon="arrow-left" /></i>Volver</button>
                            </div>
                        </section>
                    </section>

                )
            }
        </Fragment>
    );
}

export default InfoDoctor;