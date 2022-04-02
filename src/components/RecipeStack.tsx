import { SimpleRecipe } from "../api/models";
import RecipeCard from "../components/RecipeCard";
import React from "react";
import { View } from 'react-native';

interface RecipeStackProps {
	recipes: SimpleRecipe[];
}

export default function RecipeStack({ recipes }: RecipeStackProps) {
	return (
		<View>
			{
				recipes.map((recipe, i) => (<RecipeCard {...recipe} key={i} />))
			}
		</View>
	);
}
