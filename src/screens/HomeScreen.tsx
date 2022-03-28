import React from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { Card, Divider, Searchbar } from "react-native-paper";
import HomeSearchBar from '../components/HomeSearchBar';
import RecipeCard from "../components/RecipeCard";
import styles from '../themes/Theme';


function HomeScreen() {
    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;
    return (
      <ScrollView style={{flexGrow: 1, backgroundColor:'#e2ddf9', paddingLeft: 15, paddingRight: 15, }}>
        <HomeSearchBar></HomeSearchBar>
        <Divider></Divider>
        <RecipeCard sID={0} cbID={0} name={""} savedAt={""}></RecipeCard>       
      </ScrollView>
    );
  }
  
export default HomeScreen;
