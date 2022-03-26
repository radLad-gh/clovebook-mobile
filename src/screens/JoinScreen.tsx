import React, { memo } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Keyboard,
  ScrollView,
  StatusBar,
  Text
} from "react-native";
import {
  Button,
} from "react-native-paper"

import Input from "../components/Input";
import InputSecure from "../components/InputSecure"
import { theme } from "../core/theme";

const JoinScreen = () => {

    const [keyboardStatus, setKeyboardStatus] = React.useState('flex');
    React.useEffect(() => {
      Keyboard.addListener("keyboardDidShow", () => {
        setKeyboardStatus('none');
      });
      Keyboard.addListener("keyboardDidHide", () => {
        setKeyboardStatus('flex');
      });
    })

    return (
      <>
      <Image source={require('../assets/logo-light.png')} style={[styles.logo, {display: keyboardStatus}]} />
      <ScrollView style={styles.inputContainer} contentContainerStyle={{paddingVertical: 25,}}>
        <Input label="Firstname"></Input>
        <Input label="Lastname"></Input>
        <Input label="Email"></Input>
        <Input label="Username"></Input>
        <InputSecure label="Password"></InputSecure>
        <View style={styles.inputOptionsContainer}></View>

        <Button
          mode="contained"
          onPress={() => { console.log("Log In clicked"); }}
          style={{alignSelf: 'center', width: 200, marginTop: 25}}
        >
          Log In
        </Button>
      </ScrollView>
      </>
  )
};

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    backgroundColor: theme.colors.background,
    width: '100%',
    resizeMode: 'contain',
  },
  inputContainer: {
    backgroundColor: theme.colors.background,
    flex: 1,
    paddingHorizontal: 25,
    // Hacky way to get this page the way it looks.
    paddingBottom: 250,
  },
  inputOptionsContainer: {
    display: 'flex',
    alignItems: "center",
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default memo(JoinScreen);
