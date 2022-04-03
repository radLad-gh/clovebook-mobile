import React from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { Card, Divider, Searchbar, Button, Title } from "react-native-paper";
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
        <Featured imageSrc="https://picsum.photos/700" title="Discover" loadScreen={() => {navigation.navigate('Discover')}} />  
        <HomeSearchBar></HomeSearchBar>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: -5,}}>
          <Text style={{alignSelf: 'center', fontSize: 20, color: theme.colors.text}}>
            Recent Favorites
          </Text>
          <Button 
            onPress={() => {navigation.navigate('Favorites')}}
            color={theme.colors.text} compact={true}
            style={{alignSelf: 'center', marginBottom: -5}}>
              View More
          </Button>
        </View>
        <RecipeCard sID={0} cbID={0} name={""} savedAt={""}></RecipeCard>
        <RecipeCard sID={0} cbID={0} name={""} savedAt={""}></RecipeCard> 
        <RecipeCard sID={0} cbID={0} name={""} savedAt={""}></RecipeCard>    
      </ScrollView>
    );
}
  
export default HomeTab;