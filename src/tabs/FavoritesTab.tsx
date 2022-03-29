import React from "react";
import { View, Text, Dimensions } from "react-native";
import styles from '../themes/Theme';


function FavoritesTab() {
    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;
    return (
      <View style={{padding: 15, backgroundColor:styles.colors.backgroundColor ,height:height, justifyContent: 'flex-start', alignItems: 'center' }}>
        <Text>Favorites!</Text>
      </View>
    );
  }
  
export default FavoritesTab;