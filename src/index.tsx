import * as React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from "@react-navigation/drawer";

import Splash from './screen/Splash';
import Login from './screen/Login';
import Home from'./screen/Home';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Dummy variable to get into the app.
// false is unauthorized access while true meaning we have access.
const tokenVal = true;

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      {tokenVal == false ? 
      ( <Drawer.Screen name="Login" component={Login} options={{headerShown: false}}/> ) :
      ( <Drawer.Screen name="Home" component={Home} /> )}
    </Drawer.Navigator>
  )
}

const App = () => {
  return (
    <>
      <NavigationContainer>
        <DrawerNavigator />
        {/* 
        <Stack.Navigator initialRouteName="Login" >
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>
          <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        </Stack.Navigator> 
        */}
      </NavigationContainer>
    </>
  )
}

export default App;