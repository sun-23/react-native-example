import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants'
import Home from './screens/Home';
import CreateEmpoyee from './screens/CreateEmpoyee';
import Profile from './screens/Profile';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { reducer } from './reducers/reducer'

const store = createStore(reducer)
const Stack = createStackNavigator();

const Navigator = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <App />
    </NavigationContainer>
    </Provider>
  )
}

const optionHeader = { 
  title: 'My Employee',
  headerTintColor: '#fff',
  headerStyle:{
    backgroundColor: '#006aff'
  }
}

function App() {
  return (
    <View style={styles.container}>
      {/* <Home /> ( Ctrl + / ) to comment*/} 
      <Stack.Navigator>
        <Stack.Screen 
          name='Home' 
          component={Home} 
          options={optionHeader}
        />
        <Stack.Screen 
          name='Create' 
          component={CreateEmpoyee} 
          options={{...optionHeader, title: 'Create Employee'}}
        />
        <Stack.Screen 
          name='Profile' 
          component={Profile} 
          options={{...optionHeader, title: 'Profile'}}
        />
      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
});

export default Navigator;
