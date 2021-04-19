// import axios from 'axios';
// import Swal from 'sweetalert2';
import { questions } from '../Extras/seeders';
import { turnLoading } from '../Extras/Validations';

const initialData = {
    list: null
}



const GET_QUESTIONS = "GET_QUESTIONS"
const ADD_QUESTION = "ADD_QUESTION"
const ANSWER_QUESTION = "ANSWER_QUESTION"


export default function questionReducer(state = initialData, action) {
    switch (action.type) {
        case GET_QUESTIONS:
            return {
                ...state,
                list: action.payload
            }
        case ADD_QUESTION:
            return {
                ...state,
                list: action.payload
            }
        case ANSWER_QUESTION:
            return {
                ...state,
                list: action.payload
            }
        default:
            return state
    }
}




export const getQuestions = () => async (distpach, getState) => {

    let loading = true
    try {
        turnLoading(loading, distpach)
        // await axios.get(`${process.env.REACT_APP_URL_BASE_BACKEND}/patients/${patientOdoctorId}/medicalHistories/${patientOdoctorId}/medicalConsultations`, { headers: { "token": `${localStorage.getItem('token')}` } })
        //     .then(response => {
        //         if (response.data.data) {
        //             distpach({
        //                 type: 'LIST_CONSULTATIONS_SUCCES',
        //                 payload: response.data.data
        //             })

        //             loading = false
        //             distpach({
        //                 type: 'LOADING',
        //                 payload: loading
        //             })
        //         }

        //     }
        //     )
        //     .catch(error => {
        //         console.log(error)
        //     })
        distpach({
            type: 'GET_QUESTIONS',
            payload: questions
        })

        loading = false
        turnLoading(loading, distpach)

    } catch (error) {
        console.log(error)
        loading = false
        turnLoading(loading, distpach)
    }
}

export const addQuestion = (newQuestion) => async (distpach, getState) => {

    let loading = true
    try {
        turnLoading(loading, distpach)
        // await axios.get(`${process.env.REACT_APP_URL_BASE_BACKEND}/patients/${patientOdoctorId}/medicalHistories/${patientOdoctorId}/medicalConsultations`, { headers: { "token": `${localStorage.getItem('token')}` } })
        //     .then(response => {
        //         if (response.data.data) {
        //             distpach({
        //                 type: 'LIST_CONSULTATIONS_SUCCES',
        //                 payload: response.data.data
        //             })

        //             loading = false
        //             distpach({
        //                 type: 'LOADING',
        //                 payload: loading
        //             })
        //         }

        //     }
        //     )
        //     .catch(error => {
        //         console.log(error)
        //     })
        let arrayUpdated = getState().question.list
        arrayUpdated.push(newQuestion)
        console.log(arrayUpdated)
        distpach({
            type: 'ADD_QUESTION',
            payload: arrayUpdated
        })

        loading = false
        turnLoading(loading, distpach)

    } catch (error) {
        console.log(error)
        loading = false
        turnLoading(loading, distpach)
    }
}

export const answerQuestion = (question, doctorId) => async (distpach, getState) => {

    let loading = true
    try {
        turnLoading(loading, distpach)
        // await axios.get(`${process.env.REACT_APP_URL_BASE_BACKEND}/patients/${patientOdoctorId}/medicalHistories/${patientOdoctorId}/medicalConsultations`, { headers: { "token": `${localStorage.getItem('token')}` } })
        //     .then(response => {
        //         if (response.data.data) {
        //             distpach({
        //                 type: 'LIST_CONSULTATIONS_SUCCES',
        //                 payload: response.data.data
        //             })

        //             loading = false
        //             distpach({
        //                 type: 'LOADING',
        //                 payload: loading
        //             })
        //         }

        //     }
        //     )
        //     .catch(error => {
        //         console.log(error)
        //     })
        let updatedList = [...getState().question.list]
        updatedList.forEach((element, index) => {
            if (element.id === question.id) {
                updatedList[index] = question;
            }
        });
        distpach({
            type: 'ANSWER_QUESTION',
            payload: updatedList
        })

        loading = false
        turnLoading(loading, distpach)

    } catch (error) {
        console.log(error)
        loading = false
        turnLoading(loading, distpach)
    }
}




