import React from "react";
import { 
  View, 
  Text, 
  Dimensions, 
  ScrollView 
} from "react-native";
import {
  Divider
} from 'react-native-paper';
import { theme } from '../themes/Theme';

import { Navigation } from '../types';
import Featured from '../components/Featured';
import RecipeCard from '../components/RecipeCard';

type TabProps = {
  navigation: Navigation,
  screenName: string
};

function DiscoverTab({ navigation, screenName }: TabProps) {
    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;
    return (
      <ScrollView style={{flexGrow: 1, backgroundColor: theme.colors.background, paddingLeft: 15, paddingRight: 15, }}>
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
    );
  }
  
export default DiscoverTab;