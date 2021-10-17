import React, { useState, useEffect } from 'react'
import { Text, FlatList, Image, ActivityIndicator, Dimensions, TouchableHighlight, View } from 'react-native'
import { useGetData } from '../hooks'
import { useSelector } from 'react-redux'

let { width, height } = Dimensions.get('window')
export default Photos = (props) => {

    //const [photos, setPhotos] = useState([])
    //const [loading, setLoading] = useState(true)
    //const [error, setError] = useState('')
    const { error, loading, handler } = useGetData()
    const store = useSelector((state) =>({
        photos: state.data
    }))
    let id = 1 // just one random album
    useEffect(() => {
        handler(id)
        // NETWORK.GET(`albums/${id}/photos`, (data) => {
        //     setPhotos(data)
        //     setLoading(false)
        // }, (error) => {
        //     setLoading(false)
        //     setError(error)
        // })
    }, [])
    const renderItem = ({ item, index }) => (
       <TouchableHighlight 
        onPress = {() => props.navigation.navigate('Details', {
            id,
            title: item.title,
            image: item.url
        })}
        style = {styles.itemContainer}>
            <>
                <Image 
                    source = {{ uri: item.url }}
                    style = {styles.itemImage}
                    loadingIndicatorSource = {{ uri: item.thumbnailUrl }}
                />
                <Text numberOfLines = {2} style = {styles.itemText}>
                    {item.title}
                </Text>
            </>
       </TouchableHighlight>
    )
    const emptyState = () => {
        if (loading)
            return (
                <ActivityIndicator color = '#000' size = 'large'/>
            )
        if (error)
            return (
                <Text style = {styles.errorText}>{'Something Went Wrong: ' + error}</Text>
            )
        return (
            <Text style = {styles.emptyStateText}>No Photos</Text>
        )
    }
    return (
        <FlatList
            numColumns = {2}
            data={store.photos}
            ListEmptyComponent = {emptyState}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
        />
    )
}

const styles = {
    emptyStateText: {
        fontSize: 18,
        alignSelf: 'center',
        padding: 12,
        textAlign: 'center'
    },
    errorText: {
        fontSize: 18,
        color: '#ff0000',
        alignSelf: 'center',
        padding: 12,
        textAlign: 'center'

    },
    itemImage: {
        width: width * 0.45,
        height: width * 0.45
    },
    itemContainer: {
        alignItems: 'center',
        marginTop: 10,
        flex: 1,
    },
    itemText: {
        marginTop: 2,
        flexWrap: 'wrap',
        maxWidth: width * 0.45,
        textAlign: 'center' 
        //alignSelf: 'flex-start'
       
    }
}