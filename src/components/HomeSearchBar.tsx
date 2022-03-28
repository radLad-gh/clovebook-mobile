import React from 'react';
import { Searchbar } from 'react-native-paper';
import styles from '../themes/Theme';

function HomeSearchBar() {
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = (query:string) => setSearchQuery(query);
    
    return (
        <Searchbar 
          style={styles.searchBar} 
          placeholder="Search for a recipe!" 
          onChangeText={onChangeSearch} 
          value={searchQuery}
          autoComplete={false}
        />
    );
    
}

export default HomeSearchBar;