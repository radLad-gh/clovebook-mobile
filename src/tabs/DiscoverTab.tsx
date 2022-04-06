import React from 'react';
import { View, Text, Dimensions, ScrollView, BackHandler } from 'react-native';
import { Button, IconButton } from 'react-native-paper';
import { theme } from '../themes/Theme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Navigation } from '../types';
import Featured from '../components/Featured';
import RecipeCard from '../components/RecipeCard';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

type TabProps = {
  //   navigation: Navigation;
  // getHeaderStatus: Function;
  setHeaderStatus: Function;
};

const Stack = createNativeStackNavigator();

const DiscoverTab = ({
  setHeaderStatus,
}: TabProps) => {
  return (
    <ScrollView
      style={{
        flexGrow: 1,
        backgroundColor: theme.colors.background,
        paddingLeft: 15,
        paddingRight: 15,
      }}
    >
      <Featured
        imageSrc='https://picsum.photos/700'
        title='Seasonal recipes'
        loadScreen={() => {
          console.log(`Clicked: discover`);
        }}
      />
      <Featured
        imageSrc='https://picsum.photos/700'
        title='Find new with favorites'
        loadScreen={() => {
          console.log(`Clicked: discover`);
        }}
      />
      <Featured
        imageSrc='https://picsum.photos/700'
        title='Random'
        loadScreen={() => {
          console.log(`Clicked: discover`);
        }}
      />
      <View style={{ marginTop: 10 }}>
        <Text style={{ fontSize: 20, color: theme.colors.text }}>
          Featured Dishes
        </Text>
        <RecipeCard props={{sID: 0, cbID: 0, name: '', savedAt: ''}} setHeaderStatus={setHeaderStatus}></RecipeCard>
        <RecipeCard props={{sID: 0, cbID: 0, name: '', savedAt: ''}} setHeaderStatus={setHeaderStatus}></RecipeCard>
        <RecipeCard props={{sID: 0, cbID: 0, name: '', savedAt: ''}} setHeaderStatus={setHeaderStatus}></RecipeCard>
        <RecipeCard props={{sID: 0, cbID: 0, name: '', savedAt: ''}} setHeaderStatus={setHeaderStatus}></RecipeCard>
        <RecipeCard props={{sID: 0, cbID: 0, name: '', savedAt: ''}} setHeaderStatus={setHeaderStatus}></RecipeCard>
      </View>
    </ScrollView>
  );
};

export default DiscoverTab;
