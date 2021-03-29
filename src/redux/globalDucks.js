

const initialData = {
    loading: false
}


const LOADING = "LOADING"

export default function globalReducer(state = initialData, action) {
    switch (action.type) {
        case LOADING:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state
    }
}


export const loadingAction = (load) => (distpach, getState) => {
    let loading = load
    try {
        distpach({
            type: 'LOADING',
            payload: loading
        })
    } catch (error) {
        console.log(error)
    }
}
