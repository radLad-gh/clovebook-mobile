import { Stack } from "../components/Stack";
import { Divider } from "react-native-paper";
import { SimpleRecipe } from "../api/models";
import { RecipeCard } from "../components/RecipeCard";

interface RecipeGridProps {
	recipes: SimpleRecipe[];
}

export function RecipeStack({ recipes }: RecipeGridProps) {
	return (
		<Stack divider={<Divider />}>
			{recipes.map((recipe, i) => (
				<RecipeCard {...recipe} key={i} />
			))}
		</Stack>
	);
}
