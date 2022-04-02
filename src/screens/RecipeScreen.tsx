import React from "react";
import { View, Text, Dimensions } from "react-native";
import { Recipe, SimpleRecipe } from "../api/models";
import * as Theme from '../themes/Theme';


export default function RecipeScreen(props: Recipe) {
    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;
    return (
      <View style={{padding: 15, backgroundColor:Theme.colors.background,height:height, justifyContent: 'flex-start', alignItems: 'center' }}>
        <Text>{props.name}</Text>
        <Text>{props.readyInMinutes}</Text>
        <Text>{props.tags}</Text>
      </View>
    );
  }
