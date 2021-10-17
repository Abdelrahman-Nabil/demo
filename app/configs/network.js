import axios from 'axios'
import { API_ENDPOINT, API_KEY } from './constants'

export const NETWORK = {
    GET: (url) => {
        return new Promise((resolve, reject) => {
            axios.get(API_ENDPOINT + url) 
            .then((response) => {
                resolve(response.data)
            })
            .catch((error) => {
               reject(error)
            })
        })
    }
}