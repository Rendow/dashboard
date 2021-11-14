import {useEffect} from "react";


const Result = () => {

    useEffect(() => {
        document.title = 'Result'
    }, [])

    return (
        <div>Result</div>
    )
}
export default Result