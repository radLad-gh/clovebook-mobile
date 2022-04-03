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


const loadScreen = () => {
    
}

const cardDimentionConstant = 150;

export function Featured() {
    return (
        <Card onPress={loadScreen} onLongPress={loadScreen} style={ styles.card }>
            <Card.Cover source={{ uri: 'https://picsum.photos/700' }} style={ styles.cardCover } />
            <Card.Title title="Recipe Title" style={ styles.cardHeading }/>   
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
    borderRadius: 7,
  },

  cardCover: {
    display: 'flex',
    borderRadius: 7,
    position: 'absolute',
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  
  cardHeading: {
    top: 100,
    color: theme.colors.error, // font color not changing?
  }
});

export default Featured;