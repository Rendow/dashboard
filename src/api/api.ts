import axios from "axios"

const instance = axios.create({baseURL:  'http://localhost:3100/'})

export const API = {
       getTests(){
         return  instance.get('tests')
       },
    getTestsById(id:number){
        return  instance.get(`tests/${id}`)
    },
    getSites(){
        return  instance.get('sites')
    },
    getSitesById(id:number){
        return  instance.get(`tests/${id}`)
    },
}
