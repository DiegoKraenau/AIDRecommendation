import { Fragment } from "react";
import Navbar from "../Navbar/Navbar";
import styles from './_listaHistorialMedico.module.scss';
import '../../sass/styles.scss';
import { React, useState, useEffect } from 'react';
import axios from "axios";
import { deficitsSeeders } from '../../Extras/seeders';
import { useDispatch, useSelector } from 'react-redux';
import { listDeficits } from "../../redux/deficitDucks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from "react-router";

const ListaHistorialMedico = () => {


    //About Pagination
    const [currentPage, setcurrentPage] = useState(1)
    const [deficitsPerPage] = useState(7);
    const history = useHistory();

    //Deficits redux
    const dispatch = useDispatch();
    const deficits = useSelector(store => store.deficit.list)



    useEffect(() => {
        dispatch(listDeficits());
    }, [])



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

    return (
        <Fragment>
            <Navbar></Navbar>
            <section className={`${styles.listaHistorialMedico} flex flex-jc-c flex-ai-c`}>
                <section className={`${styles.listaHistorialMedico__content} container`}>
                    <h2>Historial Médico</h2>
                    <div className={`${styles.button_add_section}`}>
                        <button onClick={() => addDeficit()}><i><FontAwesomeIcon icon="plus-square" /></i>Agregar Deficit</button>
                    </div>
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
                                        <td><button ><i><FontAwesomeIcon icon="edit" /></i>Editar</button></td>
                                        <td><button><i><FontAwesomeIcon icon="trash-alt" /></i>Eliminar</button></td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                    <div className="paginator_content container flex flex-ai-c">
                        {
                            <div className="paginator_list">
                                {
                                    pageNumbers.map(number => (
                                        <button className="page-link" onClick={() => paginate(number)}>
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