import React, { memo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
} from "react-native";
import {
  Button,
  Switch,
  TextInput,
} from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import Input from "./Input";
import { theme } from "../core/theme";

const LoginField = () => {
  // Watches the toggle switch for "Remember Me"
  const [rememberSwitch, setRememberSwitch] = React.useState(false);
  const onToggleSwitch = () => setRememberSwitch(!rememberSwitch);

  // Toggles the password hiding
  const [togglePasswordSight, setPasswordSight] = React.useState(false);
  const onToggleSight = () => {
    setPasswordSight(!togglePasswordSight);
  }

  // Add some keyboard state, when keyboard is open,
  // display -> none for the logo.
  return (
    <>
    <Image source={require('../assets/logo-light.png')} style={styles.logo}/>
    <View style={styles.inputContainer}>
      <Input label="Username"></Input>
      <Input 
        label="Password" 
        secureTextEntry={!togglePasswordSight} 
        right={
        <TextInput.Icon 
          color={theme.colors.selected} 
          name={togglePasswordSight ? "eye" : "eye-off"}
          onPress={() => {
            onToggleSight();
          }}
        />}
      >
      </Input>
      <View style={styles.inputOptionsContainer}>
        <View style={styles.inputOptionRememberContainer}>
          <Text style={{paddingRight: 10, alignSelf: 'center',}}>Remember Me</Text>
          <Switch value={rememberSwitch} onValueChange={onToggleSwitch}/>
        </View>
        <Button 
          style={styles.inputOptionForgot}
          mode="text"
          compact={true}
          uppercase={false}
          onPress={() => {
            console.log("Forgot Password clicked.");
          }}
        >
          Forgot Password
        </Button>
      </View>

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
  inputOptionRememberContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: "50%",
    paddingRight: 5,
  },
  inputOptionForgot: {
    flex: 1,
    paddingLeft: 5,
  }
});

export default memo(LoginField);
