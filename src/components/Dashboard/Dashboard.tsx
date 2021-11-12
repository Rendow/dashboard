import {StateContext} from "../../store/ContextProvider";
import {TestType} from "../../store/reducer";
import s from './dashboard.module.scss'

export  const Dashboard = () => {
const {dispatch} = StateContext()
const {state} = StateContext()

    const showContent = state.length

    return (
        <main className={s.dashboard}>
            <h1>Dashboard </h1>
            <input type="text"/>
            {showContent && <ul >{state.map(obj => {
                return <li>
                    <Test id={obj.id} type={obj.type}
                          status={obj.status} siteId={obj.siteId}
                          name={obj.name} key={obj.id}/>
                </li>

            })}
            </ul>

            }
        </main>
    )
}


const Test = ({id,status,siteId,type,name}:TestType) => {
  return (
      <section className={s.test}>
          <div> {id}</div>
          <div> {status}</div>
          <div> {siteId}</div>
          <div> {type}</div>
          <div> {name}</div>
      </section>
  )
}