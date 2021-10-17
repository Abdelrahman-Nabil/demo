import React, { useEffect, useState } from 'react'
import { SET_DATA } from '../redux/actions/types'
import { useDispatch } from 'react-redux'
import { NETWORK } from '../configs/network'
export const useGetDetails = () => {

    const [data, setData] = useState({})
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const storeDispatch = useDispatch()
    const handler = (id) => {
        setLoading(true)
        setError(false)
        NETWORK.GET(`albums/${id}`)
            .then((data) => {
               NETWORK.GET(`users/${data.userId}`)
                .then((data) => {
                    setData(data)
                    setLoading(false)
                    setError(false)
                })
                .catch((error) => {
                    setLoading(false)
                    setError(error)
                })
            })
            .catch((error) => {
                console.log('error', error)
                setError(error)
                setLoading(false)
            })
    }
    return { data, error, loading, handler }
}