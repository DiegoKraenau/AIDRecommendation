import axios from 'axios';
import Swal from 'sweetalert2';

const initialData = {
    list: [],
    deficitRegistered: null,
    deficitDetail: null,
    deficitUpdated: null,
    deficitDeleted: '0'
}


const LIST_DEFICITS_SUCCES = "LIST_DEFICITS_SUCCES"
const ADD_DEFICIT_SUCCESS = "ADD_DEFICIT_SUCCESS"
const GET_DETAIL_SUCCESS = "GET_DETAIL_SUCCESS"
const DELETE_DEFICIT_SUCCES = "DELETE_DEFICIT_SUCCES"
const UPDATE_DEFICIT_SUCCESS = "UPDATE_DEFICIT_SUCCESS"
const RESET_DEFICIT_REGISTERED = "RESET_DEFICIT_REGISTERED"
const RESET_DEFICIT_UPDATED = "RESET_DEFICIT_UPDATED"

export default function deficitReducer(state = initialData, action) {
    switch (action.type) {
        case LIST_DEFICITS_SUCCES:
            return {
                ...state,
                list: action.payload
            }
        case ADD_DEFICIT_SUCCESS:
            return {
                ...state,
                deficitRegistered: action.payload
            }
        case GET_DETAIL_SUCCESS:
            return {
                ...state,
                deficitDetail: action.payload
            }
        case DELETE_DEFICIT_SUCCES:
            return {
                ...state,
                deficitDeleted: action.payload.deleted,
                list: action.payload.list
            }
        case UPDATE_DEFICIT_SUCCESS:
            return {
                ...state,
                deficitUpdated: action.payload
            }
        case RESET_DEFICIT_REGISTERED:
            return {
                ...state,
                deficitRegistered: action.payload
            }
        case RESET_DEFICIT_UPDATED:
            return {
                ...state,
                deficitUpdated: action.payload
            }
        default:
            return state
    }
}


export const listDeficits = (userId) => async (distpach, getState) => {

    let loading = true
    try {
        distpach({
            type: 'LOADING',
            payload: loading
        })

        await axios.get(`${process.env.REACT_APP_URL_BASE_BACKEND}/patients/${userId}/medicalHistories/1/deficits`, { headers: { "token": `${localStorage.getItem('token')}` } })
            .then(response => {
                if (response.data.data) {
                    distpach({
                        type: 'LIST_DEFICITS_SUCCES',
                        payload: response.data.data
                    })
                } else {
                    distpach({
                        type: 'LIST_DEFICITS_SUCCES',
                        payload: []
                    })
                }
            })
            .catch(error => {
                console.log(error)
                distpach({
                    type: 'LIST_DEFICITS_SUCCES',
                    payload: []
                })
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


export const addDeficit = (patientOdoctorId, deficit) => async (distpach, getState) => {

    let loading = true;
    try {
        distpach({
            type: 'LOADING',
            payload: loading
        })
        await axios.post(`${process.env.REACT_APP_URL_BASE_BACKEND}/patients/${patientOdoctorId}/medicalHistories/${patientOdoctorId}/deficits`,
            deficit,
            { headers: { "token": `${localStorage.getItem('token')}` } })
            .then(response => {
                if (response.data.payload) {
                    distpach({
                        type: 'ADD_DEFICIT_SUCCESS',
                        payload: response.data.payload
                    })

                    loading = false
                    distpach({
                        type: 'LOADING',
                        payload: loading
                    })
                }

            })
            .catch(error => {
                console.log(error)
                loading = false
                distpach({
                    type: 'LOADING',
                    payload: loading
                })
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

export const getDeficit = (pacientId, deficitId) => async (distpach, getState) => {
    let loading = true;
    try {
        distpach({
            type: 'LOADING',
            payload: loading
        })
        await axios.get(`${process.env.REACT_APP_URL_BASE_BACKEND}/patients/${pacientId}/medicalHistories/1/deficits/${deficitId}`, { headers: { "token": `${localStorage.getItem('token')}` } })
            .then(response => {
                if (response.data.payload) {
                    distpach({
                        type: 'GET_DETAIL_SUCCESS',
                        payload: response.data.payload
                    })

                    loading = false
                    distpach({
                        type: 'LOADING',
                        payload: loading
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })

    } catch (error) {
        console.log(error)
    }



}


export const updateDeficit = (pacientId, deficit) => async (distpach, getState) => {

    let loading = true;
    try {
        distpach({
            type: 'LOADING',
            payload: loading
        })
        await axios.put(`${process.env.REACT_APP_URL_BASE_BACKEND}/patients/${pacientId}/medicalHistories/${pacientId}/deficits/${deficit.id}`,
            deficit,
            { headers: { "token": `${localStorage.getItem('token')}` } })
            .then(response => {
                if (response.data.data) {
                    distpach({
                        type: 'UPDATE_DEFICIT_SUCCESS',
                        payload: response.data.data
                    })
                    loading = false
                    distpach({
                        type: 'LOADING',
                        payload: loading
                    })
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ocurrior un error'
                    })
                }
            })
            .catch(error => {
                console.log(error)
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ocurrior un error'
                })
            })

    } catch (error) {
        console.log(error)
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ocurrior un error'
        })
    }


}


export const deleteDeficit = (pacientId, deficitId) => async (distpach, getState) => {

    let loading = true;
    let deleted = false;
    try {
        distpach({
            type: 'LOADING',
            payload: loading
        })
        await axios.delete(`${process.env.REACT_APP_URL_BASE_BACKEND}/patients/${pacientId}/medicalHistories/1/deficits/${deficitId}`, { headers: { "token": `${localStorage.getItem('token')}` } })
            .then(response => {
                if (response.data.payload) {
                    distpach({
                        type: 'DELETE_DEFICIT_SUCCES',
                        payload: {
                            deleted: 1,
                            list: getState().deficit.list.filter(x => x.id !== deficitId)
                        }
                    })
                    loading = false
                    distpach({
                        type: 'LOADING',
                        payload: loading
                    })
                    deleted = true;
                }
            })
            .catch(error => {
                console.log(error)
            })

        if (deleted === false) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ocurrior un error'
            })
        }

    } catch (error) {
        console.log(error)
        // Swal.fire({
        //     icon: 'error',
        //     title: 'Oops...',
        //     text: 'Ocurrior un error'
        // })
    }


}

//Reset states
export const resetDeficitRegistered = () => (distpach, getState) => {
    distpach({
        type: 'RESET_DEFICIT_REGISTERED',
        payload: null
    })
}


export const resetDeficitUpdated = () => (distpach, getState) => {
    distpach({
        type: 'RESET_DEFICIT_UPDATED',
        payload: null
    })
}