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
  getHeaderStatus: Function;
  setHeaderStatus: Function;
};

const Stack = createNativeStackNavigator();

const Content = ({
  //   navigation,
  getHeaderStatus,
  setHeaderStatus,
}: TabProps) => {
  // const navigation = useNavigation();

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
        {/* <RecipeCard sID={0} cbID={0} name={''} savedAt={''}></RecipeCard>
        <RecipeCard sID={0} cbID={0} name={''} savedAt={''}></RecipeCard>
        <RecipeCard sID={0} cbID={0} name={''} savedAt={''}></RecipeCard>
        <RecipeCard sID={0} cbID={0} name={''} savedAt={''}></RecipeCard>
        <RecipeCard sID={0} cbID={0} name={''} savedAt={''}></RecipeCard> */}
      </View>
    </ScrollView>
  );
};

const ContentTwo = ({
  //   navigation,
  getHeaderStatus,
  setHeaderStatus,
}: TabProps) => {
  const navigation = useNavigation();

  // const navigation = useNavigation();
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.navigate('DiscoverScreen' as never);
        setHeaderStatus(true);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
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

function DiscoverTab({
  //   navigation,
  getHeaderStatus,
  setHeaderStatus,
}: TabProps) {
  const navigation = useNavigation();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name='DiscoverScreen'
        children={() => (
          <Content
            // navigation={navigation}
            getHeaderStatus={getHeaderStatus}
            setHeaderStatus={setHeaderStatus}
          />
        )}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name='RecipeScreen'
        children={() => (
          <ContentTwo
            // navigation={navigation}
            getHeaderStatus={getHeaderStatus}
            setHeaderStatus={setHeaderStatus}
          />
        )}
        options={
          { headerLeft: () => (
            <IconButton
              icon="arrow-left"
              size={25}
              onPress={() => {
                navigation.navigate('DiscoverScreen' as never);
                setHeaderStatus(true);
              }} />
            ) }
        }
      ></Stack.Screen>
    </Stack.Navigator>
  );
}

export default DiscoverTab;
