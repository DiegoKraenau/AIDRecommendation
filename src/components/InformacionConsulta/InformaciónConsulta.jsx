import { Fragment } from "react";
import styles from './_InformacionConsulta.module.scss';

const InformacionConsulta = ({ consultation }) => {
    return (
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
                    consultation.Estado === 0 ? (
                        <p>Pendiente</p>
                    ) : (
                        <p>Aceptado</p>
                    )
                }
            </div>
            <div className={`${styles.information}`}>
                <h4>Doctor asignado:</h4>
                <p>{consultation.DoctorName}</p>
            </div>
            <div className={`${styles.information}`}>
                <h4>Prescripción:</h4>
                <p>{consultation.Prescripcion}</p>
            </div>
        </div >
    );
}

export default InformacionConsulta;