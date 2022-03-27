import React from "react";
import { View, Text, Dimensions } from "react-native";
import { Searchbar } from "react-native-paper";
import styles from '../themes/Theme';


function HomeScreen() {
    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;
    return (
      <View style={{padding: 15, backgroundColor:styles.colors.backgroundColor ,height:height, justifyContent: 'flex-start', alignItems: 'center' }}>
        <Searchbar style={{top:0}} placeholder="Search for a recipe!"></Searchbar>
      </View>
    );
  }
  
export default HomeScreen;
