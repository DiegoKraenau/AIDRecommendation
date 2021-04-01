import { diseasesSeeders, groupsSeeders } from '../Extras/seeders';

const initialData = {
    list: null,
    groups: null
}


const GET_GROUPS_SUCCES = "GET_GROUPS_SUCCES";
const GET_DISEASES_SUCCESS = "GET_DISEASES_SUCCESS"

export default function globalReducer(state = initialData, action) {
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


export const getGroups = () => (distpach, getState) => {
    try {
        distpach({
            type: 'GET_GROUPS_SUCCES',
            payload: groupsSeeders
        })
    } catch (error) {
        console.log(error)
    }
}


export const getDiseases = () => (distpach, getState) => {
    try {
        distpach({
            type: 'GET_DISEASES_SUCCESS',
            payload: diseasesSeeders
        })
    } catch (error) {
        console.log(error)
    }
}



