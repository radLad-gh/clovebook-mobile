import React from 'react';
import { View, Text, Dimensions, ScrollView, BackHandler } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { theme } from '../themes/Theme';

import { Navigation } from '../types';
import Featured from '../components/Featured';
import RecipeCard from '../components/RecipeCard';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

type RecipeProps = {
	setHeaderStatus: Function;
  // componentName: string;
};

const Recipe = ({
	//   navigation,
	// getHeaderStatus,
	setHeaderStatus,
}: RecipeProps) => {
  const navigation = useNavigation();

	useFocusEffect(
	  React.useCallback(() => {
      const onBackPress = () => {
        setHeaderStatus(true);
        navigation.navigate('HomeTabs' as never);
        return true;
      };
    
      BackHandler.addEventListener('hardwareBackPress', onBackPress);
    
      return () => BackHandler.removeEventListener('hardwareBackPress', onBackPress);
	  }, [])
	);
  
	return (
	  <ScrollView
      style={{
        flexGrow: 1,
        backgroundColor: theme.colors.background,
        paddingLeft: 15,
        paddingRight: 15,
      }}
    >
      <Button
        onPress={() => {
          // navigation.navigate('RecipeScreen');
          setHeaderStatus(true);
        }}
      >
		    PRESS MEE
		  </Button>
	  </ScrollView>
	);
};
  
export default Recipe;