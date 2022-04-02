import React, { useEffect, useState } from "react";
import { Dimensions, ScrollView } from "react-native";
import { Divider } from "react-native-paper";
import { SimpleRecipe } from "../api/models";
import { getRecipes } from "../api/requests";
import HomeSearchBar from '../components/HomeSearchBar';
import RecipeStack from '../components/RecipeStack';
import * as Theme from '../themes/Theme';


function HomeScreen() {
    const [recipes, setRecipes] = useState<SimpleRecipe[]>([]);
    const [searchQuery, setQuery] = useState('');
    
    useEffect(() => {
      getRecipes(searchQuery)
        .then(response => { setRecipes(response) })
        
        console.log(recipes);
    }, [searchQuery])
    
    var width = Dimensions.get('window').width;
    var height = Dimensions.get('window').height;
    return (
      <ScrollView 
          style={
            {flexGrow: 1, backgroundColor: Theme.colors.background, paddingLeft: 15, paddingRight: 15, }}>
        <HomeSearchBar submit={setQuery}></HomeSearchBar>
        <Divider></Divider>
        <RecipeStack recipes={recipes}></RecipeStack>
      </ScrollView>
    );
  }
  
export default HomeScreen;
