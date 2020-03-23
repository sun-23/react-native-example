import React from 'react';
import { StyleSheet, Text, View, Image, Linking, Platform, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { Title, Card, Button } from 'react-native-paper'

const Profile = ({route,navigation}) => {

    const { item } = route.params;
    const { _id } = route.params.item;

    function openDia() {
        if(Platform.OS == 'android'){
            Linking.openURL('tel:' + item.phone)
        } else if (Platform.OS == 'ios'){
            Linking.openURL('telprompt:' + item.phone)
        }
    }

    const deleteEmployee = () => {
        console.log(_id)
        let id = _id
        fetch('http://10.0.2.2:4000/delete',{
            method: 'post',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                id:id
            })
        }).then(res=>res.json())
        .then(data => {
            Alert.alert('delete success')
            navigation.goBack()
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <View style={styles.root}>
            <LinearGradient 
                colors={['#0033ff','#6bc1ff']}
                style={{ height: '20%' }}
            />
            <View style={{ alignItems: 'center' }}>
                <Image 
                    style={{ width: 150, height: 150, borderRadius: 75, marginTop: -50 }}
                    source={{ uri: item.picture }}
                />
            </View>
            <View style={{ alignItems: 'center', margin: 7}}>
                <Title style={{ fontSize: 25 }}>{item.name}</Title>
                <Text style={{ fontSize: 15 }}>{item.position}</Text>
            </View>
            {/* Mail */}
            <Card style={styles.myCard} onPress={() => {
                Linking.openURL("mailto:" + item.email)
            }}>
                <View style={styles.cardContent}>
                    <MaterialIcons name='email' size={32} color='#006aff'/>
                    <Text style={styles.text}>{item.email}</Text>
                </View>
            </Card>
            {/* Phone */}
            <Card style={styles.myCard} onPress={openDia}>
                <View style={styles.cardContent}>
                    <Feather name='smartphone' size={32} color='#006aff'/>
                    <Text style={styles.text}>{item.phone}</Text>
                </View>
            </Card>
            {/* Money */}
            <Card style={styles.myCard}>
                <View style={styles.cardContent}>
                    <MaterialIcons name='attach-money' size={32} color='#006aff'/>
                    <Text style={styles.text}>{item.salary}</Text>
                </View>
            </Card>
            {/* Button */}
            <View style={{ flexDirection: "row", justifyContent:"space-around", marginTop: 5 }}>
                <Button 
                    icon="account-edit" 
                    mode="contained" 
                    theme={theme}
                    onPress={() => navigation.navigate('Create',{item : item})}
                >
                    edit
                </Button>
                <Button 
                    icon="delete" 
                    mode="contained" 
                    onPress={deleteEmployee}
                    theme={theme}
                >
                    fire employee
                </Button>
            </View>
        </View>
    )
}

const theme = {
    colors:{
        primary: '#006aff'
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1
    },
    myCard: {
        margin: 5
    },
    cardContent: {
        flexDirection: "row",
        alignItems: "center",
        padding: 8,
    },
    text: {
        fontSize: 18,
        marginLeft: 5,
    }
})

export default Profile;