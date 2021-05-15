import axios from 'axios';
import Swal from 'sweetalert2';
import { doctorSeeder } from '../Extras/seeders';
import { showPopUpError, turnLoading } from '../Extras/Validations';


const initialData = {
    token: '',
    userRegistered: null,
    userInside: null,
    profile: null,
    passwordForget: null

}

const LOGIN_SUCCESS = "LOGIN_SUCCESS"
const EXIT_SUCCESS = "EXIT_SUCCESS"
const REGISTER_SUCCESS = "REGISTER_SUCCESS"
const GET_INFO_USER = "GET_INFO_USER"
const GET_PROFILE = "GET_PROFILE"
const GET_PASSWORD = "GET_PASSWORD"
const RESET_PASSWORD_FORGET = "RESET_PASSWORD_FORGET"
const EDIT_PROFILE = "EDIT_PROFILE"

export default function userReducer(state = initialData, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                userInside: action.payload.data
            }
        case EXIT_SUCCESS:
            return {
                ...state,
                token: ''
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                userRegistered: action.payload
            }
        case GET_INFO_USER:
            return {
                ...state,
                token: localStorage.getItem('token'),
                userInside: action.payload
            }
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        case GET_PASSWORD:
            return {
                ...state,
                passwordForget: action.payload
            }
        case RESET_PASSWORD_FORGET:
            return {
                ...state,
                passwordForget: action.payload
            }
        case EDIT_PROFILE:
            return {
                ...state,
                profile: action.payload
            }
        default:
            return state
    }
}



export const getPassword = (keyWord) => async (distpach, getState) => {
    let loading = true
    try {
        turnLoading(loading, distpach)
        await axios.post(`${process.env.REACT_APP_URL_BASE_BACKEND}/user/password`, keyWord)
            .then(response => {
                if (response.status)
                    if (response.data.data) {
                        distpach({
                            type: GET_PASSWORD,
                            payload: response.data.data
                        })
                        loading = false
                        turnLoading(loading, distpach)


                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'No se encontró una contraseña'
                        })
                    }

            })
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

export const loginAction = (user) => async (distpach, getState) => {
    let loading = true
    try {
        distpach({
            type: 'LOADING',
            payload: loading
        })

        await axios.post(`${process.env.REACT_APP_URL_BASE_BACKEND}/login`, user)
            .then(response => {
                if (response.status)
                    if (response.data.token) {
                        localStorage.setItem('token', response.data.token);
                        distpach({
                            type: LOGIN_SUCCESS,
                            payload: response.data
                        })

                        distpach({
                            type: GET_INFO_USER,
                            payload: response.data.data
                        })

                        loading = false
                        distpach({
                            type: 'LOADING',
                            payload: loading
                        })
                    } else {
                        Swal.fire({
                            icon: 'Error',
                            title: 'Oops...',
                            text: 'Contraseña o usuario incorrecto'
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

                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Usuario o contraseña incorrecto'
                })
            })

    } catch (error) {
        console.log(error)
    }
}

export const exitAction = () => (distpach, getState) => {
    try {
        localStorage.removeItem('token');
        distpach({
            type: EXIT_SUCCESS
        })
    } catch (error) {
        console.log(error)
    }
}



export const registerUser = (user) => async (distpach, getState) => {
    let loading = true
    try {
        // const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=00&limit=20')
        // console.log(res.data.results)
        distpach({
            type: 'LOADING',
            payload: loading
        })

        await axios.post(`${process.env.REACT_APP_URL_BASE_BACKEND}/register`, user)
            .then(response => {
                if (response.data.message) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Ya existe un usuario con esa palabra secreta!',
                        footer: ''
                    })

                    loading = false
                    distpach({
                        type: 'LOADING',

                    })
                } else {
                    distpach({
                        type: REGISTER_SUCCESS,
                        payload: response.data
                    })

                    loading = false
                    distpach({
                        type: 'LOADING',

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

export const getInfoUser = () => async (distpach, getState) => {
    let loading = true
    try {
        const token = localStorage.getItem('token');
        if (token) {
            distpach({
                type: 'LOADING',
                payload: loading
            })

            await axios.get(`${process.env.REACT_APP_URL_BASE_BACKEND}/user/idByToken/${token}`)
                .then(response => {
                    //console.log(response.data.user)
                    distpach({
                        type: GET_INFO_USER,
                        payload: response.data.user
                    })

                    loading = false
                    distpach({
                        type: 'LOADING',

                    })
                })
                .catch(error => {
                    console.log(error)
                    loading = false
                    distpach({
                        type: 'LOADING',

                    })
                })

        }

    } catch (error) {
        console.log(error)
        loading = false
        distpach({
            type: 'LOADING',

        })
    }
}


export const getProfile = (id) => async (distpach, getState) => {
    let loading = true
    try {
        turnLoading(loading, distpach)

        await axios.get(`${process.env.REACT_APP_URL_BASE_BACKEND}/user/${id}`)
            .then(response => {
                if (response.data.data) {
                    distpach({
                        type: GET_PROFILE,
                        payload: response.data.data
                    })

                    loading = false;
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
        console.log(error)
        loading = false
        turnLoading(loading, distpach)
        showPopUpError()
    }
}



export const editProfile = (id, user) => async (distpach, getState) => {
    let loading = true
    try {
        turnLoading(loading, distpach)

        await axios.put(`${process.env.REACT_APP_URL_BASE_BACKEND}/user/${id}`,
            user,
            { headers: { "token": `${localStorage.getItem('token')}` } })
            .then(response => {
                if (response.data.payload) {
                    loading = false;
                    turnLoading(loading, distpach)

                    // Swal.fire(
                    //     'Buen Trabajo',
                    //     'Se modificó el perfil con éxito',
                    //     'success'
                    // )
                }
            })
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


export const resetPasswordForget = () => async (distpach, getState) => {
    distpach({
        type: RESET_PASSWORD_FORGET,
        payload: null
    })
}

export const resetUserRegistered = () => async (distpach, getState) => {
    distpach({
        type: REGISTER_SUCCESS,
        payload: null
    })
}