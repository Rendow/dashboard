import {StateContext} from "../../store/ContextProvider";
import {setSitesAC, setTestsAC, TestType} from "../../store/reducer";
import s from './dashboard.module.scss'
import {API} from "../../api/api";
import React, {useEffect} from "react";
import {NavLink} from "react-router-dom";
import classNames from "classnames";

export  const Dashboard = () => {
    const {dispatch} = StateContext()
    const {tests} = StateContext()

    const showContent = tests.length
    // const mappedTests = tests.map(t => {
    //     let type;
    //     if (t.type === 'CLASSIC') {
    //         type = 'Classic'
    //     } else if (t.type === 'SERVER_SIDE') {
    //         type = 'Server-side'
    //     } else {
    //         type = 'MVT'
    //     }
    //
    //     return {
    //         id: t.id,
    //         name: t.name,
    //         type: type,
    //         status: t.status,
    //         siteId: t.siteId
    //     }
    // })
    const sortedTests = tests.slice().sort((a, b) => {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name < b.name) {
            return -1;
        }
        return 0;
    });

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


    return (
        <main className={s.dashboard}>
            <h1>Dashboard </h1>
            <input type="text"/>
            {showContent
            && <>
               <FilterBar/>
                <ul>{sortedTests.map(obj => {
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
          <div>
              <button>name</button>
          </div>
          <div>
              <button>type</button>
          </div>
          <div>
              <button>state</button>
          </div>
          <div>
              <button>site</button>
          </div>
      </div>
  )
}

const Test = React.memo(({id, status, siteId, type, name}: TestType) => {
    const {sites} = StateContext()

    let regExpSites = sites.map(s => {
        let newUrl = s.url.replace(/\b((www\.)|(https:\/\/)|(http:\/\/))\b/g, '')
        return {id: s.id, url: newUrl}
    })


    let modifyType;
    switch (type) {
        case 'CLASSIC':
            modifyType = 'Classic'
            break;
        case 'SERVER_SIDE':
            modifyType = 'Server-side'
            break;
        case 'MVT':
            modifyType = 'MVT'
            break;
        default:
            throw new Error()
    }

    let modifyStatus = status.charAt(0) + status.toLowerCase().slice(1)
    let site = sites.length && regExpSites.find(s => s.id === siteId)


    return (
        <section className={s.test}>
            <div className={s.name}> {name}</div>
            <div className={s.type}> {modifyType}</div>
            <div  className={classNames(s.status,{
            [s.red]: status === 'STOPPED',
            [s.green]: status === 'ONLINE',
            [s.orange]: status === 'PAUSED',
            })}> {modifyStatus}</div>
            <div className={s.site}> {site && site.url}</div>
            {id % 2
                ?  <NavLink style={{background: '#2EE5AC'}} className={s.nav} to="/result">Result</NavLink>
                :  <NavLink style={{background: '#7D7D7D'}} className={s.nav} to="/finalize">Finalize</NavLink>
            }
        </section>
    )
})

//todo локига фильтрации по алфавиту name, type and site ( в компоненте после получения данных),
// фильтрация status - ASC: Online, Paused, Stopped, Draft DESC: Draft, Stopped, Paused, Online
// фильтрация по поиску
