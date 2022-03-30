import React from "react";
import { View, Text, Dimensions } from "react-native";
import { theme } from '../themes/Theme';


function DiscoverTab() {
    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;
    return (
      <View style={{padding: 15, backgroundColor: theme.colors.background ,height:height, justifyContent: 'flex-start', alignItems: 'center' }}>
        <Text>Discover!</Text>
      </View>
    );
  }
  
export default DiscoverTab;