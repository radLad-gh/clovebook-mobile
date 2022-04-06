import React from "react";
import { 
  View, 
  Text, 
  Dimensions, 
  ScrollView 
} from "react-native";
import {
  Button
} from 'react-native-paper';
import { theme } from '../themes/Theme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Navigation } from '../types';
import Featured from '../components/Featured';
import RecipeCard from '../components/RecipeCard';

type TabProps = {
  navigation: Navigation,
  getHeaderStatus: Function,
  setHeaderStatus: Function,
};

const Stack = createNativeStackNavigator();

const Content = ({ navigation, getHeaderStatus, setHeaderStatus } : TabProps) => {
  console.log(`CONTENT: ${getHeaderStatus}`);
  return (
    <ScrollView style={{flexGrow: 1, backgroundColor: theme.colors.background, paddingLeft: 15, paddingRight: 15, }}>
      <Button 
        onPress={() => {
          navigation.navigate("RecipeScreen");
          setHeaderStatus(!getHeaderStatus());
        }
        }>PRESS MEE
      </Button>
      <Featured imageSrc="https://picsum.photos/700" title="Seasonal recipes" loadScreen={() => {console.log(`Clicked: discover`)}} />  
      <Featured imageSrc="https://picsum.photos/700" title="Find new with favorites" loadScreen={() => {console.log(`Clicked: discover`)}} />  
      <Featured imageSrc="https://picsum.photos/700" title="Random" loadScreen={() => {console.log(`Clicked: discover`)}} />
      <View style={{ marginTop: 10,}}>
        <Text style={{ fontSize: 20, color: theme.colors.text }}>Featured Dishes</Text>
        <RecipeCard sID={0} cbID={0} name={""} savedAt={""}></RecipeCard>
        <RecipeCard sID={0} cbID={0} name={""} savedAt={""}></RecipeCard>
        <RecipeCard sID={0} cbID={0} name={""} savedAt={""}></RecipeCard>
        <RecipeCard sID={0} cbID={0} name={""} savedAt={""}></RecipeCard>
        <RecipeCard sID={0} cbID={0} name={""} savedAt={""}></RecipeCard>
      </View>
    </ScrollView>
   
  )
}

function DiscoverTab({ navigation, getHeaderStatus, setHeaderStatus }: TabProps) {
    console.log(`DISCOVER TAB: ${getHeaderStatus}`);
    return (
      <Stack.Navigator>
        <Stack.Screen name="DiscoverScreen" component={Content} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="RecipeScreen" 
          children={() => 
            <Content 
              navigation={navigation} 
              getHeaderStatus={getHeaderStatus} 
              setHeaderStatus={setHeaderStatus} 
            />}
        ></Stack.Screen>
      </Stack.Navigator>
    );
}
  
export default DiscoverTab;