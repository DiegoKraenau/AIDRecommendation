import { Fragment, React, useState } from "react";
import Navbar from "../Navbar/Navbar";
import '../../sass/styles.scss';
import styles from './_recomendaciones.module.scss';
import Distancing from '../../img/distancing.svg';


const Recomendaciones = () => {

    const [recommendations] = useState([
        {
            id: 1,
            text: 'Lávate las manos con frecuencia. Usa agua y jabón o un desinfectante de manos a base de alcohol.'
        },
        {
            id: 2,
            text: 'Mantén una distancia de seguridad con personas que tosan o estornuden.'
        },
        {
            id: 3,
            text: 'Utiliza mascarilla cuando no sea posible mantener el distanciamiento físico.'
        },
        {
            id: 4,
            text: 'No te toques los ojos, la nariz ni la boca.'
        },
        {
            id: 5,
            text: 'Cuando tosas o estornudes, cúbrete la nariz y la boca con el codo flexionado o con un pañuelo.'
        },
        {
            id: 6,
            text: 'Si no te encuentras bien, quédate en casa.'
        },
        {
            id: 7,
            text: 'En caso de que tengas fiebre, tos o dificultad para respirar, busca atención médica.'
        }
    ])


    return (
        <Fragment>
            <Navbar></Navbar>
            <section className={`${styles.recommendations} flex flex-jc-c flex-ai-c`}>
                <section className={`${styles.recommendations__content} container`}>
                    <h2>Recomendaciones contra el COVID 19</h2>
                    <div className={`${styles.list_recommendations}`}>
                        {
                            recommendations.map((x, i) => (
                                <div className="recommendation">
                                    <p>{i + 1 + '.- ' + x.text}</p>
                                </div>
                            ))
                        }
                    </div>
                    <div className={`${styles.distancing_img}`}>
                        <img src={Distancing} alt="distanciamiento"/>
                    </div>
                </section>
            </section>
        </Fragment>
    );
}

export default Recomendaciones;