import type { ReactNode } from "react";
import type { ImageStyle, StyleProp, TextStyle } from "react-native";

export interface CalendarDayProps {
	testId?: string;
	style?: StyleProp<ImageStyle>;

	/** Display grid like view around each day, DEFAULT = true */
	isShowGrid?: boolean;

	/** Hide prev month & next month extra days, DEFAULT = false */
	hideExtraDays?: boolean;

	/** Callback which get invloked when a date is clicked, The function receives day, month & year as parameter  */
	onDayPress?: (props: { day: number; month: number; year: number }) => void;

	/** Replace default month and year title with custom one. The function receive a month & year as parameter */
	renderHeader?: (props: CustomHeaderProps) => JSX.Element;

	/** Render custom date component. the function receive all day props */
	renderDay?: (props: DayItemProps) => JSX.Element;

	/** Render custom week component. the function receive a all day props */
	renderWeekName?: (props: WeekItemProps) => JSX.Element;

	/** Hide month & year navigation arrows */
	hideArrows?: boolean;

	/** Replace left arrows with custom ones */
	renderLeftArrow?: () => JSX.Element;

	/** Replace left arrows with custom ones */
	renderRightArrow?: () => JSX.Element;

	/** Handler which gets executed when press arrow icon left. It receive a callback can go back month */
	onPressArrowLeft?: (props: ArrowProps) => void;

	/** Handler which gets executed when press arrow icon right. It receive a callback can go next month */
	onPressArrowRight?: (props: ArrowProps) => void;

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
		d: string;
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
