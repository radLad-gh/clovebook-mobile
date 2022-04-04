import React, { memo } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from "react-native";
import {
  Button,
  Switch,
} from "react-native-paper"

import Input from "../components/Input";
import InputSecure from "../components/InputSecure"
import { theme } from "../themes/Theme";
import { Navigation } from "../types";

type TabProps = {
  screenName: string,
  getLoginValidity: Function;
  setLoginValidity: Function;
};

const LoginTab = ({ screenName, getLoginValidity, setLoginValidity }: TabProps) => {
  // Watches the toggle switch for "Remember Me"
  const [rememberSwitch, setRememberSwitch] = React.useState(false);
  const onToggleSwitch = () => setRememberSwitch(!rememberSwitch);

  const setLoginValid = React.useState(false);

  // Add some keyboard state, when keyboard is open,
  // display -> none for the logo.
  return (
    <>
      <Image source={require('../assets/logo-light.png')} style={styles.logo} />
      <View style={styles.inputContainer}>
        <Input label="Username"></Input>
        <InputSecure label={"Password"}></InputSecure>
        <View style={styles.inputOptionsContainer}>
          <View style={styles.inputOptionRememberContainer}>
            <Text style={{paddingRight: 10, alignSelf: 'center', color: theme.colors.text}}>Remember Me</Text>
            <Switch value={rememberSwitch} onValueChange={onToggleSwitch}/>
          </View>
          <Button 
            style={styles.inputOptionForgot}
            mode="text"
            compact={true}
            uppercase={false}
            onPress={() => { console.log("Forgot Password clicked."); }}
          >
            Forgot Password
          </Button>
        </View>

        <Button mode="contained" style={{alignSelf: 'center', width: 200, marginTop: 75}}
          onPress={() => {setLoginValidity(true)}}>
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
    width: '100%',
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

export default memo(LoginTab);
