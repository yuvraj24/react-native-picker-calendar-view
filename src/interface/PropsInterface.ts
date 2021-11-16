import type { ReactNode } from "react";
import type { ImageStyle, StyleProp, TextStyle } from "react-native";

export interface CalendarDayProps {
	/** Unique testid for the component */
	testId?: string;

	/** Parent style for the entire component. */
	style?: StyleProp<ImageStyle>;

	/** Display grid like view around each day, DEFAULT = true */
	isShowGrid?: boolean;

	/** Hide previous month & next month's extra days, DEFAULT = false */
	hideExtraDays?: boolean;

	/** Hide month & year navigation arrows, DEFAULT = false */
	hideArrows?: boolean;

	/** Callback which get invloked when a date is clicked, The function receives day, month & year as parameter  */
	onDayPress?: (props: { day: number; month: number; year: number }) => void;

	/** Replace default month and year title with custom one. The function receive a month ,year & other header props as parameter */
	renderHeader?: (props: {
		month: number;
		monthName: string;
		year: number;
		toggleMList: () => void;
		toggleYList: () => void;
		prevMonth: () => void;
		nextMonth: () => void;
	}) => JSX.Element;

	/** Render custom day component. the function receive all day props */
	renderDay?: (props: {
		testId?: string;
		index: number;
		day: DayProps;
		month: number;
		year: number;
		onDayPress?: (props: { day: number; month: number; year: number }) => void;
	}) => JSX.Element;

	/** Render custom week component. the function receive a all week props */
	renderWeekName?: (props: {
		testId?: string;
		value: {
			d: string; // eg. { d: "1", dd: "01", ddh: "Su", ddd: "Sun", dddd: "Sunday" },
			dd: string;
			ddd: string;
			dddd: string;
			ddh: string;
		};
	}) => JSX.Element;

	/** Replace left arrows with custom ones */
	renderLeftArrow?: () => JSX.Element;

	/** Replace right arrows with custom ones */
	renderRightArrow?: () => JSX.Element;

	/** Handler which gets executed when press arrow icon left. It receive a callback can go back month */
	onPressArrowLeft?: (props: {
		prevMonth?: () => void;
		month?: number;
		nextMonth?: () => void;
	}) => void;

	/** Handler which gets executed when press arrow icon right. It receive a callback can go next month */
	onPressArrowRight?: (props: {
		prevMonth?: () => void;
		month?: number;
		nextMonth?: () => void;
	}) => void;

	/** Disable left arrow */
	disableArrowLeft?: boolean;

	/** Disable right arrow */
	disableArrowRight?: boolean;

	/** Minimum date that can be selected, dates before minDate will be grayed out. Format = "DD-MM-YYYY" */
	minDate?: string;

	/** Maximum date that can be selected, dates after maxDate will be grayed out. Format = "DD-MM-YYYY" */
	maxDate?: string;
}

export interface MonthDateInfoProps {
	dateList?: Array<DayProps>;
}

export interface MonthListItemProps {
	label: string | number;
	value: number;
}

export interface TextProps {
	children?: ReactNode;
	style?: StyleProp<TextStyle>;
	testId?: string;
}

export interface DayProps {
	value: number;
	isValid: boolean;
	isToday?: boolean;
	isHide?: boolean;
	isExtraDay?: boolean;
}

export interface ArrowProps {
	prevMonth?: () => void;
	month?: number;
	nextMonth?: () => void;
}

export interface MonthListProps {
	testId?: string;
	onClick?: (value: number) => void;
	currIndex?: number;
	yearList?: Array<MonthListItemProps>;
	toggleMonthList?: () => void;
	toggleYearList?: () => void;
}

export interface DayItemProps {
	testId?: string;
	index: number;
	day: DayProps;
	month: number;
	year: number;
	onDayPress?: ({
		day,
		month,
		year
	}: {
		day: number;
		month: number;
		year: number;
	}) => void;
}

export interface WeekItemProps {
	testId?: string;
	value: {
		d: string; // eg. { d: "1", dd: "01", ddh: "Su", ddd: "Sun", dddd: "Sunday" },
		dd: string;
		ddd: string;
		dddd: string;
		ddh: string;
	};
}

export interface CustomHeaderProps {
	month: number;
	monthName: string;
	year: number;
	toggleMList: () => void;
	toggleYList: () => void;
	prevMonth: () => void;
	nextMonth: () => void;
}

export interface GetDateListProps {
	month: number;
	year: number;
	startOfMonth: number;
	hideExtraDays: boolean;
	minDate?: string;
	maxDate?: string;
}
