import React, { useState } from "react";
import { Searchbar } from "react-native-paper";
import { getRecipes } from "../api/requests";
import styles from "../themes/Theme";
import { theme } from "../themes/Theme";

function QueryBar({ submit }: { submit: Function }) {
	const [searchQuery, setSearchQuery] = useState("");

	const updateQuery = () => {
		submit(searchQuery);
	};

	return (
		<Searchbar
			style={styles.searchBar}
			clearTextOnFocus={true}
			placeholder="Search for a recipe!"
			onChangeText={setSearchQuery}
			value={searchQuery}
			autoComplete={false}
			iconColor={theme.colors.accent}
			onSubmitEditing={updateQuery}
		/>
	);
}

export default QueryBar;
