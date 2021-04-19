import { Fragment, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import styles from './_infoPaciente.module.scss';
import '../../sass/styles.scss';
import Men from '../../img/man.svg';
import Woman from '../../img/women.svg';
import { useDispatch, useSelector } from "react-redux";
import { getInfoUser } from "../../redux/userDucks";
import { useHistory, useParams } from "react-router";
import { getPacientId } from "../../redux/pacientDucks";
import LoadingScreen from 'loading-screen-kraenau';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const InfoPaciente = () => {

    //Redux
    const distpach = useDispatch();
    const userInfo = useSelector(store => store.usuario.userInside)
    const pacient = useSelector(store => store.pacient.information)
    const loading = useSelector(store => store.global.loading)
    const history = useHistory();
    let { id } = useParams();//Obtain param from URL


    //Functions
    const settings = {
        dots: true,
        infinite: true,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    };

    //Hooks
    useEffect(() => {
        if (userInfo === null) {
            distpach(getInfoUser())
        } else {
            distpach(getPacientId(id))
        }
    }, [])

    useEffect(() => {
        if (userInfo !== null) {
            distpach(getPacientId(id))
        }
    }, [userInfo])

    return (
        <Fragment>
            <Navbar></Navbar>
            {
                loading === true ? (
                    <LoadingScreen></LoadingScreen>

                ) : (
                    <section className={`${styles.informationPaciente}  flex flex-jc-c flex-ai-c`}>
                        <section className={`${styles.informationPaciente__content} container`}>
                            <h2>Detalles del Paciente</h2>
                            <div className={`${styles.pacienteProfile}`}>
                                <div className={`${styles.pacienteImg}`}>
                                    {
                                        pacient?.Sexo === 'Masculino' ? (
                                            <img src={Men} alt="imgMen" />
                                        ) : (
                                            <img src={Woman} alt="imgWoman" />
                                        )
                                    }
                                    <p>{pacient?.Nombre + ' '+pacient?.Apellido}</p>
                                </div>
                            </div>
                            <div className={`${styles.details}`}>
                                <div className={`${styles.information}`}>
                                    <h4>DNI:</h4>
                                    <p>{pacient?.DNI}</p>
                                </div>
                                <div className={`${styles.information}`}>
                                    <h4>Edad:</h4>
                                    <p>{pacient?.Edad} años</p>
                                </div>
                                <div className={`${styles.information}`}>
                                    <h4>Correo:</h4>
                                    <p>{pacient?.Correo}</p>
                                </div>
                                <div className={`${styles.information}`}>
                                    <h4>Sexo:</h4>
                                    <p>{pacient?.Sexo}</p>
                                </div>
                            </div>
                            <div className={`${styles.Deficits}`}>
                                <h4>Historial Médico</h4>
                                <Slider {...settings} className="slider">
                                    {
                                        pacient?.Deficits.lenght !== 0 ? (
                                            pacient?.Deficits.map(deficit => (
                                                <div className="card-container">
                                                    <div className="card">
                                                        <div className="card-information">
                                                            <p>Enfermedad: {deficit.Deficit}</p>
                                                            <br></br>
                                                            <p>Edad: {deficit.EdadSufrioEnfermedad} años</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>No tiene deficits por el momento</p>
                                        )
                                    }
                                </Slider>
                            </div>

                            <div className={`${styles.button_back_section}`}>
                                <button onClick={() => { history.goBack() }}><i><FontAwesomeIcon icon="arrow-left" /></i>Volver</button>
                            </div>
                        </section>
                    </section>

                )
            }
        </Fragment>
    )
}

export default InfoPaciente;