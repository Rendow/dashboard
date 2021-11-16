import {StateContext} from "../../store/ContextProvider";
import {setSitesAC, setTestsAC} from "../../store/reducer";
import s from './dashboard.module.scss'
import {API} from "../../api/api";
import React, {useEffect, useState} from "react";
import searchIcon from "../../common/img/search.png";
import {FilterBar} from "./FilterBar/FilterBar";
import {Test, TestTypeWithUrl} from "./Test/Test";

export  const Dashboard = () => {
    const {dispatch} = StateContext()
    const {tests,sites} = StateContext()
    const [text,setText] = useState('')
    const [type,setType] = useState('name')
    const [sortDirection,setSortDirection] = useState(true)


    useEffect(() => {
        document.title = 'Dashboard'
    }, [])
    useEffect(() => {
        async function fetchData() {
            const test = await API.getTests();
            try {
                if (test.statusText === 'OK') {
                    const {data} = test;
                    dispatch(setTestsAC(data))
                }
                const sites = await API.getSites()
                if (sites.statusText === 'OK') {
                    const {data} = sites;
                    dispatch(setSitesAC(data))
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchData()

    }, [])

    let regExpSites = sites.map(s => {
        let newUrl = s.url.replace(/\b((www\.)|(https:\/\/)|(http:\/\/))\b/g, '')
        return {id: s.id, url: newUrl}
    })
    let testsWithUrl = tests.map(t => {
        let modifyStatus = t.status.charAt(0) + t.status.toLowerCase().slice(1)
        let url = regExpSites.find(s => s.id === t.siteId)
        return {
            id: t.id,
            name: t.name,
            type: t.type,
            status: modifyStatus,
            siteId: t.siteId,
            url: url && url.url,
            urlId: url && url.id
        }
    })
    let sortedTests = [] as TestTypeWithUrl []


    function sortFunction(left: (undefined | string), right: (undefined | string)) {
        if (left && right) {
            if (sortDirection) {
                if (left > right) {
                    return 1;
                }
                if (left < right) {
                    return -1;
                }
                return 0;
            } else {
                if (left < right) {
                    return 1;
                }
                if (left > right) {
                    return -1;
                }
                return 0;
            }
        } else {
            return 0;
        }
    }

    const sortTestsByType = function (type:string){
        switch (type){
            case 'name':
                return sortedTests = testsWithUrl.sort((a, b) => {
                   let left = a.name
                   let right = b.name
                    return sortFunction(left, right);
                });
            case 'type':
                return sortedTests = testsWithUrl.sort((a, b) => {
                    let left = a.type
                    let right = b.type
                    return sortFunction(left, right);
                });
            case 'url':
                return sortedTests = testsWithUrl.sort((a, b) => {
                    let left  = a.url;
                    let right = b.url
                    return sortFunction(left,right);
                });
            case 'status':
                return sortedTests = testsWithUrl.sort((a, b) => {
                    let priority = ['Online','Paused','Stopped','Draft'];
                    let indexA = priority.indexOf(a.status)
                    let indexB = priority.indexOf(b.status)
                    if(sortDirection) {
                        return  indexA > indexB ? 1 : -1
                    } else {
                        return  indexA < indexB ? 1 : -1
                    }
                });
            default:
                throw new Error()

        }

    }
    sortTestsByType(type)

    let search = sortedTests.filter(t => {
     return [text].every(el => t.name.toLowerCase().includes(el))
    })


    return (
        <main className={s.dashboard}>
            <h1>Dashboard </h1>
            <div className={s.inputWrap}>
                <input
                    style={{backgroundImage:`url(${searchIcon})`}}
                    placeholder={'What test are you looking for?'}
                    value={text}
                    onChange={(e)=>{setText(e.currentTarget.value)}}
                    type="text" />
                <div className={s.testCount}>{search.length} tests</div>
            </div>

            {search.length > 0
                ? <>
                <FilterBar sortDirection={sortDirection} setSortDirection={setSortDirection}  setType={setType} />
                <ul>{search
                    .map(obj => {
                    return <li key={obj.id}>
                        <Test id={obj.id}
                              type={obj.type}
                              status={obj.status}
                              siteId={obj.siteId}
                              url={obj.url}
                              urlId={obj.urlId}
                              name={obj.name}
                              key={obj.id} />
                    </li>

                })}
                </ul>
            </>
                :
                <div>
                    <div className={s.noResult}>
                    <span>Your search did not match any results.</span>
                    <button onClick={()=>{setText('')}}>Reset</button>
                </div>
                </div>
            }
        </main>
    )
}


