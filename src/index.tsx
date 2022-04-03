import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { 
  Drawer as PaperDrawer, 
  Divider,
  Button,
} from 'react-native-paper';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Splash from './screen/Splash';
import Login from './screen/Login';
import Home from'./screen/Home';
import { theme } from './themes/Theme';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// Dummy variable to get into the app.
// false is unauthorized access while true meaning we have access.
const tokenVal = true;

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
    drawerContent={() => 
      <>
        <View>
          <Text>We can put a greeting and some stuff up here. :):)</Text>
          <Divider />
        </View>
        <View>
          <PaperDrawer.Section title="My Account">
            <Button icon="account" mode="contained" style={styles.drawerButton} onPress={() => console.log('profile screen')}>Profile</Button>
          </PaperDrawer.Section>
          <PaperDrawer.Section title="Other">
            <Button icon="cog" mode="contained" style={styles.drawerButton} onPress={() => console.log('settings screen')}>Settings</Button>
            <View style={{height: 5}}></View>
            <Button icon="help-circle-outline" mode="contained" style={styles.drawerButton} onPress={() => console.log('help screen')}>Help</Button>
          </PaperDrawer.Section>
        </View>
        <Button mode="outlined" style={{marginHorizontal: 10, marginTop: 15}} onPress={() => console.log('log the user out.')}>Log Out</Button>
      </>}
    >
      {tokenVal == false ? 
        ( <Drawer.Screen 
            name="Login" 
            component={Login} 
            options={{headerShown: false}} 
          /> ) :
        ( <Drawer.Screen 
          name="Clovebook" 
          component={Home} 
          options={{
            headerTintColor: theme.colors.text_light, 
              headerStyle: {
              backgroundColor: theme.colors.primary,
            }
          }}
        /> )
      }
      <Drawer.Screen name="Settings" children={() => <Text>Settings screen.</Text>} />
      <Drawer.Screen name="Help" children={() => <Text>Help screen.</Text>} />
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

const styles = StyleSheet.create({
  drawerButton: {
    marginHorizontal: 10,
    paddingVertical: 2,
  }
});

export default App;