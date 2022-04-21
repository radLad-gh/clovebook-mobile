import React from "react";
import { Linking, ScrollView, Text, View } from "react-native";
import { Divider, Paragraph, Title } from "react-native-paper";
import { User } from "../api/models";
import { theme } from "../themes/Theme";

type ScreenProps = {
	user: User;
};

const AboutScreen = ({ user }: ScreenProps) => {
	return (
		<>
			<ScrollView
				style={{
					flexGrow: 1,
					backgroundColor: theme.colors.background,
					flex: 1,
					paddingHorizontal: 15,
					paddingTop: 10,
				}}
			>
				<Title style={{ fontSize: 22, paddingBottom: 12}}>
					Thanks for checking out the app!
				</Title>
				<View>
					<Paragraph>
						Clove is a recipe discovery, creation, and management app inspired by a classic cookbook. Users can favorite, save,
						and manage recipes from both the internet and of their own creation. With Clove Mobile, you can
						bring this trove of recipes to any location you please! We hope that you enjoy this app, 
						and want to thank you for using it.
					</Paragraph>
					<Paragraph>
						Finally, we owe a big thank you to the team for all their effort on Clove. 
						Made with love by Kate Fort, Layne Hoelscher, Tyler Clarke, Cathy Chian, Amelia Castilla, Ethan Bliss, and Justice Smith.
						Find our project on GitHub:
					</Paragraph>
					<Text
						style={{ color: theme.colors.secondary_dark, fontSize: 20, paddingVertical: 10}}
						onPress={() =>
							Linking.openURL("https://github.com/jcode94/clovebook-mobile")
						}
					>
						Clovebook Mobile Github
					</Text>
				</View>
			</ScrollView>
		</>
	);
};

export default AboutScreen;
