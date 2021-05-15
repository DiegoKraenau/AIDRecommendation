// import axios from 'axios';
// import Swal from 'sweetalert2';
import axios from 'axios';
import { questions } from '../Extras/seeders';
import { showPopUpError, turnLoading } from '../Extras/Validations';

const initialData = {
    list: null,
    listAnswersForo: null,
    answerRecently: null
}



const GET_QUESTIONS = "GET_QUESTIONS"
const ADD_QUESTION = "ADD_QUESTION"
const ANSWER_QUESTION = "ANSWER_QUESTION"
const GET_ANSWERS_FORO = "GET_ANSWERS_FORO"


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
                answerRecently: action.payload
            }
        case GET_ANSWERS_FORO:
            return {
                ...state,
                listAnswersForo: action.payload
            }
        default:
            return state
    }
}




export const getQuestions = () => async (distpach, getState) => {

    let loading = true
    try {
        turnLoading(loading, distpach)
        await axios.get(`${process.env.REACT_APP_URL_BASE_BACKEND}/foros`, { headers: { "token": `${localStorage.getItem('token')}` } })
            .then(response => {
                if (response.data.data) {
                    distpach({
                        type: 'GET_QUESTIONS',
                        payload: response.data.data
                    })

                    loading = false
                    turnLoading(loading, distpach)
                }
            }
            )
            .catch(error => {
                console.log(error)
            })


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
        await axios.post(`${process.env.REACT_APP_URL_BASE_BACKEND}/admin/foro`, newQuestion, { headers: { "token": `${localStorage.getItem('token')}` } })
            .then(response => {
                if (response.data.data) {
                    let arrayUpdated = getState().question.list
                    arrayUpdated.push(newQuestion)
                    console.log(arrayUpdated)
                    distpach({
                        type: 'ADD_QUESTION',
                        payload: arrayUpdated
                    })

                    loading = false
                    turnLoading(loading, distpach)
                }
            }
            )
            .catch(error => {
                console.log(error)
                loading = false
                turnLoading(loading, distpach)
                showPopUpError()
            })

    } catch (error) {
        console.log(error)
        loading = false
        turnLoading(loading, distpach)
        showPopUpError()
    }
}

export const answerQuestion = (answer) => async (distpach, getState) => {

    let loading = true
    try {
        turnLoading(loading, distpach)
        await axios.post(`${process.env.REACT_APP_URL_BASE_BACKEND}/answer`, answer, { headers: { "token": `${localStorage.getItem('token')}` } })
            .then(response => {
                if (response.data.data) {
                    distpach({
                        type: 'ANSWER_QUESTION',
                        payload: response.data.data
                    })

                    loading = false
                    turnLoading(loading, distpach)
                }

            }
            )
            .catch(error => {
                console.log(error)
                loading = false
                turnLoading(loading, distpach)
                showPopUpError()
            })


    } catch (error) {
        console.log(error)
        loading = false
        turnLoading(loading, distpach)
        showPopUpError()
    }
}

export const getAnswersForo = (foroId) => async (distpach, getState) => {

    let loading = true
    try {
        turnLoading(loading, distpach)
        await axios.get(`${process.env.REACT_APP_URL_BASE_BACKEND}/answer/foro/${foroId}`, { headers: { "token": `${localStorage.getItem('token')}` } })
            .then(response => {
                if (response.data.data) {
                    distpach({
                        type: 'GET_ANSWERS_FORO',
                        payload: response.data.data
                    })

                    loading = false
                    turnLoading(loading, distpach)
                }

            }
            )
            .catch(error => {
                console.log(error)
                loading = false
                turnLoading(loading, distpach)
                showPopUpError()
            })


    } catch (error) {
        console.log(error)
        loading = false
        turnLoading(loading, distpach)
        showPopUpError()
    }
}

export const resetAnswersQuestion = () => async (distpach, getState) => {

    distpach({
        type: 'ANSWER_QUESTION',
        payload: null
    })
}


