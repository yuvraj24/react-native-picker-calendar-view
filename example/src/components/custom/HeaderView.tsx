import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CalendarDateView } from "react-native-picker-calendar-view";
import { baseStyle } from "../../style/baseStyle";

const HeaderView = () => {
	return (
		<View style={baseStyle.container}>
			<CalendarDateView
				testId={"calendar"}
				renderHeader={(props) => {
					const {
						month,
						monthName,
						year,
						prevMonth,
						nextMonth,
						toggleMList,
						toggleYList
					} = props;

					return (
						<View style={[baseStyle.row, styles.viewHeader]}>
							<TouchableOpacity onPress={() => prevMonth()}>
								<Text>{`Prev`}</Text>
							</TouchableOpacity>
							<View style={[styles.viewMonthYear]}>
								<TouchableOpacity onPress={() => toggleMList()}>
									<Text
										style={styles.monthYearName}
									>{`${monthName} - (${month})`}</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => toggleYList()}>
									<Text
										style={[styles.monthYearName, styles.monthYearGap]}
									>{`${year}`}</Text>
								</TouchableOpacity>
							</View>
							<TouchableOpacity onPress={() => nextMonth()}>
								<Text>{`Next`}</Text>
							</TouchableOpacity>
						</View>
					);
				}}
			/>
		</View>
	);
};

export default HeaderView;

const styles = StyleSheet.create({
	monthYearName: {
		fontFamily: "NotoSans-SemiBold"
	},
	monthYearGap: {
		marginLeft: 20
	},
	viewHeader: {
		justifyContent: "space-between",
		width: "100%",
		paddingHorizontal: 16
	},
	viewMonthYear: {
		flexDirection: "row"
	}
});
