import { deficitsSeeders } from '../Extras/seeders';

const initialData = {
    list: []
}


const LIST_DEFICITS_SUCCES = "LIST_DEFICITS_SUCCES"

export default function deficitReducer(state = initialData, action) {
    switch (action.type) {
        case LIST_DEFICITS_SUCCES:
            return {
                ...state,
                list: action.payload
            }
        default:
            return state
    }
}


export const listDeficits = () => async (distpach, getState) => {

    let loading = true
    try {
        distpach({
            type: 'LOADING',
            payload: loading
        })

        // const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=00&limit=20')
        // console.log(res.data.results)
        distpach({
            type: 'LIST_DEFICITS_SUCCES',
            payload: deficitsSeeders
        })


        loading = false
        distpach({
            type: 'LOADING',
            payload: loading
        })

    } catch (error) {
        console.log(error)
    }
}
