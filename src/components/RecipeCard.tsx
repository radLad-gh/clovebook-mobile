import { SimpleRecipe } from "../api/models";
import React from "react";
import { Button, Card } from 'react-native-paper';
import FavButton from '../components/FavButton';
import * as Theme from '../themes/Theme';
import styles from '../themes/Theme';

function loadCard() {
    
}

function addFavorite() {
    
}

export function RecipeCard(props: SimpleRecipe) {
    return (
        <Card onPress={loadCard} onLongPress={addFavorite} style={styles.card}>
        <Card.Title title="Recipe Title" subtitle="Recipe Subtitle" />
        <FavButton></FavButton>
        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      </Card>
    );
}


export default RecipeCard;
