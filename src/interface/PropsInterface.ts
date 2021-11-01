import type { ReactNode } from "react";
import type { ImageStyle, StyleProp } from "react-native";

export interface CalendarDayProps {
    testId?: string,
    isShowGrid?: boolean,
    hideOtherDates?: boolean,
    style?: StyleProp<ImageStyle>

    dateView?: any,
    onDayPress?: ({ day, month, year }: { day: number, month: number, year: number }) => void;

    /** Replace default month and year title with custom one. the function receive a date as parameter */
    renderHeader?: ({ month, monthName, year, toggleMList, toggleYList }: CustomHeaderProps) => JSX.Element;

    /** Render custom date component. the function receive a all day props */
    renderDay?: (props: DayItemProps) => JSX.Element;

    /** Render custom week component. the function receive a all day props */
    renderWeekName?: (props: WeekItemProps) => JSX.Element;

    /** Hide month navigation arrows */
    hideArrows?: boolean;
    /** Replace left arrows with custom ones */
    renderLeftArrow?: () => ReactNode;
    /** Replace left arrows with custom ones */
    renderRightArrow?: () => ReactNode;
    /** Handler which gets executed when press arrow icon left. It receive a callback can go back month */
    onPressArrowLeft?: (method: () => void, month?: number) => void;
    /** Handler which gets executed when press arrow icon right. It receive a callback can go next month */
    onPressArrowRight?: (method: () => void, month?: number) => void;
    /** Disable left arrow */
    disableArrowLeft?: boolean;
    /** Disable right arrow */
    disableArrowRight?: boolean;
}

export interface MonthDateInfoProps {
    dateList?: Array<DayProps>,
}

export interface MonthListItemProps {
    label: any, value: number
}

export interface TextProps {
    children?: any, style?: object, testId?: string
}

export interface DayProps {
    value: number, isValid: boolean, isToday?: boolean, isHide?: boolean
}

export interface MonthListProps {
    testId?: string,
    onClick?: Function,
    currIndex?: number,
    yearList?: Array<MonthListItemProps>
}

export interface DayItemProps {
    testId?: string,
    index: number,
    day: DayProps,
    month: number, year: number,
    onDayPress?: ({ day, month, year }: { day: number, month: number, year: number }) => void;
}

export interface WeekItemProps {
    testId?: string,
    value: {
        d: string,
        dd: string,
        ddd: string,
        dddd: string,
        ddh: string,
    },
}

export interface CustomHeaderProps {
    month: number, monthName: string, year: number,
    toggleMList: Function, toggleYList: Function,
    prevMonth: Function, nextMonth: Function
}