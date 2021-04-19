import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Fragment, useRef } from "react";
import styles from './_PreguntasConsulta.module.scss';

const PreguntasConsulta = ({ consultation, inputsPreguntas, setInputsPreguntas }) => {

    //States
    const btnAddQuestions = useRef('');


    //Functions
    const deleteQuestion = (id) => {
        setInputsPreguntas(inputsPreguntas.filter((x, i) => i !== id))
    }

    const addQuestion = () => {
        if (inputsPreguntas.length === 4 - consultation.Preguntas.length) {
            btnAddQuestions.current.style.disabled = 'disabled';
        } else {
            setInputsPreguntas([...inputsPreguntas, {
                pregunta: '',
                respuesta: ''
            }])
        }
    }


    //Validations
    const onChangeQuestions = (e, position) => {
        let newArr = [...inputsPreguntas];
        newArr[position].pregunta = e.target.value;
        setInputsPreguntas(newArr)

    }

    return (
        <div className={`${styles.questions}`}>
            <h4>Preguntas</h4>
            {
                consultation.Preguntas.length !== 0 ? (
                    consultation.Preguntas.map((question, i) => (
                        <div className={`${styles.question}`} key={i}>
                            <div className={`${styles.textArea_format} input_format`}>
                                <textarea
                                    name="Detalles"
                                    placeholder="Ingrese la pregunta"
                                    autoComplete="off"
                                    value={`${i + 1}.- ${question.pregunta}`}
                                    disabled="disable"
                                >
                                </textarea>
                            </div>
                            {
                                question.respuesta.length !== 0 &&
                                <p>Respuesta:<br></br>
                                    {question.respuesta}
                                </p>
                            }
                        </div>
                    ))
                ) : (
                    <p>No tiene preguntas por el momento</p>
                )
            }
            <Fragment>
                {
                    inputsPreguntas.length !== 0 &&
                    inputsPreguntas.map((x, i) => (
                        <div className={`${styles.input}`} style={{ marginBottom: '20px' }} key={i}>
                            <input
                                name="Question"
                                placeholder="Ingrese la pregunta"
                                autoComplete="off"
                                style={{ marginRight: '20px', float: 'left' }}
                                value={x.pregunta}
                                onChange={(e) => onChangeQuestions(e, i)}
                            ></input>
                            {
                                consultation.Estado !== 2 && (
                                    <button className="btn_plus" onClick={() => deleteQuestion(i)}><FontAwesomeIcon icon="trash-alt"></FontAwesomeIcon></button>
                                )
                            }
                        </div>

                    ))

                }
            </Fragment>
            {
                consultation.Estado !== 2 && (
                    <button className="btn_plus" ref={btnAddQuestions} onClick={() => addQuestion()}><FontAwesomeIcon icon="plus"></FontAwesomeIcon></button>
                )
            }
        </div>
    );
}

export default PreguntasConsulta;