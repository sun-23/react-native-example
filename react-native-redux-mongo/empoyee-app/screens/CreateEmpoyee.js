import React, { useState } from 'react';
import { StyleSheet, Text, View, Modal, Alert, KeyboardAvoidingView } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


const CreateEmpoyee = ({navigation,route}) => {

    const getDetails = (type) => {
        if(route.params){
            switch(type){
                case 'name':
                    return route.params.item.name;
                case 'phone':
                    return route.params.item.phone;
                case 'email':
                    return route.params.item.email;
                case 'salary':
                    return route.params.item.salary;
                case 'picture':
                    return route.params.item.picture;
                case 'position':
                    return route.params.item.position;
            }
        }
        return ""
    }

    const [name,setName] = useState(getDetails('name'));
    const [phone,setPhone] = useState(getDetails('phone'));
    const [email,setEmail] = useState(getDetails('email'));
    const [salary,setSalary] = useState(getDetails('salary'));
    const [picture,setPicture] = useState(getDetails('picture'));
    const [position,setPosition] = useState(getDetails('position'));
    const [modal,setModal] = useState(false);
    const [enableShift,setEnableShift] = useState(false);

    const pickImageGallery = async () => {
       const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL)
       if(granted){
           let data = await ImagePicker.launchImageLibraryAsync({
               mediaTypes:ImagePicker.MediaTypeOptions.Images,
               allowsEditing:true,
               aspect:[1,1],
               quality:1
           })

           console.log(data)
           if(!data.cancelled){
            let newfile = { 
                uri:data.uri, 
                type:'test/'+ data.uri.split('.')[1], 
                name:'test.'+ data.uri.split('.')[1] 
            }

            handleUpload(newfile)
            }

       }else{
           Alert.alert('You need to give up permision to use image')
       }
    }

    const pickImageCamera = async () => {
        const { granted } = await Permissions.askAsync(Permissions.CAMERA)
        if(granted){
            let data = await ImagePicker.launchCameraAsync({
                mediaTypes:ImagePicker.MediaTypeOptions.Images,
                allowsEditing:true,
                aspect:[1,1],
                quality:1
            })
 
            console.log(data)
            if(!data.cancelled){
                let newfile = { 
                    uri:data.uri, 
                    type:'test/'+ data.uri.split('.')[1], 
                    name:'test.'+ data.uri.split('.')[1] 
                }

                handleUpload(newfile)
            }

        }else{
            Alert.alert('You need to give up permision to use image')
        }
    }

    const handleUpload = (image) => {
        const data = new FormData()
        data.append('file', image)
        data.append('upload_preset','employeeApp')
        data.append('cloud_name','sun-23-cloud')

        fetch('https://api.cloudinary.com/v1_1/sun-23-cloud/image/upload',{
            method:"post",
            body: data
        }).then(response => response.json())
        .then(data => {
            console.log(data)
            setPicture(data.url)
            setModal(false)
        })
    }

    const summitdata = () => {
        fetch('http://10.0.2.2:4000/send-data',{
            method: 'post',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                name,
                email,
                phone,
                picture,
                salary,
                position
            })
        }).then(res=>res.json())
        .then(data => {
            Alert.alert('save ' + data.name + ' success')
            navigation.goBack()
        })
    }

    const updateData = () => {
        fetch('http://10.0.2.2:4000/update',{
            method: 'post',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                id:route.params.item._id,
                name,
                email,
                phone,
                picture,
                salary,
                position
            })
        }).then(res=>res.json())
        .then(data => {
            Alert.alert('update ' + data.name + ' success')
            navigation.navigate('Home')
        })
    }

    return (
        <KeyboardAvoidingView behavior="position" enabled={enableShift} style={styles.root}>
        <View>
            <TextInput
                style={styles.input}
                mode="outlined"
                label='Name'
                value={name}
                theme={theme}
                onFocus={() => setEnableShift(false)}
                onChangeText={text => setName(text)}
            />
            <TextInput
                style={styles.input}
                mode="outlined"
                label='Phone'
                keyboardType='number-pad'
                value={phone}
                theme={theme}
                onFocus={() => setEnableShift(false)}
                onChangeText={text => setPhone(text)}
            />
            <TextInput
                style={styles.input}
                mode="outlined"
                label='Email'
                value={email}
                theme={theme}
                onFocus={() => setEnableShift(false)}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                mode="outlined"
                label='Salary'
                value={salary}
                onFocus={() => setEnableShift(true)}
                theme={theme}
                onChangeText={text => setSalary(text)}
            />
            <TextInput
                style={styles.input}
                mode="outlined"
                label='Position'
                value={position}
                onFocus={() => setEnableShift(true)}
                theme={theme}
                onChangeText={text => setPosition(text)}
            />

            <Button 
                theme={theme}
                icon={picture ? 'check' : 'upload'}
                mode="contained" 
                onPress={() => setModal(true)}
                style={styles.input}
            >
                Select Photo
            </Button>

            {route.params ?
                <Button 
                theme={theme}
                icon="content-save" 
                mode="contained" 
                onPress={updateData}
                style={styles.input}
                >
                update
                </Button> :
                <Button 
                theme={theme}
                icon="content-save" 
                mode="contained" 
                onPress={summitdata}
                style={styles.input}
                >
                Save
                </Button>
            }
            <Modal
                animationType='slide'
                transparent={true}
                visible={modal}
                onRequestClose={() => setModal(false)}
            >
                <View style={styles.modalView}>

                    <View style={styles.modalBtn}>
                        <Button 
                            icon="camera" 
                            mode="contained" 
                            onPress={() => pickImageCamera()}
                            theme={theme}
                        >
                            camera
                        </Button>
                        <Button 
                            icon="image-area" 
                            mode="contained" 
                            onPress={() => pickImageGallery()}
                            theme={theme}
                        >
                            gallery
                        </Button>
                    </View>

                    <Button 
                        theme={{ colors:{ primary:'#d63447' } }}
                        onPress={() => setModal(false)}
                    >
                        Cancel
                    </Button>

                </View>
            </Modal>
        </View>
        </KeyboardAvoidingView>
    )
}

const theme = {
    colors:{
        primary: '#006aff'
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    input: {
        margin: 10,
    },
    modalView: {
        position: "absolute",
        bottom: 5,
        width: "100%",
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    modalBtn: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
        marginTop: 15,
    },
})

export default CreateEmpoyee;