import { Fragment, React, useEffect, useState } from 'react';
import styles from './_agregarConsulta.module.scss';
import '../../sass/styles.scss';
import Navbar from '../Navbar/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { getDiseases, getGroups } from '../../redux/diseaseDucks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import { getInfoUser } from '../../redux/userDucks';
import { addConsultationPacient } from '../../redux/consultationDucks'




const AgregarConsulta = () => {

    //Redux
    const distpach = useDispatch();
    const groups = useSelector(store => store.disease.groups);
    const diseases = useSelector(store => store.disease.list);
    const userInfo = useSelector(store => store.usuario.userInside)

    //States
    const [listDiseasesFiltered, setListDiseasesFiltered] = useState([]);
    const [currentClicked, setCurrentClicked] = useState(0);
    const [inputFilter, setInputFilter] = useState('');
    const [listDiseasesSelected, setListDiseasesSelected] = useState([]);
    const [consultation, setConsultation] = useState({
        usuarioId: '',
        dolencias: []
    })


    //Functions
    const selectGroup = (i, id) => {
        setCurrentClicked(i)
        setListDiseasesFiltered(diseases.filter(x => x.GrupoId === id))
    }

    const filteringDiseases = (e) => {
        setInputFilter(e.target.value.toLowerCase())
    }

    const selectDisease = (disease, i) => {
        const found = listDiseasesSelected.find(x => x.id === disease.id)
        if (found && found.id === disease.id) {
            setListDiseasesSelected(listDiseasesSelected.filter(x => x.id !== disease.id))
        } else {
            setListDiseasesSelected([...listDiseasesSelected, disease])
        }
    }

    const verifySelected = (id) => {
        const found = listDiseasesSelected.find(x => x.id === id);
        if (found && found.id === id) {
            return true;

        } else {
            return false;
        }
    }


    const addConsultation = () => {
        if (listDiseasesSelected.length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Necesita seleccionar almenos una dolencia',
            })
        } else {
            setConsultation({
                ...consultation,
                dolencias: listDiseasesSelected
            })
        }
    }





    //Hooks
    useEffect(() => {
        if (userInfo === null) {
            distpach(getInfoUser())
        } else {
            distpach(getGroups())
            distpach(getDiseases())
        }
    }, [])

    useEffect(() => {
        if (diseases) {
            selectGroup(currentClicked, diseases[currentClicked].id)
        }
    }, [diseases])


    useEffect(() => {
        if (userInfo !== null) {
            setConsultation({
                ...consultation,
                usuarioId: userInfo.id
            })
            distpach(getGroups())
            distpach(getDiseases())
        }
    }, [userInfo])

    useEffect(() => {
        if (consultation.dolencias.length !== 0) {
            distpach(addConsultationPacient(userInfo.id, consultation))
            Swal.fire(
                'Buena trabajo!',
                'Agregaste tu consulta con éxito',
                'success'
            )
            setInputFilter('')
            setListDiseasesSelected([])
            console.log(consultation)
        }
    }, [consultation])



    return (
        <Fragment>
            <Navbar></Navbar>
            <section className={`${styles.addQuery} flex flex-jc-c flex-ai-c`}>
                <section className={`${styles.addQuery__content} container`}>
                    <h2>Agregar Consulta</h2>
                    <div className={`${styles.formQuery}`}>
                        <div className={`${styles.formQuery__searchBar}`}>
                            <input
                                placeholder="Buscar"
                                value={inputFilter}
                                onChange={(e) => filteringDiseases(e)}
                            ></input>
                            <i><FontAwesomeIcon icon="search"></FontAwesomeIcon></i>
                        </div>
                        <div className={`${styles.formQuery__groups} flex flex-jc-c`}>
                            {
                                groups &&
                                groups.map((group, i) => (
                                    <div className={`${currentClicked === i ? styles.clicked : ''}`} key={group.id} onClick={() => selectGroup(i, group.id)}>{group.Nombre}</div>
                                ))
                            }
                        </div>
                        <div className={`${styles.formQuery__results} flex`}>
                            {
                                listDiseasesFiltered.length !== 0 ? (
                                    listDiseasesFiltered.filter(x => x.Nombre.toLowerCase().includes(inputFilter)).length === 0 ? (
                                        <p>No tiene dolencias con ese nombre en este grupo</p>
                                    ) : (
                                        listDiseasesFiltered.filter(x => x.Nombre.toLowerCase().includes(inputFilter)).map((x, i) => (
                                            <div className={`${verifySelected(x.id) ? styles.selectedDisease : ''}`} key={x.id} onClick={() => selectDisease(x, i)}>{x.Nombre}</div>
                                        ))
                                    )
                                ) : (
                                    <p>No tiene dolencias este grupo</p>
                                )
                            }
                        </div>
                        <div className={`button__content`}>
                            <button
                                onClick={() => addConsultation()}
                            >
                                Agregar Consulta
                            </button>
                        </div>
                    </div>

                </section>
            </section>
        </Fragment>
    );
}

export default AgregarConsulta;