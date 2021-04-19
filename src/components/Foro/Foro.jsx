import { Fragment, React, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import '../../sass/styles.scss';
import styles from './_foro.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { getInfoUser } from "../../redux/userDucks";
import { getQuestions } from "../../redux/questionsDucks";
import LoadinScreen from 'loading-screen-kraenau';
import QuestionAdmin from "../QuestionAdmin/QuestionAdmin";
import ListQuestions from "../ListQuestions/ListQuestions";

const Foro = () => {

    //States
    const questions = useSelector(store => store.question.list)
    const distpach = useDispatch()
    const userInfo = useSelector(store => store.usuario.userInside)
    const loading = useSelector(store => store.global.loading)

    //Hooks
    useEffect(() => {
        if (userInfo === null) {
            distpach(getInfoUser())
        } else {
            distpach(getQuestions())
        }
    }, [])

    useEffect(() => {
        if (userInfo !== null) {
            distpach(getQuestions())
        }

    }, [userInfo])

    return (
        <Fragment>
            <Navbar></Navbar>
            {
                (loading === true || questions === null) ? (
                    <LoadinScreen></LoadinScreen>
                ) : (
                    <section className={`${styles.foro}  flex flex-jc-c flex-ai-c`}>
                        <section className={`${styles.foro__content} container`}>
                            <h2>Foro de Consultas</h2>
                            <QuestionAdmin></QuestionAdmin>
                            <ListQuestions questions={questions} rol={userInfo.Rol}></ListQuestions>

                        </section>
                    </section>
                )
            }

        </Fragment>

    );
}

export default Foro;