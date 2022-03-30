import React from "react";
import { View, Text, Dimensions } from "react-native";
import { theme } from '../themes/Theme';

import { Navigation } from '../types';

type TabProps = {
  navigation: Navigation,
  screenName: string
};

function FavoritesTab({ navigation, screenName }: TabProps) {
    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;
    return (
      <View style={{padding: 15, backgroundColor: theme.colors.background ,height:height, justifyContent: 'flex-start', alignItems: 'center' }}>
        <Text>Favorites!</Text>
      </View>
    );
  }
  
export default FavoritesTab;