import { React, useEffect, useState } from 'react';
import '../../sass/styles.scss';
import styles from './_verRespuestas.module.scss';
import LoadingScreen from 'loading-screen-kraenau';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../Navbar/Navbar';
import { getInfoUser } from '../../redux/userDucks';
import { useHistory, useParams } from 'react-router';
import { answerQuestion, getAnswersForo, resetAnswersQuestion } from '../../redux/questionsDucks';
import Paginator from '../Paginator/Paginator';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';


const VerRespuestas = () => {

    const distpach = useDispatch();
    const loading = useSelector(store => store.global.loading);
    const listaRespuestas = useSelector(store => store.question.listAnswersForo);
    const userInfo = useSelector(store => store.usuario.userInside)
    let { id } = useParams();//Obtain param from URL
    const { register, errors, handleSubmit } = useForm();
    const history = useHistory();

    //States
    const [currentPage, setcurrentPage] = useState(1)
    const [answersPerPage] = useState(5);

    //For paginator
    const indexOfLastDeficit = currentPage * answersPerPage;
    const indexOfFirtsDeficit = indexOfLastDeficit - answersPerPage;
    const currentAnswers = listaRespuestas?.slice(indexOfFirtsDeficit, indexOfLastDeficit);

    //Functions
    const paginate = (pageNumber) => setcurrentPage(pageNumber)
    const [answer, setAnswer] = useState({
        text: '',
        foroId: id
    })

    const onSubmit = (data, e) => {
        e.target.reset()
        distpach(answerQuestion(answer));
        Swal.fire(
            'Buen Trabajo',
            'Registraste tu respuesta con éxito',
            'success'
        ).then((result) => {
            if (result.isConfirmed) {
                distpach(resetAnswersQuestion())
                history.goBack();
            }
        })
    }

    //Validations
    const onChange = (e) => {
        setAnswer(
            {
                ...answer,
                [e.target.name]: e.target.value
            }
        )
    };


    //Rendered finished
    useEffect(() => {
        // dispatch(listDeficits());
        if (userInfo === null) {
            distpach(getInfoUser())
            //dispatch(listDeficits(userInfo.id))
        } else {
            distpach(getAnswersForo(id))
            //console.log(userInfo.id)
        }
    }, [])


    //User info with token
    useEffect(() => {
        if (userInfo !== null) {
            distpach(getAnswersForo(id))
        }
    }, [userInfo])

    return (
        <>
            <Navbar></Navbar>
            {
                (loading === true || listaRespuestas === null) &&
                <LoadingScreen></LoadingScreen>
            }
            {
                listaRespuestas !== null && (
                    <section className={`${styles.listaPreguntas} flex flex-jc-c flex-ai-c`}>
                        <section className={`${styles.listaPreguntas__content} container`}>
                            <h2>Respuestas</h2>
                            {
                                userInfo.Rol === 2 && (
                                    <div className={`${styles.input} ${styles.textArea_format} input_format`}>
                                        <form onSubmit={handleSubmit(onSubmit)}>
                                            <textarea
                                                name="text"
                                                placeholder="Ingrese la respuesta"
                                                autoComplete="off"
                                                ref={
                                                    register({
                                                        required: { value: true, message: 'Necesitas escribir la respuesta' },
                                                        minLength: { value: 3, message: '3 letras minimas' }
                                                    })
                                                }
                                                className={`${errors.text?.message ? 'input-invalid' : ''}`}
                                                value={answer.text}
                                                onChange={(e) => onChange(e)}
                                            >
                                            </textarea>
                                            <div className="error-message">{errors.text?.message}</div>
                                            <button>Responder</button>
                                        </form>
                                    </div>
                                )
                            }
                            {
                                (listaRespuestas.length !== 0) ? (
                                    currentAnswers.map((respuesta, i) => (
                                        <div className={`${styles.respuesta}`} key={respuesta.id}>
                                            <p>Respuesta Nro. {i + 1}</p>
                                            <p>{respuesta.text}</p>
                                        </div>
                                    ))
                                ) : (
                                    <p>No hay respuestas por el momento.</p>
                                )
                            }
                        </section>
                        {
                            listaRespuestas !== null &&
                            <Paginator array={listaRespuestas} arrayPerPage={answersPerPage} onChangeValue={paginate}></Paginator>

                        }
                    </section>
                )
            }


        </>
    );
}

export default VerRespuestas;