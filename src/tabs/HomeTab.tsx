import React from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { Card, Divider, Searchbar, Button } from "react-native-paper";
import HomeSearchBar from '../components/HomeSearchBar';
import RecipeCard from "../components/RecipeCard";
import Featured from "../components/Featured";
import { theme } from '../themes/Theme';

import { Navigation } from '../types';

type TabProps = {
  navigation: Navigation,
  screenName: string
};

function HomeTab({ navigation, screenName }: TabProps) {
    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;
    return (
      <ScrollView style={{flexGrow: 1, backgroundColor: theme.colors.background, paddingLeft: 15, paddingRight: 15, }}>
        <Featured />  
        <HomeSearchBar></HomeSearchBar>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{alignSelf: 'center', fontSize: 20,}}>Favorites</Text>
          <Button style={{alignSelf: 'center'}}>View More</Button>
        </View>
        <RecipeCard sID={0} cbID={0} name={""} savedAt={""}></RecipeCard>
        <RecipeCard sID={0} cbID={0} name={""} savedAt={""}></RecipeCard> 
        <RecipeCard sID={0} cbID={0} name={""} savedAt={""}></RecipeCard>
        <RecipeCard sID={0} cbID={0} name={""} savedAt={""}></RecipeCard>    
      </ScrollView>
    );
  }
  
export default HomeTab;