import React, { memo } from 'react';
import {
    StyleSheet,
  } from "react-native";
import {
  TextInput
} from "react-native-paper";
import { theme } from "../core/theme";

type Props = React.ComponentProps<typeof Input> & { errorText?: string };

const Input = ({ errorText, ...props }: Props, label : string) => {
  
  const [text, setText] = React.useState("");
  
  return (
    // react-native-paper <HelperText> can be useful here.
    <TextInput
        label={label}
        value={text}
        onChangeText={(newText) => { setText(newText); }}
        {...props}
      />
  )  
};

const styles = StyleSheet.create({
});

export default memo(Input);
