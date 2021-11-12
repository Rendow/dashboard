import {StateContext} from "../../store/ContextProvider";
import {setSitesAC, setTestsAC, Site, TestType} from "../../store/reducer";
import s from './dashboard.module.scss'
import {API} from "../../api/api";
import React, {useEffect, useState} from "react";

export  const Dashboard = () => {
    const {dispatch} = StateContext()
    const {tests} = StateContext()

    const [data, setData] = useState(null)
    const showContent = tests.length


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
                    console.log(data)
                    dispatch(setSitesAC(data))
                }
            } catch (e) {
                console.log(e);
            }
        }
        fetchData()

    }, [])

    const getTests =  async () => {

      let response =  await API.getTests()
        try{
            if(response.statusText === 'OK'){
                const { data } = response;
                dispatch(setTestsAC(data))
            }
        }catch (e){
            console.log(e)
        }
    }


    return (
        <main className={s.dashboard}>
            <h1>Dashboard </h1>
            <button onClick={getTests}>get test</button>
            <input type="text"/>
            {showContent
            && <>
               <FilterBar/>
                <ul>{tests.map(obj => {
                    return <li key={obj.id}>
                        <Test id={obj.id}
                              type={obj.type}
                              status={obj.status}
                              siteId={obj.siteId}
                              name={obj.name}
                              key={obj.id} />
                    </li>

                })}
                </ul>
            </>
            }
        </main>
    )
}


const FilterBar = () => {
  return (
      <div className={s.filterBar}>
          <div>NAME</div>
          <div>TYPE</div>
          <div>STATE</div>
          <div>SITE</div>
      </div>
  )
}

const Test = React.memo(({id, status, siteId, type, name}: TestType) => {
    const {sites} = StateContext()

    let regExpSites = sites.map(s => {
     let newUrl = s.url.replace(/\b((www\.)|(https:\/\/)|(http:\/\/))\b/g, '')
        return { id:s.id, url:newUrl}
    })

    console.log(regExpSites)
  let site = sites.length && sites.find(s => s.id === siteId)

    return (
        <section className={s.test}>
            <div> {name}</div>
            <div> {type}</div>
            <div> {status}</div>
            <div> {site && site.url}</div>
            {id % 2 ? <button> result</button>
                : <button> finalize</button>}
        </section>
    )
})