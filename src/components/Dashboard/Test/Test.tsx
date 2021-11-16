import classNames from 'classnames';
import React from 'react';
import { NavLink } from 'react-router-dom';
import s from './test.module.scss'


export type TestTypeWithUrl = {
    id: number;
    name: string;
    type: string;
    status: string;
    siteId:number;
    url: string | undefined
    urlId:number | undefined
}
export const Test = React.memo(({id, status, type, name,url,urlId}: TestTypeWithUrl) => {

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


    return (
        <section className={s.test}>
            <div className={classNames(s.bookmark,{
                [s.crimson]: url === 'market.company.com',
                [s.purple]: url === 'games.company.com',
                [s.violet]: url === 'delivery.company.com',
            })}
            />
            <div className={s.name}> {name}</div>
            <div className={s.type}> {modifyType}</div>
            <div  className={classNames(s.status,{
            [s.red]: status === 'Stopped',
            [s.green]: status === 'Online',
            [s.orange]: status === 'Paused',
            })}> {status}</div>
            <div className={s.site}> {url}</div>
            {id % 2
                ?  <NavLink style={{background: '#2EE5AC'}} className={s.nav} to={"/result/" + id}>Result</NavLink>
                :  <NavLink style={{background: '#7D7D7D'}} className={s.nav} to={"/finalize/" + id}>Finalize</NavLink>
            }
        </section>
    )
})


