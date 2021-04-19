// import axios from 'axios';
// import Swal from 'sweetalert2';
import axios from 'axios';
import { doctoresRankingSeeders } from '../Extras/seeders';
import { showPopUpError, turnLoading } from '../Extras/Validations';

const initialData = {
    information: null,
    listRanking: null
}



const GET_DOCTOR_BY_ID = "GET_DOCTOR_BY_ID"
const GET_RANKING_DOCTORES = "GET_RANKING_DOCTORES"



export default function doctorReducer(state = initialData, action) {
    switch (action.type) {
        case GET_DOCTOR_BY_ID:
            return {
                ...state,
                information: action.payload
            }
        case GET_RANKING_DOCTORES:
            return {
                ...state,
                listRanking: action.payload
            }
        default:
            return state
    }
}




export const getDoctorById = (doctorId) => async (distpach, getState) => {

    let loading = true
    try {
        turnLoading(loading, distpach)
        await axios.get(`${process.env.REACT_APP_URL_BASE_BACKEND}/doctors/${doctorId}`, { headers: { "token": `${localStorage.getItem('token')}` } })
            .then(response => {
                console.log(response.data)
                if (response.data.data) {
                    distpach({
                        type: 'GET_DOCTOR_BY_ID',
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

export const getRankingDoctores = () => async (distpach, getState) => {

    let loading = true
    try {
        turnLoading(loading, distpach)
        // await axios.get(`${process.env.REACT_APP_URL_BASE_BACKEND}/doctors/${doctorId}`, { headers: { "token": `${localStorage.getItem('token')}` } })
        //     .then(response => {
        //         console.log(response.data)
        //         if (response.data.data) {
        //             distpach({
        //                 type: 'GET_DOCTOR_BY_ID',
        //                 payload: response.data.data
        //             })
        //             loading = false
        //             turnLoading(loading, distpach)
        //         }

        //     }
        //     )
        //     .catch(error => {
        //         loading = false
        //         turnLoading(loading, distpach)
        //         showPopUpError()
        //         console.log(error)
        //     })
        distpach({
            type: 'GET_RANKING_DOCTORES',
            payload: doctoresRankingSeeders
        })
        loading = false
        turnLoading(loading, distpach)

    } catch (error) {
        console.log(error)
        loading = false
        turnLoading(loading, distpach)
        showPopUpError()
    }
}



