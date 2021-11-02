import moment from "moment";
import type {
	DayProps,
	GetDateListProps,
	MonthListItemProps
} from "src/interface/PropsInterface";

const dayArr = [
	{ d: "1", dd: "01", ddh: "Su", ddd: "Sun", dddd: "Sunday" },
	{ d: "2", dd: "02", ddh: "Mo", ddd: "Mon", dddd: "Monday" },
	{ d: "3", dd: "03", ddh: "Tu", ddd: "Tue", dddd: "Tueday" },
	{ d: "4", dd: "04", ddh: "We", ddd: "Wed", dddd: "Wednesday" },
	{ d: "5", dd: "05", ddh: "Th", ddd: "Thu", dddd: "Thursday" },
	{ d: "6", dd: "06", ddh: "Fr", ddd: "Fri", dddd: "Friday" },
	{ d: "7", dd: "07", ddh: "Sa", ddd: "Sat", dddd: "Saturday" }
];

const monthArr = [
	{
		M: 1,
		MM: "01",
		MMM: "Jan",
		MMMM: "January"
	},
	{
		M: 2,
		MM: "02",
		MMM: "Feb",
		MMMM: "February"
	},
	{
		M: 3,
		MM: "03",
		MMM: "Mar",
		MMMM: "March"
	},
	{
		M: 4,
		MM: "04",
		MMM: "Apr",
		MMMM: "April"
	},
	{
		M: 5,
		MM: "05",
		MMM: "May",
		MMMM: "May"
	},
	{
		M: 6,
		MM: "06",
		MMM: "Jun",
		MMMM: "June"
	},
	{
		M: 7,
		MM: "07",
		MMM: "Jul",
		MMMM: "July"
	},
	{
		M: 8,
		MM: "08",
		MMM: "Aug",
		MMMM: "August"
	},
	{
		M: 9,
		MM: "09",
		MMM: "Sep",
		MMMM: "September"
	},
	{
		M: 10,
		MM: "10",
		MMM: "Oct",
		MMMM: "October"
	},
	{
		M: 11,
		MM: "11",
		MMM: "Nov",
		MMMM: "November"
	},
	{
		M: 12,
		MM: "12",
		MMM: "Dec",
		MMMM: "December"
	}
];

const nth = function (d: number) {
	if (d > 3 && d < 21) {
		return "th";
	}
	switch (d % 10) {
		case 1:
			return "st";
		case 2:
			return "nd";
		case 3:
			return "rd";
		default:
			return "th";
	}
};

const getSelectedYearIndex = (selectedYear: number) => {
	let selectedYearIndex = moment().year();
	selectedYearIndex = yearList().findIndex(
		(year) => selectedYear === year.value
	);
	return selectedYearIndex;
};

const monthList = () => {
	const list: Array<MonthListItemProps> = [];
	monthArr.map((month) => {
		list.push({
			label: month.MMMM,
			value: month.M
		});
	});
	return list;
};

const MAX_YEAR_OFFSET = 50;

const yearList = () => {
	const list: Array<MonthListItemProps> = [];
	const currentYear = moment().year();
	for (let i = 0; i < MAX_YEAR_OFFSET; i++) {
		list.push({
			label: currentYear - MAX_YEAR_OFFSET + i,
			value: currentYear - MAX_YEAR_OFFSET + i
		});
	}
	for (let i = 0; i <= MAX_YEAR_OFFSET; i++) {
		list.push({
			label: currentYear + i,
			value: currentYear + i
		});
	}
	return list;
};

const getMonthDateList = (props: GetDateListProps) => {
	const { month, year, startOfMonth, hideExtraDays, minDate, maxDate } = props;

	const currDaysInMonth = moment(`${month}-${year}`, "M-YYYY").daysInMonth();

	let prevMonth = month - 1;
	let prevYear = year;
	if (month - 1 <= 0) {
		prevMonth = 12;
		prevYear = year - 1;
	}
	const prevDaysInMonth = moment(
		`${prevMonth}-${prevYear}`,
		"M-YYYY"
	).daysInMonth();

	let i = 0;
	const list: Array<DayProps> = [];
	while (i < currDaysInMonth + startOfMonth) {
		const date =
			(i < startOfMonth
				? prevDaysInMonth - startOfMonth + i
				: i - startOfMonth) + 1;

		// check if date falls between minDate & maxDate
		const isValid = checkIsDateValid(date, month, year, minDate, maxDate);

		// check if date falls in current month
		const isExtraDay = i < startOfMonth;

		list.push({
			value: date,
			isExtraDay: isExtraDay,
			isValid: isValid,
			isToday: isToday(date, month, year),
			isHide: isExtraDay && hideExtraDays
		});
		i++;
	}

	const size = list.length <= 35 ? 35 - list.length : 42 - list.length;

	i = 0;
	while (i < size) {
		i++;
		list.push({
			value: i,
			isExtraDay: true,
			isValid: false,
			isToday: false,
			isHide: hideExtraDays
		});
	}
	return list;
};

const checkIsDateValid = (
	date: number,
	month: number,
	year: number,
	minDate?: string,
	maxDate?: string
) => {
	let isValid = true;
	const mCurrDate = moment(`${date}-${month}-${year}`, "DD-MM-YYYY");
	if (minDate) {
		// console.log("MIN Date => ", mCurrDate.date() , moment(minDate, "DD-MM-YYYY").date(), mCurrDate.isSameOrBefore(moment(minDate, "DD-MM-YYYY").toDate()))
		isValid = mCurrDate.isSameOrAfter(moment(minDate, "DD-MM-YYYY").toDate());
	}

	if (maxDate) {
		// console.log("MAX Date => ", mCurrDate, moment(maxDate, "DD-MM-YYYY"), mCurrDate.isSameOrBefore(moment(maxDate, "DD-MM-YYYY").toDate()))
		isValid =
			isValid &&
			mCurrDate.isSameOrBefore(moment(maxDate, "DD-MM-YYYY").toDate());
	}

	return isValid;
};

const getValidDateFormat = (
	currentDayNumber: number,
	month: number,
	year: number
) => {
	return `${
		currentDayNumber < 10 ? "0" + currentDayNumber : currentDayNumber
	}-${month < 10 ? "0" + month : month}-${year}`;
};

const isToday = (date: number, month: number, year: number) => {
	const mDate = moment(`${date}-${month}-${year}`, "DD-MM-YYYY").toDate();
	const currDate = moment().toDate();
	const isTodaysDate = currDate.toDateString() === mDate.toDateString();
	// console.log(`isTodaysDate => Date : ${date} | Now : ${currDate.toDateString()} | selected : ${mDate.toDateString()} | isToday : ${isTodaysDate}`)
	return isTodaysDate;
};

export const DateUtil = {
	dayArr,
	monthArr,
	MAX_YEAR_OFFSET,
	nth,
	getMonthDateList,
	getSelectedYearIndex,
	monthList,
	yearList,
	getValidDateFormat,
	isToday
};
