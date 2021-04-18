// import axios from 'axios';
// import Swal from 'sweetalert2';
import axios from 'axios';
import { showPopUpError } from '../Extras/Validations';

const initialData = {
    list: [],
    consultationRegistered: null,
    consultationDetail: null,
    consultationUpdated: null,
    consultationDeleted: '0',
    pendingQueryList: [],
    pendingQueryListSelected: [],
    consultationQOUpdated: null
}


const LIST_CONSULTATIONS_SUCCES = "LIST_CONSULTATIONS_SUCCES"
const ADD_CONSULTATIONS_SUCCESS = "ADD_CONSULTATIONS_SUCCESS"
const GET_CONSULTATIONSDETAIL_SUCCESS = "GET_CONSULTATIONSDETAIL_SUCCESS"
const DELETE_CONSULTATIONS_SUCCES = "DELETE_CONSULTATIONS_SUCCES"
const UPDATE_CONSULTATIONS_SUCCESS = "UPDATE_CONSULTATIONS_SUCCESS"
const RESET_CONSULTATIONS_REGISTERED = "RESET_CONSULTATIONS_REGISTERED"
const RESET_CONSULTATIONS_UPDATED = "RESET_CONSULTATIONS_UPDATED"
const GET_CONSULTATIONSPENDING_SUCCESS = "GET_CONSULTATIONSPENDING_SUCCESS"
const ADD_CONSULTATION_SELECTED = "ADD_CONSULTATION_SELECTED"
const GET_CONSULTATIONS_DOCTOR = "GET_CONSULTATIONS_DOCTOR"
const ADD_QUESTIONS_OBSERVATIONS = "ADD_QUESTIONS_OBSERVATIONS"


export default function consultationReducer(state = initialData, action) {
    switch (action.type) {
        case LIST_CONSULTATIONS_SUCCES:
            return {
                ...state,
                list: action.payload
            }
        case ADD_CONSULTATIONS_SUCCESS:
            return {
                ...state,
                consultationRegistered: action.payload
            }
        case GET_CONSULTATIONSDETAIL_SUCCESS:
            return {
                ...state,
                consultationDetail: action.payload
            }
        case GET_CONSULTATIONSPENDING_SUCCESS:
            return {
                ...state,
                pendingQueryList: action.payload
            }
        case GET_CONSULTATIONS_DOCTOR:
            return {
                ...state,
                pendingQueryListSelected: action.payload
            }
        case ADD_CONSULTATION_SELECTED:
            return {
                ...state,
                pendingQueryList: action.payload
            }
        case ADD_QUESTIONS_OBSERVATIONS:
            return {
                ...state,
                consultationQOUpdated: action.payload
            }
        case DELETE_CONSULTATIONS_SUCCES:
            return {
                ...state,
                consultationDeleted: action.payload.deleted,
                list: action.payload.list
            }
        case UPDATE_CONSULTATIONS_SUCCESS:
            return {
                ...state,
                consultationUpdated: action.payload
            }
        case RESET_CONSULTATIONS_REGISTERED:
            return {
                ...state,
                consultationRegistered: action.payload
            }
        case RESET_CONSULTATIONS_UPDATED:
            return {
                ...state,
                consultationUpdated: action.payload
            }
        default:
            return state
    }
}

const turnLoading = (loading, distpach) => {
    distpach({
        type: 'LOADING',
        payload: loading
    })
}


export const listConsultations = (patientOdoctorId) => async (distpach, getState) => {

    let loading = true
    try {
        distpach({
            type: 'LOADING',
            payload: loading
        })
        await axios.get(`${process.env.REACT_APP_URL_BASE_BACKEND}/patients/${patientOdoctorId}/medicalHistories/${patientOdoctorId}/medicalConsultations`, { headers: { "token": `${localStorage.getItem('token')}` } })
            .then(response => {
                if (response.data.data) {
                    distpach({
                        type: 'LIST_CONSULTATIONS_SUCCES',
                        payload: response.data.data
                    })

                    loading = false
                    distpach({
                        type: 'LOADING',
                        payload: loading
                    })
                }

            }
            )
            .catch(error => {
                console.log(error)
            })

    } catch (error) {
        console.log(error)
        loading = false
        distpach({
            type: 'LOADING',
            payload: loading
        })
    }
}




export const pendingQueryList = (doctorId) => async (distpach, getState) => {

    let loading = true
    try {
        turnLoading(loading, distpach)

        await axios.get(`${process.env.REACT_APP_URL_BASE_BACKEND}/doctors/${doctorId}/medicalConsultations`, { headers: { "token": `${localStorage.getItem('token')}` } })
            .then(response => {
                if (response.data.data) {
                    distpach({
                        type: 'GET_CONSULTATIONSPENDING_SUCCESS',
                        payload: response.data.data
                    })
                    let loading = false
                    turnLoading(loading, distpach)
                }
            })
            .catch(error => {
                console.log(error)
                let loading = false
                turnLoading(loading, distpach)
                showPopUpError()
            })

    } catch (error) {
        let loading = false
        turnLoading(loading, distpach)
        showPopUpError()
    }


}


export const consultationsDoctor = (patientOdoctorId) => async (distpach, getState) => {

    let loading = true
    try {
        turnLoading(loading, distpach)

        await axios.get(`${process.env.REACT_APP_URL_BASE_BACKEND}/doctors/${patientOdoctorId}/acceptedMedicalConsultations`, { headers: { "token": `${localStorage.getItem('token')}` } })
            .then(response => {
                if (response.data.data) {
                    distpach({
                        type: 'GET_CONSULTATIONS_DOCTOR',
                        payload: response.data.data
                    })
                    let loading = false
                    turnLoading(loading, distpach)
                }
            })
            .catch(error => {
                console.log(error)
                let loading = false
                turnLoading(loading, distpach)
                showPopUpError()
            })

    } catch (error) {
        let loading = false
        turnLoading(loading, distpach)
        showPopUpError()
    }


}

export const addConsultationPacient = (patientOdoctorId, consultation) => async (distpach, getState) => {

    let loading = true;
    try {
        distpach({
            type: 'LOADING',
            payload: loading
        })
        await axios.post(`${process.env.REACT_APP_URL_BASE_BACKEND}/patients/${patientOdoctorId}/medicalHistories/${patientOdoctorId}/medicalConsultations`,
            consultation,
            { headers: { "token": `${localStorage.getItem('token')}` } })
            .then(response => {
                if (response.data.data) {
                    distpach({
                        type: 'ADD_CONSULTATIONS_SUCCESS',
                        payload: response.data.data
                    })
                }

                loading = false
                distpach({
                    type: 'LOADING',
                    payload: loading
                })

            })
            .catch(error => {
                console.log(error)
            })

    } catch (error) {
        console.log(error)
        loading = false;
        distpach({
            type: 'LOADING',
            payload: loading
        })
    }




}

export const getConsultation = (pacientId, consultationId) => async (distpach, getState) => {
    let loading = true;
    try {
        turnLoading(loading, distpach)
        await axios.get(`${process.env.REACT_APP_URL_BASE_BACKEND}/patients/${pacientId}/medicalHistories/${pacientId}/medicalConsultations/${consultationId}`, { headers: { "token": `${localStorage.getItem('token')}` } })
            .then(response => {
                if (response.data.data) {
                    distpach({
                        type: 'GET_CONSULTATIONSDETAIL_SUCCESS',
                        payload: response.data.data
                        // response.data.data
                    })

                    loading = false
                    turnLoading(loading, distpach)
                }
            })
            .catch(error => {
                console.log(error)
                loading = false
                turnLoading(loading, distpach)
            })
    } catch (error) {
        console.log(error)
        loading = false
        turnLoading(loading, distpach)
    }

}

export const addingQuestionsAndObservations = (patientOdoctorId, consultation) => async (distpach, getState) => {
    let loading = true;
    console.log(consultation)
    try {
        turnLoading(loading, distpach)
        await axios.put(`${process.env.REACT_APP_URL_BASE_BACKEND}/doctors/${patientOdoctorId}/medicalConsultations/${consultation.id}/questions`, consultation, { headers: { "token": `${localStorage.getItem('token')}` } })
            .then(response => {
                if (response.data.data) {
                    distpach({
                        type: 'ADD_QUESTIONS_OBSERVATIONS',
                        payload: 1
                        // response.data.data
                    })

                    loading = false
                    turnLoading(loading, distpach)
                }
            })
            .catch(error => {
                console.log(error)
                loading = false
                turnLoading(loading, distpach)
            })
    } catch (error) {
        console.log(error)
        loading = false
        turnLoading(loading, distpach)
    }

}


export const addConsultationSelected = (patientOdoctorId, consultation) => async (distpach, getState) => {

    let loading = true;
    const pendingList = getState().consultation.pendingQueryList;
    try {
        turnLoading(loading, distpach)
        await axios.put(`${process.env.REACT_APP_URL_BASE_BACKEND}/doctors/${patientOdoctorId}/medicalConsultations/${consultation.id}`,
            consultation,
            { headers: { "token": `${localStorage.getItem('token')}` } })
            .then(response => {
                if (response.data.payload) {
                    distpach({
                        type: 'ADD_CONSULTATION_SELECTED',
                        payload: pendingList.filter(x => x.id !== consultation.id)
                    })
                    loading = false
                    turnLoading(loading, distpach)
                }
            })
            .catch(error => {
                console.log(error)
                loading = false;
                showPopUpError()
            })



    } catch (error) {
        console.log(error)
        loading = false;
        showPopUpError()
    }

}




export const deleteconsultation = (pacientId, consultationId) => async (distpach, getState) => {

    let loading = true;
    try {
        turnLoading(loading, distpach);

        await axios.delete(`${process.env.REACT_APP_URL_BASE_BACKEND}/patients/${pacientId}/medicalHistories/${pacientId}/medicalConsultations/${consultationId}`, { headers: { "token": `${localStorage.getItem('token')}` } })
            .then(response => {
                if (response.data.payload) {
                    distpach({
                        type: 'DELETE_CONSULTATIONS_SUCCES',
                        payload: {
                            deleted: 1,
                            list: getState().consultation.list.filter(x => x.id !== consultationId)
                        }
                    })
                    loading = false
                    turnLoading(loading, distpach)
                }
            })
            .catch(error => {
                console.log(error)
                loading = false
                turnLoading(loading, distpach)
                showPopUpError()
            })



    } catch (error) {
        console.log(error);
        loading = false;
        turnLoading(loading, distpach);
        showPopUpError();
    }


}

export const updateAnswersPacient = (patientOdoctorId, consultation) => async (distpach, getState) => {

    let loading = true;
    try {
        turnLoading(loading, distpach);
        await axios.put(`${process.env.REACT_APP_URL_BASE_BACKEND}/patients/${patientOdoctorId}/medicalHistories/${patientOdoctorId}/medicalConsultations/${consultation.id}/questions`,
            consultation, { headers: { "token": `${localStorage.getItem('token')}` } })
            .then(response => {
                if (response.data.data) {
                    distpach({
                        type: 'UPDATE_CONSULTATIONS_SUCCESS',
                        payload: 1
                    })
                    loading = false
                    turnLoading(loading, distpach)
                }
            })
            .catch(error => {
                loading = false
                turnLoading(loading, distpach)
                console.log(error)
                showPopUpError()
            })
    } catch (error) {
        console.log(error);
        loading = false
        turnLoading(loading, distpach)
        // showPopUpError()
    }


}

// //Reset states
export const resetConsultationUpdated = () => (distpach, getState) => {
    distpach({
        type: 'RESET_CONSULTATIONS_UPDATED',
        payload: null
    })
}
export const resetConsultationQOUpdated = () => (distpach, getState) => {
    distpach({
        type: 'ADD_QUESTIONS_OBSERVATIONS',
        payload: null
    })
}

export const resetAnswersUpdated = () => (distpach, getState) => {
    distpach({
        type: 'UPDATE_CONSULTATIONS_SUCCESS',
        payload: null
    })
}

