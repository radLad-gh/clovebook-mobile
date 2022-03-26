import React, { memo } from 'react';
import {
  StyleSheet,
} from "react-native";
import {
  TextInput,
} from "react-native-paper"

import Input from "./Input";
import { theme } from "../core/theme";

type Props = {
  label : string;
}

const InputPass = ({label}: Props) => {
  
  const [toggleSight, setSight] = React.useState(false);
  const onToggleSight = () => { setSight(!toggleSight); }

  return (
    <Input 
      label={label} 
      secureTextEntry={!toggleSight} 
      right={
        <TextInput.Icon 
          color={theme.colors.selected} 
          name={toggleSight ? "eye" : "eye-off"}
          onPress={() => { onToggleSight(); }}
        />}
    >
    </Input>
	)
};

const styles = StyleSheet.create({
});

export default memo(InputPass);
