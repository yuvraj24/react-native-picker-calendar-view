import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CalendarDateView } from "react-native-calendar-date-picker";
import { baseStyle } from "../../style/baseStyle";

const DayView = () => {
	return (
		<View style={baseStyle.container}>
			<CalendarDateView
				testId={"calendar"}
				renderDay={(props) => {
					const { day, month, year, onDayPress } = props;

					return (
						<TouchableOpacity
							style={styles.box}
							onPress={() =>
								day.isValid &&
								!day.isExtraDay &&
								onDayPress?.({ day: day.value, month, year })
							}
						>
							<Text
								style={[
									styles.viewDateAllowed,
									day.isToday && styles.viewDateSelected,
									(!day.isValid || day.isExtraDay) && styles.viewDateDisabled
								]}
							>
								{props.day.value}
							</Text>
						</TouchableOpacity>
					);
				}}
			/>
		</View>
	);
};

export default DayView;

const styles = StyleSheet.create({
	box: {
		width: 40,
		height: 40,
		justifyContent: "center",
		alignItems: "center"
	},
	viewDateSelected: {
		backgroundColor: "#0277BD",
		borderColor: "#0277BD",
		borderRadius: 20,
		paddingHorizontal: 10,
		paddingVertical: 5,
		color: "white"
	},
	viewDateAllowed: {
		backgroundColor: "white",
		borderColor: "#bdbdbd"
	},
	viewDateDisabled: {
		backgroundColor: "white",
		opacity: 0.3
	}
});
