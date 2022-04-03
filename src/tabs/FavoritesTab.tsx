import React from "react";
import { 
  View,
  Text,
  Dimensions,
  ScrollView,
} from "react-native";
import { theme } from '../themes/Theme';

import RecipeCard from "../components/RecipeCard";
import { Navigation } from '../types';

type TabProps = {
  navigation: Navigation,
  screenName: string
};

function FavoritesTab({ navigation, screenName }: TabProps) {
    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;
    return (
      <ScrollView style={{flexGrow: 1, backgroundColor: theme.colors.background, paddingLeft: 15, paddingRight: 15, }}>
        <RecipeCard sID={0} cbID={0} name={""} savedAt={""}></RecipeCard>
        <RecipeCard sID={0} cbID={0} name={""} savedAt={""}></RecipeCard> 
        <RecipeCard sID={0} cbID={0} name={""} savedAt={""}></RecipeCard>  
      </ScrollView>
    );
  }
  
export default FavoritesTab;