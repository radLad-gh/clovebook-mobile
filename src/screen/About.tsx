import React from "react";
import { Text, View, ScrollView, Linking } from "react-native";
import { Title, Paragraph, TextInput, ToggleButton, FAB, Divider } from "react-native-paper";

import { NewUser, User } from "../api/models";
import * as local from "../validation/securestore";
import { getUserByID } from "../api/requests";
import { theme } from "../themes/Theme";
import { ThemeColors } from "react-navigation";

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
                    paddingTop: 5,
				}}
			>
				<Title style={{fontSize: 25, paddingVertical: 5}}>{user.firstName},</Title>
				<Title>We appreciate you checking out the app:</Title>
				<View>
                    <Paragraph>
                        Clovebook is recipe manager and finder. Users can favorite,
                        save, and manage their favorite recipes. With Clovebook
                        mobile, you can bring this realm of recipes to any location
                        as you please.
                    </Paragraph>
                    <Divider />
                    <Paragraph>
                        And a thanks for the team effort on the Clovebook Mobile
                        Team. You can find the GitHub to this project here:
                    </Paragraph>
                    <Text style={{color: 'blue'}} onPress={() => Linking.openURL("https://github.com/jcode94/clovebook-mobile")}>Clovebook Mobile Github</Text>
				</View>
			</ScrollView>
		</>
	);
};

export default AboutScreen;
