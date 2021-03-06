import { Fragment, React, useState } from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { answerQuestion } from '../../redux/questionsDucks';
import '../../sass/styles.scss';
import Paginator from '../Paginator/Paginator';
import styles from './_listQuestions.module.scss';

const ListQuestions = ({ questions, rol }) => {

    //States
    const distpach = useDispatch()
    const [currentPage, setcurrentPage] = useState(1)
    const [questionPerPage] = useState(3);
    const { register, errors, handleSubmit } = useForm()

    //Functions
    const paginate = (pageNumber) => setcurrentPage(pageNumber)

    const onSubmit = (question) => (data, e) => {

        let questionAnswered = { ...question, answer: data.answer }
        distpach(answerQuestion(questionAnswered, question.id))
        e.target.reset()
        Swal.fire(
            'Buen Trabajo',
            'Registraste tu pregunta con éxito',
            'success'
        )
    }


    //For paginator
    const indexOfLastDeficit = currentPage * questionPerPage;
    const indexOfFirtsDeficit = indexOfLastDeficit - questionPerPage;
    const currentQuestions = questions?.slice(indexOfFirtsDeficit, indexOfLastDeficit);




    return (
        <div className={`${styles.list_questions}`}>
            {
                questions?.length === 0 ? (
                    <p className="message_center">No hay preguntas por el momento.</p>
                ) : (
                    currentQuestions?.map((question, i) => (
                        <div className={`${styles.answer_question}`} key={i}>
                            <p>{question?.question}</p>
                            {
                                rol === 1 ? (
                                    <Fragment>
                                        <p className={`${styles.label_answer}`}>Respuesta:</p>
                                        {
                                            question?.answers.length === 0 ? (
                                                <p>No hay respuestas por el momento.</p>
                                            ) : (
                                                <Link to={`/respuestas/${question.id}`} >Ver respuestas</Link>
                                            )
                                        }
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                    {/* <p className={`${styles.label_answer}`}>Respuesta:</p>
                                    <p>{question.answer}</p> */}
                                    <Link to={`/respuestas/${question.id}`} >Ver respuestas</Link>
                                </Fragment>

                                )
                            }
                        </div>
                    ))
                )

            }
            {
                questions !== null &&
                <Paginator array={questions} arrayPerPage={questionPerPage} onChangeValue={paginate}></Paginator>

            }
        </div >
    );
}

export default ListQuestions;