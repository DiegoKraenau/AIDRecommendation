import axios from 'axios';


const initialData = {
    list: null,
    groups: null
}


const GET_GROUPS_SUCCES = "GET_GROUPS_SUCCES";
const GET_DISEASES_SUCCESS = "GET_DISEASES_SUCCESS"

export default function diseaseReducer(state = initialData, action) {
    switch (action.type) {
        case GET_GROUPS_SUCCES:
            return {
                ...state,
                groups: action.payload
            }
        case GET_DISEASES_SUCCESS:
            return {
                ...state,
                list: action.payload
            }
        default:
            return state
    }
}


export const getGroups = () => async (distpach, getState) => {
    let loading = true
    try {
        // distpach({
        //     type: 'GET_GROUPS_SUCCES',
        //     payload: groupsSeeders
        // })
        distpach({
            type: 'LOADING',
            payload: loading
        })

        await axios.get(`${process.env.REACT_APP_URL_BASE_BACKEND}/categoriesDeseases`, { headers: { "token": `${localStorage.getItem('token')}` } })
            .then(response => {
                if (response.data.data) {
                    distpach({
                        type: 'GET_GROUPS_SUCCES',
                        payload: response.data.data
                    })
                }
            })
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


export const getDiseases = () => async (distpach, getState) => {
    let loading = true
    try {
        distpach({
            type: 'LOADING',
            payload: loading
        })



        await axios.get(`${process.env.REACT_APP_URL_BASE_BACKEND}/categoriesDeseases/deseases`, { headers: { "token": `${localStorage.getItem('token')}` } })
            .then(response => {
                if (response.data.data) {
                    distpach({
                        type: 'GET_DISEASES_SUCCESS',
                        payload: response.data.data
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
        loading = false
        distpach({
            type: 'LOADING',
            payload: loading
        })
    }
}



