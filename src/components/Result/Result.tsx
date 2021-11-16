import React, {useEffect, useState} from "react";
import {TestType} from "../../store/reducer";
import {NavLink, useParams} from "react-router-dom";
import {API} from "../../api/api";
import s from "../Finalize/finalize.module.scss";
import arrowIcon from "../../common/img/arrow.png";


const Result = () => {

    useEffect(() => {
        document.title = 'Result'
    }, [])

    const [test,setTest] = useState<TestType>()
    let {id} = useParams<{id:string}>();

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
        <div className={s.wrap}>
            <div className={s.titleBlock}>
                <span>Result</span>
                <span className={s.test}> {test && test.name}</span>
            </div>
            <NavLink to="/"> <div style={{backgroundImage:`url(${arrowIcon})`}}/>Back</NavLink>
        </div>
    )

}
export default Result