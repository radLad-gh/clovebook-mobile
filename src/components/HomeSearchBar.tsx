import React, { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { getRecipes } from '../api/requests';
import styles from '../themes/Theme';
import * as Theme from '../themes/Theme';

function HomeSearchBar({submit}: {submit: Function}) {
    const [searchQuery, setSearchQuery] = useState('');
    
    const updateQuery = () => {
      submit(searchQuery);
    }
    
    return (
        <Searchbar 
          style={styles.searchBar}
          clearTextOnFocus={true}
          placeholder="Search for a recipe!"
          onChangeText={setSearchQuery}
          value={searchQuery}
          autoComplete={false}
          iconColor={Theme.colors.accent}
          onSubmitEditing={updateQuery}
        />
    );
}

export default HomeSearchBar;