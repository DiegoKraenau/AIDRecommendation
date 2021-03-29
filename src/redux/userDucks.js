import axios from 'axios';


const initialData = {
    token: ''

}

const LOGIN_SUCCESS = "LOGIN_SUCCESS"
const EXIT_SUCCESS = "EXIT_SUCCESS"


export default function userReducer(state = initialData, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                token: localStorage.getItem('token')
            }
        case EXIT_SUCCESS:
            return {
                ...state,
                token: ''
            }
        default:
            return state
    }
}


export const loginAction = () => (distpach, getState) => {
    let loading = true
    try {
        // const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=00&limit=20')
        // console.log(res.data.results)
        distpach({
            type: 'LOADING',
            payload: loading
        })

        localStorage.setItem('token', 'AFASFKAJFLKA83I');

        loading = false
        distpach({
            type: 'LOADING',
            payload: loading
        })

        distpach({
            type: LOGIN_SUCCESS
        })
    } catch (error) {
        console.log(error)
    }
}

export const exitAction = () => (distpach, getState) => {
    try {
        // const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=00&limit=20')
        // console.log(res.data.results)
        console.log("entro exit")
        localStorage.removeItem('token');
        distpach({
            type: EXIT_SUCCESS
        })
    } catch (error) {
        console.log(error)
    }
}