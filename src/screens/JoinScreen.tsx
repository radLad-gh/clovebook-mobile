import React, { memo } from 'react';
import {
  StyleSheet,
  View,
  Image,
} from "react-native";
import {
  Button,
} from "react-native-paper"

import Input from "../components/Input";
import InputSecure from "../components/InputSecure"
import { theme } from "../core/theme";

const JoinScreen = () => {

    return (
    <>
    <Image source={require('../assets/logo-light.png')} style={styles.logo}/>
    <View style={styles.inputContainer}>
      <Input label="Firstname"></Input>
      <Input label="Lastname"></Input>
      <Input label="Email"></Input>
      <Input label="Username"></Input>
      <InputSecure label="Password"></InputSecure>
      <View style={styles.inputOptionsContainer}></View>

      <Button
        mode="contained"
        onPress={() => { console.log("Log In clicked"); }}
        style={{alignSelf: 'center', width: 200, marginTop: 75}}
      >
        Log In
      </Button>
    </View>
    </>
  )
};

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    backgroundColor: theme.colors.background,
    width: null,
    height: null,
    resizeMode: 'contain',
    paddingTop: 50,
  },
  inputContainer: {
    backgroundColor: theme.colors.background,
    flex: 2,
    justifyContent: 'flex-start',
    paddingHorizontal: 25,
  },
  inputOptionsContainer: {
    display: 'flex',
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default memo(JoinScreen);
