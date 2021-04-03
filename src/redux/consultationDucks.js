// import axios from 'axios';
// import Swal from 'sweetalert2';
import { consultationsSeeders } from '../Extras/seeders';

const initialData = {
    list: [],
    consultationRegistered: null,
    consultationDetail: null,
    consultationUpdated: null,
    consultationDeleted: '0',
    pendingQueryList: [],
    pendingQueryListSelected: []
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
        case ADD_CONSULTATION_SELECTED:
            return {
                ...state,
                pendingQueryList: action.payload
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


export const listConsultations = (userId) => async (distpach, getState) => {

    let loading = true
    try {
        console.log("ENTRO A CONSULTATIONS")
        distpach({
            type: 'LOADING',
            payload: loading
        })

        // await axios.get(`http://localhost:5000/api/patients/${userId}/medicalHistories/1/consultations`, { headers: { "token": `${localStorage.getItem('token')}` } })
        //     .then(response => {
        //         if (response.data.data) {
        //             distpach({
        //                 type: 'LIST_consultationS_SUCCES',
        //                 payload: response.data.data
        //             })
        //         } else {
        //             distpach({
        //                 type: 'LIST_consultationS_SUCCES',
        //                 payload: []
        //             })
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         distpach({
        //             type: 'LIST_consultationS_SUCCES',
        //             payload: []
        //         })
        //     })
        distpach({
            type: 'LIST_CONSULTATIONS_SUCCES',
            payload: consultationsSeeders
        })

    } catch (error) {
        console.log(error)
    }

    loading = false
    distpach({
        type: 'LOADING',
        payload: loading
    })
}



export const pendingQueryList = () => async (distpach, getState) => {

    let loading = true
    try {
        distpach({
            type: 'LOADING',
            payload: loading
        })

        // await axios.get(`http://localhost:5000/api/patients/${userId}/medicalHistories/1/consultations`, { headers: { "token": `${localStorage.getItem('token')}` } })
        //     .then(response => {
        //         if (response.data.data) {
        //             distpach({
        //                 type: 'LIST_consultationS_SUCCES',
        //                 payload: response.data.data
        //             })
        //         } else {
        //             distpach({
        //                 type: 'LIST_consultationS_SUCCES',
        //                 payload: []
        //             })
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         distpach({
        //             type: 'LIST_consultationS_SUCCES',
        //             payload: []
        //         })
        //     })
        distpach({
            type: 'GET_CONSULTATIONSPENDING_SUCCESS',
            payload: consultationsSeeders
        })

    } catch (error) {
        console.log(error)
    }

    loading = false
    distpach({
        type: 'LOADING',
        payload: loading
    })
}

// export const addconsultation = (userId, consultation) => async (distpach, getState) => {

//     let loading = true;
//     let added = false;
//     try {
//         distpach({
//             type: 'LOADING',
//             payload: loading
//         })
//         await axios.post(`http://localhost:5000/api/patients/${userId}/medicalHistories/1/consultations`,
//             consultation,
//             { headers: { "token": `${localStorage.getItem('token')}` } })
//             .then(response => {
//                 if (response.data.payload) {
//                     added = true;
//                     distpach({
//                         type: 'ADD_consultation_SUCCESS',
//                         payload: response.data.payload
//                     })
//                 }

//                 loading = false
//                 distpach({
//                     type: 'LOADING',
//                     payload: loading
//                 })

//             })
//             .catch(error => {
//                 console.log(error)
//             })

//         if (added === false) {

//             loading = false
//             distpach({
//                 type: 'LOADING',
//                 payload: loading
//             })

//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops...',
//                 text: 'Ocurrior un error'
//             })
//         }

//     } catch (error) {
//         console.log(error)
//     }




// }

export const getConsultation = (pacientId, consultationId) => async (distpach, getState) => {
    // let loading = true;
    try {
        // distpach({
        //     type: 'LOADING',
        //     payload: loading
        // })
        // await axios.get(`http://localhost:5000/api/patients/${pacientId}/medicalHistories/1/consultations/${consultationId}`, { headers: { "token": `${localStorage.getItem('token')}` } })
        //     .then(response => {
        //         if (response.data.payload) {
        //             distpach({
        //                 type: 'GET_DETAIL_SUCCESS',
        //                 payload: response.data.payload
        //             })

        //             loading = false
        //             distpach({
        //                 type: 'LOADING',
        //                 payload: loading
        //             })
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
        distpach({
            type: 'GET_CONSULTATIONSDETAIL_SUCCESS',
            payload: consultationsSeeders[0]
        })

    } catch (error) {
        console.log(error)
    }

}


export const addConsultationSelected = (doctorId,consultation) => async (distpach, getState) => {

    let loading = true;
    const pendingList = getState().consultation.pendingQueryList;
    try {
        distpach({
            type: 'LOADING',
            payload: loading
        })
        // await axios.put(`http://localhost:5000/api/patients/${pacientId}/medicalHistories/1/consultations/${consultation.id}`,
        //     consultation,
        //     { headers: { "token": `${localStorage.getItem('token')}` } })
        //     .then(response => {
        //         if (response.data.payload) {
        //             distpach({
        //                 type: 'UPDATE_consultation_SUCCESS',
        //                 payload: response.data.payload
        //             })
        //             loading = false
        //             distpach({
        //                 type: 'LOADING',
        //                 payload: loading
        //             })
        //         } else {
        //             Swal.fire({
        //                 icon: 'error',
        //                 title: 'Oops...',
        //                 text: 'Ocurrior un error'
        //             })
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         Swal.fire({
        //             icon: 'error',
        //             title: 'Oops...',
        //             text: 'Ocurrior un error'
        //         })
        //     })

        distpach({
            type: 'ADD_CONSULTATION_SELECTED',
            payload: pendingList.filter(x=>x.id!==consultation.id)
        })

    } catch (error) {
        console.log(error)
        // Swal.fire({
        //     icon: 'error',
        //     title: 'Oops...',
        //     text: 'Ocurrior un error'
        // })
    }

    loading = false
    distpach({
        type: 'LOADING',
        payload: loading
    })


}


// export const deleteconsultation = (pacientId, consultationId) => async (distpach, getState) => {

//     let loading = true;
//     let deleted = false;
//     try {
//         distpach({
//             type: 'LOADING',
//             payload: loading
//         })
//         await axios.delete(`http://localhost:5000/api/patients/${pacientId}/medicalHistories/1/consultations/${consultationId}`, { headers: { "token": `${localStorage.getItem('token')}` } })
//             .then(response => {
//                 if (response.data.payload) {
//                     distpach({
//                         type: 'DELETE_consultation_SUCCES',
//                         payload: {
//                             deleted:1,
//                             list:getState().consultation.list.filter(x=>x.id!==consultationId)
//                         }
//                     })
//                     loading = false
//                     distpach({
//                         type: 'LOADING',
//                         payload: loading
//                     })
//                     deleted = true;
//                 }
//             })
//             .catch(error => {
//                 console.log(error)
//             })

//         if (deleted === false) {
//             Swal.fire({
//                 icon: 'error',
//                 title: 'Oops...',
//                 text: 'Ocurrior un error'
//             })
//         }

//     } catch (error) {
//         console.log(error)
//         // Swal.fire({
//         //     icon: 'error',
//         //     title: 'Oops...',
//         //     text: 'Ocurrior un error'
//         // })
//     }


// }

// //Reset states
// export const resetconsultationRegistered = () => (distpach, getState) => {
//     distpach({
//         type: 'RESET_consultation_REGISTERED',
//         payload: null
//     })
// }


// export const resetconsultationUpdated = () => (distpach, getState) => {
//     distpach({
//         type: 'RESET_consultation_UPDATED',
//         payload: null
//     })
// }