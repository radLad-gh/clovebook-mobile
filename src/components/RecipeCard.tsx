import { SimpleRecipe } from "../api/models";
import React from "react";
import { Button, Card } from 'react-native-paper';
import * as Theme from '../themes/Theme';
import styles from '../themes/Theme';
import { useNavigation } from '@react-navigation/native';

export default function RecipeCard(props: SimpleRecipe, screenName: string) {
    
    const navigation = useNavigation();
    return (
        <Card style={styles.card}>
          <Card.Title title={props.name} subtitle={props.readyInMinutes} />
          <Card.Cover source={
            { uri: 
                (props.imageURL 
                    ? props.imageURL
                    : 'https://picsum.photos/700'
                )
            }} />
        </Card>
    );
}
