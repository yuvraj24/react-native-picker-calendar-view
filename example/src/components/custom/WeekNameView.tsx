import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { CalendarDateView } from "react-native-picker-calendar-view";
import { baseStyle } from "../../style/baseStyle";

const WeekNameView = () => {
	return (
		<View style={baseStyle.container}>
			<CalendarDateView
				testId={"calendar"}
				renderWeekName={(props) => {
					const { testId, value } = props;

					return (
						<Text style={styles.weekName} testID={testId}>
							{value.ddd}
						</Text>
					);
				}}
			/>
		</View>
	);
};

export default WeekNameView;

const styles = StyleSheet.create({
	weekName: {
		// width: Dimensions.get("screen").width / 7.8,
		// height: 40,
		justifyContent: "center",
		alignSelf: "center",
		textAlign: "center",
		fontFamily: "NotoSans-SemiBold"
	}
});
