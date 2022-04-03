import { SimpleRecipe } from "../api/models";
import React from "react";
import {
  StyleSheet,
  View,
  Text
} from "react-native";
import { 
  Button, 
  Card,
} from 'react-native-paper';
import { theme } from '../themes/Theme';
import Ionicons from '@expo/vector-icons/Ionicons';


const loadCard = () => {
    
}

const addFavorite = () => {
    
}

const Time = ({numericTime} : any) => {
  let mag; // magnitude of time.
  if(numericTime < 60) 
    mag = 'm'
  else {
    numericTime = Math.floor(numericTime / 60);
    mag = 'h'; 
  }
  
  return (
    <Text style={{alignSelf: 'flex-end', paddingRight: 15, top: 10, }}>{numericTime}{mag}</Text>
  )
}

const cardDimentionConstant = 110;

export function RecipeCard(props: SimpleRecipe) {
    return (
        <Card onPress={loadCard} onLongPress={addFavorite} style={ styles.card }>
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={ styles.cardCover } />
          <View style={styles.cardInfo}>
            <Card.Title title="Recipe Title" subtitle="Recipe Subtitle" />
            <Time numericTime={40} />
            <Button style={{top: -25, left: -cardDimentionConstant}}><Ionicons name='star-outline' size={25} color={theme.colors.selected} /></Button>
          </View>
          
      </Card>
    );
}

const styles = StyleSheet.create({
  card: {
    display: "flex",
    flexDirection: 'column',
    backgroundColor: theme.colors.surface,
    marginTop: 10,
    height: cardDimentionConstant,
  },

  cardCover: {
    borderBottomRightRadius: 5,
    position: 'absolute',
    resizeMode: 'contain',
    height: '100%',
    width: cardDimentionConstant,
  },
  
  cardInfo: {
    marginTop: -3,
    flexDirection: "column",
    paddingLeft: cardDimentionConstant, // Position absolute, add 125 padding to "fit" correctly.
  }
});

export default RecipeCard;