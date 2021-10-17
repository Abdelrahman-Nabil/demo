import React, { useState, useEffect } from 'react'
import { Text, FlatList, Image, ActivityIndicator, Dimensions, View } from 'react-native'
import { useGetDetails } from '../hooks'
import { useSelector } from 'react-redux'
import { translator } from '../localization'

let { width, height } = Dimensions.get('window')
export default Details = (props) => {

    const { data, error, loading, handler } = useGetDetails()
    let { id , image, title } = props.route.params

    useEffect(() => {
        handler(id)
    }, [])
    const renderRow = (col1, col2) => (
        <View style = {styles.rowContainer}>
            <Text style = {styles.col1}>{col1}{': '}</Text>
            <Text style = {styles.col2}>{col2}</Text>
        </View>
    )
    const renderItem = ({ item, index }) => (
       <View style = {styles.itemContainer}>
            <Image 
                source = {{ uri: item.url }}
                style = {styles.itemImage}
                loadingIndicatorSource = {{ uri: item.thumbnailUrl }}
            />
                <Text numberOfLines = {2} style = {styles.itemText}>
                    {item.title}
                </Text>
       </View>
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
        if (!data)
            return (
                <Text style = {styles.emptyStateText}>{translator.translate('noPhotos')}</Text>
            )
        return null
    }
    return (
        <View style = {styles.container}>
            <Image source = {{ uri: image }} style = {styles.img}/>
            {emptyState()}
            <View style = {styles.textContainer}>
                <Text style = {styles.title}>
                    {title}
                </Text>
                {renderRow(translator.translate('name'), data.name)}
                {renderRow(translator.translate('email'), data.email)}
                {renderRow(translator.translate('phone'), data.phone)}
                {renderRow(translator.translate('website'), data.website)}
            </View>

        </View>
    )
}

const styles = {
    container: {
        flex: 1,
    },
    img: {
        width: width,
        height: height * 0.35
    },
    textContainer: {
        width: width * 0.95,
        alignSelf: 'center',
        marginTop: 10
    },
    errorText: {
        alignSelf: 'center',
        color: 'red'
    },
    emptyStateText: {
        alignSelf: 'center',
        color: 'red'
    },
    title: {
        padding: 4,
        flexWrap: 'wrap',
        fontSize: 14,
        textAlign: 'left',
        marginBottom: 5
    },
    col1: {
        fontWeight: 'bold',
        fontSize: 18,
        marginVertical: 4
    },
    col2: {
        fontSize: 14,
        textAlign: 'left'
    },
    rowContainer: {
        marginBottom: 15
    }
}