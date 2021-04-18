import { React, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { addQuestion } from '../../redux/questionsDucks';
import '../../sass/styles.scss';
import styles from './_questionAdmin.module.scss';

const QuestionAdmin = () => {

    //States and redux
    const distpach = useDispatch()
    const { register, errors, handleSubmit } = useForm()
    const [question, setQuestion] = useState({
        question: '',
        answer: ''
    })
    //Functions
    const onSubmit = (data, e) => {


        e.target.reset()
        distpach(addQuestion(question));
        Swal.fire(
            'Buen Trabajo',
            'Registraste tu pregunta con éxito',
            'success'
        )
    }

    //Validations
    const onChange = (e) => {
        setQuestion(
            {
                ...question,
                [e.target.name]: e.target.value
            }
        )
    };


    return (
        <div className={`${styles.input} ${styles.textArea_format} input_format`}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <textarea
                    name="question"
                    placeholder="Ingrese la pregunta"
                    autoComplete="off"
                    ref={
                        register({
                            required: { value: true, message: 'Necesitas escribir el detalle' },
                            minLength: { value: 3, message: '3 letras minimas' }
                        })
                    }
                    className={`${errors.Detalles?.message ? 'input-invalid' : ''}`}
                    value={question.question}
                    onChange={(e) => onChange(e)}
                >
                </textarea>
                <div className="error-message">{errors.Detalles?.message}</div>
                <button>Preguntar</button>
            </form>
        </div>
    );
}

export default QuestionAdmin;