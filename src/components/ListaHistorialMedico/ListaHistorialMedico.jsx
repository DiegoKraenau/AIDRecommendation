import { Fragment } from "react";
import Navbar from "../Navbar/Navbar";
import styles from './_listaHistorialMedico.module.scss';
import '../../sass/styles.scss';
import { React, useState, useEffect } from 'react';
import axios from "axios";
import { deficitsSeeders } from '../../Extras/seeders';
import { useDispatch, useSelector } from 'react-redux';
import { listDeficits, deleteDeficit } from "../../redux/deficitDucks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";
import { getInfoUser } from "../../redux/userDucks";
import LoadinScreen from 'loading-screen-kraenau';
import Swal from "sweetalert2";

const ListaHistorialMedico = () => {


    //About Pagination
    const [currentPage, setcurrentPage] = useState(1)
    const [deficitsPerPage] = useState(7);
    const history = useHistory();

    //Deficits redux
    const dispatch = useDispatch();
    const deficits = useSelector(store => store.deficit.list)
    const userInfo = useSelector(store => store.usuario.userInside)

    //Redux Global
    const loading = useSelector(store => store.global.loading);


    //Rendered finished
    useEffect(() => {
        // dispatch(listDeficits());
        if (userInfo === null) {
            dispatch(getInfoUser())
            //dispatch(listDeficits(userInfo.id))
        } else {
            dispatch(listDeficits(userInfo.id))
            //console.log(userInfo.id)
        }
    }, [])


    //User info with token
    useEffect(() => {
        if (userInfo !== null) {
            dispatch(listDeficits(userInfo.id))
        }
    }, [userInfo])



    //Get current Deficit
    const indexOfLastDeficit = currentPage * deficitsPerPage;
    const indexOfFirtsDeficit = indexOfLastDeficit - deficitsPerPage;
    const currentDeficit = deficits.slice(indexOfFirtsDeficit, indexOfLastDeficit);

    //Pagination
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(deficits.length / deficitsPerPage); i++) {
        pageNumbers.push(i)
    }

    //Change Page
    const paginate = (pageNumber) => setcurrentPage(pageNumber)

    const addDeficit = () => {
        history.push('/agregarDeficit')
    }


    //Detail
    const changeToEdit = (id) => {
        history.push(`/editarDeficit/${id}`)
    }

    const eliminarDeficit = (deficitId) => {
        Swal.fire({
            title: '¿Estas seguro de eliminar este Deficit?',
            text: "No podras revertirlo!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#4B4BE0',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminar!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteDeficit(userInfo.id, deficitId))
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }

    return (
        <Fragment>
            {
                loading &&
                <LoadinScreen></LoadinScreen>
            }
            <Navbar></Navbar>
            <section className={`${styles.listaHistorialMedico} flex flex-jc-c flex-ai-c`}>
                <section className={`${styles.listaHistorialMedico__content} container`}>
                    <h2>Historial Médico</h2>
                    <div className={`${styles.button_add_section}`}>
                        <button onClick={() => addDeficit()}><i><FontAwesomeIcon icon="plus-square" /></i>Registrar Deficit</button>
                    </div>
                    {
                        deficits.length !== 0 ? (
                            <table className={`${styles.list_deficit}`}>
                                <thead>
                                    <tr>
                                        <th>Tipo</th>
                                        <th>Deficit</th>
                                        <th>Edad</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        currentDeficit.map(deficit => (
                                            <tr key={deficit.id}>
                                                <td>{deficit.TipoDeficit}</td>
                                                <td>{deficit.Deficit}</td>
                                                <td>{deficit.EdadSufrioEnfermedad} años</td>
                                                <td><button onClick={() => changeToEdit(deficit.id)}><i><FontAwesomeIcon icon="edit" /></i>Editar</button></td>
                                                <td><button onClick={() => eliminarDeficit(deficit.id)}><i><FontAwesomeIcon icon="trash-alt" /></i>Eliminar</button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        ) : (
                            <table className={`${styles.list_deficit}`}>
                                <thead>
                                    <tr>
                                        <th>Tipo</th>
                                        <th>Deficit</th>
                                        <th>Edad</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        <tr>
                                            <td colSpan="5" className="center">No tiene ni un deficit registrado</td>
                                        </tr>
                                    }
                                    {
                                        /*
                                        
                                        deficitsSeeders.map(deficit => (
                                            <tr key={deficit.id}>
                                                <td>{deficit.TipoDeficit}</td>
                                                <td>{deficit.Deficit}</td>
                                                <td>{deficit.EdadSufrioEnfermedad} años</td>
                                                <td><button onClick={()=>changeToEdit(deficit.id)}><i><FontAwesomeIcon icon="edit" /></i>Editar</button></td>
                                                <td><button><i><FontAwesomeIcon icon="trash-alt" /></i>Eliminar</button></td>
                                            </tr>
                                        ))
                                        */
                                    }
                                </tbody>
                            </table>
                        )

                    }

                    <div className="paginator_content container flex flex-ai-c">
                        {
                            <div className="paginator_list">
                                {
                                    pageNumbers.map(number => (
                                        <button className="page-link" onClick={() => paginate(number)} key={number}>
                                            {number}
                                        </button>
                                    ))
                                }
                            </div>

                        }
                    </div>
                </section>

            </section>


        </Fragment>
    );
}

export default ListaHistorialMedico;