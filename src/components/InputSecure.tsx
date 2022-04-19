import React, { memo } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { theme } from "../themes/Theme";
import Input from "./Input";

type Props = {
	label: string;
	onChangeText: Function;
	value: string;
	error: boolean;
};

const InputPass = ({ label, onChangeText, value, error }: Props) => {
	const [toggleSight, setSight] = React.useState(false);
	const onToggleSight = () => {
		setSight(!toggleSight);
	};

	return (
		<Input
			autoComplete={false}
			error={error}
			label={label}
			secureTextEntry={!toggleSight}
			onChangeText={onChangeText}
			value={value}
			right={
				<TextInput.Icon
					color={theme.colors.selected}
					name={toggleSight ? "eye" : "eye-off"}
					onPress={() => {
						onToggleSight();
					}}
				/>
			}
		></Input>
	);
};

const styles = StyleSheet.create({});

export default memo(InputPass);
