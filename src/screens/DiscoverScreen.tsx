import React from "react";
import { View, Text, Dimensions } from "react-native";
import * as Theme from '../themes/Theme';


function DiscoverScreen() {
    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;
    return (
      <View style={{padding: 15, backgroundColor:Theme.colors.background,height:height, justifyContent: 'flex-start', alignItems: 'center' }}>
        <Text>Discover!</Text>
      </View>
    );
  }
  
export default DiscoverScreen;
