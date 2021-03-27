import axios from 'axios';

const initialData = {
    info: {}

}

const LOGIN_SUCCESS = "LOGIN_SUCCESS"

export default function userReducer(state = initialData, action) {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state
            }
        default:
            return state
    }
}


export const loginAction = () => async (distpach, getState) => {
    try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=00&limit=20')
        console.log(res.data.results)
        localStorage.setItem('token', 'AFASFKAJFLKA83I');
        distpach({
            type: LOGIN_SUCCESS
        })
    } catch (error) {
        console.log(error)
    }
}