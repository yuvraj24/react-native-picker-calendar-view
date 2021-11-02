import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import {
	Dimensions,
	FlatList,
	Image,
	StyleSheet,
	TouchableOpacity,
	View
} from "react-native";
import TextView from "./TextView";
import LeftArrowIcon from "../assets/images/back.png";
import RightArrowIcon from "../assets/images/next.png";
import type {
	CalendarDayProps,
	DayProps,
	MonthDateInfoProps
} from "../interface/PropsInterface";
import { baseStyles } from "../style/baseStyles";
import Res from "../style/Res";
import { getTestProps } from "../util/AppUtil";
import { DateUtil } from "../util/DateUtil";
import DateItem from "./DayItem";
import MonthListView from "./MonthListView";
import YearListView from "./YearListView";

const maxWidth = Dimensions.get("screen").width / 8;

const CalendarDateView = ({
	testId,
	isShowGrid = true,
	hideExtraDays = false,
	hideArrows,
	disableArrowLeft = false,
	disableArrowRight = false,
	style,
	minDate,
	maxDate,
	renderHeader,
	renderDay,
	renderWeekName,
	renderLeftArrow,
	renderRightArrow,
	onDayPress
}: CalendarDayProps) => {
	const [month, setMonth] = useState<number>(moment().month() + 1);
	const [year, setYear] = useState<number>(moment().year());
	const [isMonthView, setIsMonthView] = useState(false);
	const [isYearView, setIsYearView] = useState(false);

	const yearListRef = useRef(DateUtil.yearList());

	const [monthDateInfo, setMonthDateInfo] = useState<MonthDateInfoProps>({
		dateList: []
	});

	const { dateList } = monthDateInfo;

	useEffect(() => {
		const momentDate = moment(`${month}-${year}`, "M-YYYY");
		const startOfMonth = momentDate.startOf("month").weekday();
		const list = DateUtil.getMonthDateList({
			month,
			year,
			startOfMonth,
			hideExtraDays,
			minDate,
			maxDate
		});

		setMonthDateInfo({
			dateList: list
		});
	}, [
		month,
		year,
		isShowGrid,
		hideExtraDays,
		hideArrows,
		disableArrowLeft,
		disableArrowRight,
		style,
		minDate,
		maxDate
	]);

	const toggleMonthList = () => {
		setIsMonthView(!isMonthView);
	};

	const toggleYearList = () => {
		setIsYearView(!isYearView);
	};

	const prevMonth = () => {
		if (month > 1) {
			setMonth(month - 1);
		} else {
			setYear(year - 1);
			setMonth(12);
		}
	};

	const nextMonth = () => {
		if (month < 12) {
			setMonth(month + 1);
		} else {
			setYear(year + 1);
			setMonth(1);
		}
	};

	const RenderLeftArrow = renderLeftArrow;
	const RenderRightArrow = renderRightArrow;
	const calendarHeader = (
		<View style={[styles.parentHeader]} {...getTestProps(testId)}>
			<View style={[baseStyles.row, styles.flexStyle]}>
				<TouchableOpacity
					activeOpacity={disableArrowLeft ? 1 : 0.5}
					{...getTestProps(`${testId}-arrow-left`)}
					onPress={() => !disableArrowLeft && prevMonth && prevMonth()}
				>
					{!hideArrows &&
						((RenderLeftArrow && <RenderLeftArrow />) || (
							<Image source={LeftArrowIcon} style={styles.arrowStyle} />
						))}
				</TouchableOpacity>

				<View style={styles.monthYearStyle}>
					<TouchableOpacity
						style={styles.monthYearStyle}
						onPress={() => toggleMonthList()}
					>
						<TextView>{DateUtil.monthArr[month - 1].MMMM}</TextView>
						<Image
							source={LeftArrowIcon}
							style={[styles.arrowStyle, styles.dropArrowStyle]}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.monthYearStyle}
						onPress={() => toggleYearList()}
					>
						<TextView style={styles.yearStyle}>{year}</TextView>
						<Image
							source={LeftArrowIcon}
							style={[styles.arrowStyle, styles.dropArrowStyle]}
						/>
					</TouchableOpacity>
				</View>

				<TouchableOpacity
					activeOpacity={disableArrowRight ? 1 : 0.5}
					{...getTestProps(`${testId}-arrow-right`)}
					onPress={() => !disableArrowRight && nextMonth && nextMonth()}
				>
					{!hideArrows &&
						((RenderRightArrow && <RenderRightArrow />) || (
							<Image source={RightArrowIcon} style={styles.arrowStyle} />
						))}
				</TouchableOpacity>
			</View>
		</View>
	);

	const RenderWeekName = renderWeekName;
	const calendarWeekNames = (
		<View style={styles.weekNameView}>
			<FlatList
				{...getTestProps(`${testId}-week-list`)}
				data={DateUtil.dayArr}
				numColumns={7}
				scrollEnabled={false}
				keyExtractor={(item) => item.dd}
				renderItem={({ item, index }) => {
					return (
						<View style={styles.viewWeekName}>
							{RenderWeekName ? (
								<RenderWeekName
									{...getTestProps(`${testId}-week-name-${index}`)}
									value={item}
								/>
							) : (
								<TextView
									{...getTestProps(`${testId}-week-name-${index}`)}
									style={styles.textWeekName}
								>
									{item.ddd}
								</TextView>
							)}
						</View>
					);
				}}
			/>
		</View>
	);

	const RenderDay = renderDay;
	const calendarDateView = (
		<FlatList
			{...getTestProps(`${testId}-date-list`)}
			data={dateList}
			numColumns={7}
			contentContainerStyle={isShowGrid && baseStyles.viewGrid}
			scrollEnabled={false}
			renderItem={({ item, index }: { item: DayProps; index: number }) => {
				return (
					<View style={[styles.viewDate, isShowGrid && styles.viewDateAllowed]}>
						{RenderDay ? (
							<RenderDay
								day={item}
								index={index}
								month={month}
								year={year}
								onDayPress={() =>
									onDayPress && onDayPress({ day: item.value, month, year })
								}
							/>
						) : (
							<DateItem
								day={item}
								index={index}
								month={month}
								year={year}
								onDayPress={onDayPress}
							/>
						)}
					</View>
				);
			}}
			keyExtractor={(item: DayProps, index: number) => `${index + item.value}`}
			showsHorizontalScrollIndicator={false}
		/>
	);

	const RenderHeader = renderHeader;
	return (
		<View style={[styles.parent, style]}>
			{RenderHeader ? (
				<RenderHeader
					month={month}
					monthName={DateUtil.monthArr[month - 1].MMMM}
					year={year}
					toggleMList={() => setIsMonthView(!isMonthView)}
					toggleYList={() => setIsYearView(!isYearView)}
					prevMonth={prevMonth}
					nextMonth={nextMonth}
				/>
			) : (
				calendarHeader
			)}

			{calendarWeekNames}
			{calendarDateView}

			{isMonthView && (
				<MonthListView
					toggleMonthList={toggleMonthList}
					onClick={(selectedMonth: number) => {
						setMonth(selectedMonth);
						toggleMonthList();
					}}
				/>
			)}

			{isYearView && (
				<YearListView
					yearList={yearListRef.current}
					toggleYearList={toggleYearList}
					onClick={(selectedYear: number) => {
						setYear(selectedYear);
						toggleYearList();
					}}
				/>
			)}
		</View>
	);
};

export default CalendarDateView;

const styles = StyleSheet.create({
	parent: {
		flexDirection: "column",
		width: "100%",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Res.color.white,
		paddingVertical: Res.unit.scale(16)
	},
	parentHeader: {
		flexDirection: "row",
		width: "100%",
		alignItems: "center",
		paddingLeft: Res.unit.scale(16),
		paddingRight: Res.unit.scale(16),
		justifyContent: "space-between"
	},
	monthYearStyle: {
		flexDirection: "row",
		alignItems: "center"
	},
	yearStyle: {
		marginLeft: Res.unit.scale(20)
	},
	arrowStyle: {
		tintColor: Res.color.primary,
		width: Res.unit.scale(16),
		height: Res.unit.scale(16)
	},
	dropArrowStyle: {
		transform: [{ rotate: "270deg" }],
		marginLeft: Res.unit.scale(5)
	},
	mainView: {
		paddingTop: Res.unit.scale(16),
		alignItems: "center"
	},
	weekNameView: {
		marginTop: Res.unit.scale(21),
		marginBottom: Res.unit.scale(4),
		height: Res.unit.scale(20)
	},
	dateParent: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	imgArrowView: {
		flex: 1
	},
	dropdownView1: {
		height: Res.unit.scale(20),
		paddingTop: Res.unit.scale(2)
	},
	dropdownView2: {
		height: Res.unit.scale(20),
		paddingTop: Res.unit.scale(2),
		marginLeft: Res.unit.scale(8)
	},
	imgArrow: {
		width: Res.unit.scale(28),
		height: Res.unit.scale(28)
	},
	viewWeekName: {
		width: maxWidth + 1
	},
	textWeekName: {
		fontSize: Res.unit.scale(12),
		lineHeight: Res.unit.scale(16),
		textAlign: "center",
		color: Res.color.textColor,
		fontFamily: Res.font.Semibold
	},
	flexStyle: {
		justifyContent: "space-between",
		alignItems: "center"
	},
	viewDate: {
		width: maxWidth,
		height: Res.unit.scale(40),
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: Res.unit.scale(0.5)
	},
	viewDateSelected: {
		backgroundColor: Res.color.primary,
		borderColor: Res.color.primary,
		borderWidth: Res.unit.scale(1)
	},
	viewDateAllowed: {
		backgroundColor: Res.color.white,
		borderLeftWidth: Res.unit.scale(1),
		borderBottomWidth: Res.unit.scale(1),
		borderColor: Res.color.gridColor
	}
});
