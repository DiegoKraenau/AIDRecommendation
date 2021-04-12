import Swal from "sweetalert2"

const showPopUpError = () => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Ocurrior un error'
    })
}

const emptyInputs = (arr, answer = '') => {
    let found = false;
    if (answer.length !== 0) {
        arr.forEach(x => {
            if (x[answer].length === 0) found = true;
        })

    } else {
        console.log("ENTRANDO")
        arr.forEach(x => {
            if (x.length === 0) found = true;
        })
    }
    return found;
}

const turnLoading = (loading, distpach) => {
    distpach({
        type: 'LOADING',
        payload: loading
    })
}


export { showPopUpError, emptyInputs,turnLoading }
