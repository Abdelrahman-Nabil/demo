import React, { useEffect, useState } from 'react'
import { SET_DATA } from '../redux/actions/types'
import { useDispatch } from 'react-redux'
import { NETWORK } from '../configs/network'
export const useGetData = () => {

    const [data, setData] = useState({})
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const storeDispatch = useDispatch()
    const handler = (id) => {
        setLoading(true)
        setError(false)
        NETWORK.GET(`albums/${id}/photos`)
            .then((data) => {
                console.log('data', data)
                storeDispatch({ type: SET_DATA, payload: data })
                setLoading(false)
                setError(false)
            })
            .catch((error) => {
                console.log('error', error)
                setError(error)
                setLoading(false)
            })
    }
    return { error, loading, handler }
}