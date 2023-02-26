import Cookies from "js-cookie"
import qs from 'qs'

type BodyType = {
    email?: string,
    password?: string,
    token?: string
    name?: string,
    state?: string,
    id?: string,
    other?: boolean

}

const BASE_API = 'http://localhost:5000'

const apiFetchPost = async (endPoint: string, body: BodyType) => {

    let token = Cookies.get('token') 
    
    const res = await fetch(BASE_API+endPoint, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer${token}`
        },
        //'x-access-token':
        body: JSON.stringify(body)
    })
    
    const json = await res.json()

    /*if(json.notallowed) {
        go to /signin
    }
    */
    console.log(json)

    return json
    
}


const apiFetchGet = async (endPoint: string, body: BodyType = {}) => {

    let token = Cookies.get('token') 
    
    const res = await fetch(`${BASE_API+endPoint}?${qs.stringify(body)}`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer${token}`
        },
        //'x-access-token':        
    })
    
    const json = await res.json()

    /*if(json.notallowed) {
        go to /signin
    }
    */
    console.log(json)

    return json
    
}



const BravoStoreAPI = {

    login: async (email: string, password: string) => {

        const json = await apiFetchPost('/user/signin', {email: email, password: password}) 

        return json

    },

    register: async (name: string, email: string, password: string, state: string) => {

        const json = await apiFetchPost('/user/signup', {email: email, password: password, name: name, state: state}) 

        return json

    },

    getStates: async () => {

        const json = await apiFetchGet('/states', {})         
        return json.states

    },
    
    getCategories: async () => {

        const json = await apiFetchGet('/categories', {})         
        return json.categories

    },

    getAds: async (options: {}) => {

        const json = await apiFetchGet('/ad/list', options) 

        return json

    },

    getAd: async (id: string, otherAds=false) => {
        const json = await apiFetchGet('/ad/item', {id: id, other: otherAds})
        return json
    }
    
}

export default () => BravoStoreAPI