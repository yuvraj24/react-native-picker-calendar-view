import React, { useState } from "react";
import {
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View
} from "react-native";
import { CalendarDateView } from "react-native-calendar-date-picker";
import RadioButton from "./components/common/RadioButton";
import DayView from "./components/custom/DayView";
import HeaderView from "./components/custom/HeaderView";
import WeekNameView from "./components/custom/WeekNameView";
import { baseStyle } from "./style/baseStyle";

export default function App() {
	const [option, setOption] = useState(0);

	const optionlist = [
		{ label: "Day view", index: 0, component: <DayView /> },
		{ label: "Week name view", index: 1, component: <WeekNameView /> },
		{ label: "Header view", index: 2, component: <HeaderView /> },
		{
			label: "Hide grid & extra days",
			index: 3,
			component: <CalendarDateView isShowGrid={false} hideExtraDays={true} />
		},
		{
			label: "Hide Arrows",
			index: 4,
			component: <CalendarDateView hideArrows />
		},
		{
			label: "Left arrow",
			index: 5,
			component: (
				<CalendarDateView
					renderLeftArrow={() => <Text>LEFT</Text>}
					onPressArrowLeft={({ prevMonth }) => prevMonth && prevMonth()}
				/>
			)
		},
		{
			label: "Right arrow",
			index: 6,
			component: (
				<CalendarDateView
					renderRightArrow={() => <Text>RIGHT</Text>}
					onPressArrowRight={({ nextMonth }) => nextMonth && nextMonth()}
				/>
			)
		},
		{
			label: "Disable left arrow",
			index: 7,
			component: <CalendarDateView disableArrowLeft />
		},
		{
			label: "Disable right arrow",
			index: 8,
			component: <CalendarDateView disableArrowRight />
		},
		{
			label: "Min date : 10-09-2021",
			index: 9,
			component: <CalendarDateView minDate={"10-09-2021"} />
		},
		{
			label: "Max date : 22-12-2021",
			index: 10,
			component: <CalendarDateView maxDate={"22-12-2021"} />
		}
	];

	return (
		<SafeAreaView style={[baseStyle.container]}>
			<View style={[baseStyle.container, styles.parent]}>
				<Text style={styles.header}>Custom Views and Props :</Text>
				<FlatList
					contentContainerStyle={styles.flatStyle}
					data={optionlist}
					numColumns={2}
					renderItem={({ item }) => {
						return (
							<TouchableOpacity
								activeOpacity={0.7}
								style={styles.itemStyle}
								onPress={() => setOption(item.index)}
							>
								<View style={[baseStyle.row, baseStyle.alignCenter]}>
									<RadioButton selected={item.index === option} />
									<Text style={styles.text}> {item.label}</Text>
								</View>
							</TouchableOpacity>
						);
					}}
					keyExtractor={(item) => `${item.index}`}
				/>

				<View style={styles.calendarView}>
					{option >= 0 && optionlist[option].component}
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	parent: {
		paddingTop: 16
	},
	header: {
		paddingHorizontal: 16,
		fontFamily: "NotoSans-SemiBold"
	},
	flatStyle: {
		width: "100%",
		marginTop: 10
	},
	itemStyle: {
		padding: 10,
		backgroundColor: "white",
		paddingHorizontal: 16,
		flex: 1,
		justifyContent: "center"
	},
	calendarView: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0
	},
	text: {
		marginHorizontal: 10,
		alignSelf: "center",
		fontSize: 14
	}
});
