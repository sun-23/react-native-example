import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Alert, ActivityIndicator } from 'react-native';
import { Card, FAB } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'

const Home = ({navigation}) => {

    // const [data,setData] = useState([])
    // const [loading,setLoading] = useState(true)

    const dispatch = useDispatch()
    //Get data
    const { data, loading } = useSelector((state) => {
        return state
    })

    console.log(data,loading) 

    const fetchData = () => {
        fetch('http://10.0.2.2:4000/')
        .then(res => res.json())
        .then(data => {
            console.log(data)
            // setData(data)
            // setLoading(false)
            
            //setData
            dispatch({ type:'ADD_DATA',payload: data })
            dispatch({ type:'SET_LOADING',payload: false })

        }).catch(err=>{
            Alert.alert('please connect internet'+err)
        })
    }

    useEffect(() => {
        fetchData()
    },[])


    const ListItem = (item) => {
        return (
            <Card style={styles.card} onPress={() => navigation.navigate('Profile', { item: item })}>
                <View style={styles.cardView}>
                    <Image 
                        style={styles.image}
                        source={{ uri: item.picture }}
                    />
                    <View style={{ marginLeft:10 }}>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text style={styles.text}>{item.position}</Text>
                    </View>
                </View>
           </Card>
        )
    }

    return(
        <View style={styles.root}>
             <FlatList 
                data={data}
                renderItem={({item})=>{
                    return ListItem(item)
                }}
                keyExtractor={item => item._id}
                onRefresh={fetchData}
                refreshing={loading}
              />
            <FAB
                style={styles.fab}
                icon="plus"
                theme={{ colors:{ accent:'#006aff' } }}
                onPress={() => navigation.navigate('Create')}
            />
        </View>
    )
}

export default Home;
  
const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    card: {
      margin: 5,
      padding: 5,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
    },
    cardView: {
        flexDirection: "row",
        padding: 5,
    },
    text: {
        fontSize: 18,
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});