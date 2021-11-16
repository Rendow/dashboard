import React, {useEffect, useState} from "react";
import s from "./finalize.module.scss";
import {NavLink, useParams} from "react-router-dom";
import arrowIcon from "../../common/img/arrow.png";
import {API} from "../../api/api";
import {TestType} from "../../store/reducer";


const Finalize = () => {

    const [test,setTest] = useState<TestType>()
    let {id} = useParams<{id:string}>();

    useEffect(() => {
        document.title = 'Finalize'
    }, [])
    useEffect(() => {
        async function fetchData() {
            const test = await API.getTestsById(+id);
            try {
                if (test.statusText === 'OK') {
                    const {data} = test;
                    setTest((data))
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchData()
    }, [])

    return (
        <div className={s.finalizeWrap}>
            <div className={s.titleBlock}>
                <span>Finalize</span>
                <span className={s.test}> {test && test.name}</span>
            </div>
            <NavLink to="/"> <div style={{backgroundImage:`url(${arrowIcon})`}}/>Back</NavLink>
        </div>
    )
}
 export default Finalize