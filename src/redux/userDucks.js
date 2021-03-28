import axios from 'axios';
import { useHistory } from 'react-router';

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
    try {
        // const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=00&limit=20')
        // console.log(res.data.results)
        localStorage.setItem('token', 'AFASFKAJFLKA83I');
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