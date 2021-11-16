import React, {useState} from "react";
import s from "./filterBar.module.scss";
import classNames from "classnames";
import arrowIcon from "../../../common/img/arrow.png";

type FilterBarProps = {
    setType: (type: string) => void
    setSortDirection: (dir: boolean) => void
    sortDirection:boolean
}
export const FilterBar = React.memo(({setType,sortDirection,setSortDirection}:FilterBarProps) => {
    return (
        <div className={s.filterBar}>
            <FilterButton sortDirection={sortDirection} setSortDirection={setSortDirection} left={38} type={'name'} setType={setType} />
            <FilterButton sortDirection={sortDirection} setSortDirection={setSortDirection}  type={'type'} setType={setType} />
            <FilterButton sortDirection={sortDirection} setSortDirection={setSortDirection} left={47}  type={'status'} setType={setType} />
            <FilterButton sortDirection={sortDirection} setSortDirection={setSortDirection} left={29} name={'site'} type={'url'} setType={setType} />

        </div>
    )
})
type FilterButtonProps = FilterBarProps & {
    type:string
    name?:string
    left?:number
}
const FilterButton = React.memo(({setType,sortDirection,setSortDirection,type,name,left}:FilterButtonProps)=> {
    const [direction,setDirection] = useState(true)
    const sortByType = () => {
        setType(type)
        setSortDirection(!sortDirection)
        setDirection(!direction)
    }
    return (
        <div>
            <button className={classNames(s.arrow, {[s.arrowSwitch]: direction })}  onClick={sortByType}>
                <div style={{backgroundImage:`url(${arrowIcon})`, left:`${left}px`}}/>{name ? name : type}</button>
        </div>
    )
})