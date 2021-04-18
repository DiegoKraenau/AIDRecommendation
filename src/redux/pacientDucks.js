// import axios from 'axios';
// import Swal from 'sweetalert2';
import axios from 'axios';
import { pacientSeeder } from '../Extras/seeders';
import { showPopUpError, turnLoading } from '../Extras/Validations';

const initialData = {
    information: null
}



const GET_PACIENT_BY_ID = "GET_PACIENT_BY_ID"



export default function pacinetReducer(state = initialData, action) {
    switch (action.type) {
        case GET_PACIENT_BY_ID:
            return {
                ...state,
                information: action.payload
            }
        default:
            return state
    }
}




export const getPacientId = (pacientId) => async (distpach, getState) => {

    let loading = true
    try {
        turnLoading(loading, distpach)
        await axios.get(`${process.env.REACT_APP_URL_BASE_BACKEND}/patients/${pacientId}`, { headers: { "token": `${localStorage.getItem('token')}` } })
            .then(response => {
                if (response.data.data) {
                    distpach({
                        type: 'GET_PACIENT_BY_ID',
                        payload: response.data.data
                    })
                    loading = false
                    turnLoading(loading, distpach)
                }

            }
            )
            .catch(error => {
                loading = false
                turnLoading(loading, distpach)
                showPopUpError()
                console.log(error)
            })


    } catch (error) {
        console.log(error)
        loading = false
        turnLoading(loading, distpach)
        showPopUpError()
    }
}


