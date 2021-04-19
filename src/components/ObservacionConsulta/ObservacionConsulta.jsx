import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, React } from "react";
import { useForm } from "react-hook-form";
import styles from './_ObservacionConsulta.module.scss';
import '../../sass/styles.scss';

const ObservacionConsulta = ({ consultation, inputObservation, setInputObservation, textObservation, setTextObservation }) => {

    //States
    const { register } = useForm()


    //Functions
    const addObservation = () => {
        setInputObservation(!inputObservation)
    }

    //Validations
    const onChange = (e) => {
        setTextObservation(e.target.value)
    };




    return (
        <div className={`${styles.observations}`}>
            <h4>Observaciones</h4>
            {
                consultation.Observaciones.length !== 0 ? (
                    <p>{consultation.Observaciones}</p>
                ) : (
                    <Fragment>
                        {
                            inputObservation ? (
                                <div className={`${styles.input}`}>
                                    <input
                                        name="Observaciones"
                                        placeholder="Ingrese la observación"
                                        autoComplete="off"
                                        style={{ width: '100%' }}
                                        ref={
                                            register({
                                                required: { value: true, message: 'Necesitas ingresar la observación' },
                                                minLength: { value: 3, message: '3 letras minimas' }
                                            })
                                        }
                                        value={textObservation}
                                        onChange={(e) => onChange(e)}
                                    ></input>
                                </div>
                            ) : (
                                <p>No tiene observaciones por el momento</p>
                            )
                        }
                        {
                            consultation.Estado !==2 && (
                                <button className="btn_plus" onClick={() => addObservation()}><FontAwesomeIcon icon={`${inputObservation ? 'trash-alt' : 'plus'}`}></FontAwesomeIcon></button>

                            )
                        }
                    </Fragment>
                )
            }
        </div>
    );
}

export default ObservacionConsulta;