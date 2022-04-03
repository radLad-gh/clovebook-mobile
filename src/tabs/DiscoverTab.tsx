import React from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { theme } from '../themes/Theme';

import { Navigation } from '../types';
import Featured from '../components/Featured';

type TabProps = {
  navigation: Navigation,
  screenName: string
};

function DiscoverTab({ navigation, screenName }: TabProps) {
    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;
    return (
      <ScrollView style={{flexGrow: 1, backgroundColor: theme.colors.background, paddingLeft: 15, paddingRight: 15, }}>
        <Featured />
        <Featured />  
        <Featured />   
      </ScrollView>
    );
  }
  
export default DiscoverTab;