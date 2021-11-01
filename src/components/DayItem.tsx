import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import type { DayItemProps } from 'src/interface/PropsInterface';
import Res from '../style/Res';
import { getTestProps } from '../util/AppUtil';
import TextView from './TextView';

const DayItem = ({ day, index, testId, month, year, onDayPress }: DayItemProps) => {

    const isDisable = !day.isValid || day.isExtraDay
    const isTodayStyle = day.isToday && [styles.textToday, day.value < 10 ? styles.textTodaySingle : styles.textTodayDouble]

    return (
        <TouchableOpacity
            {...getTestProps(testId + '-date-view-' + index)}
            activeOpacity={!day.isValid ? 1 : 0.5}
            onPress={() => {
                day.isValid && !day.isExtraDay && onDayPress && onDayPress({ day: day.value, month, year });
            }}>
            <View style={day.isToday && styles.circleView}>
                {!day.isHide && <TextView
                    {...getTestProps(`${testId}-date-${index}`)}
                    style={[
                        styles.textDayNumber,
                        isTodayStyle,
                        isDisable && { ...styles.viewDateDisabled, ...styles.textDisableColor },
                    ]}
                >{day.value}</TextView>}
            </View>
        </TouchableOpacity>
    )
}

export default DayItem

const styles = StyleSheet.create({
    textDayNumber: {
        fontSize: Res.unit.scale(14),
        fontFamily: Res.font.Regular,
    },
    textToday: {
        backgroundColor: Res.color.primary,
        fontFamily: "NotoSans-SemiBold"
    },
    textTodaySingle: {
        color: Res.color.white,
        paddingHorizontal: 11,
        paddingVertical: 3,
    },
    textTodayDouble: {
        color: Res.color.gridColor,
        paddingHorizontal: 6,
        paddingVertical: 3,
    },
    viewDateDisabled: {
        borderColor: Res.color.gridColor,
        borderWidth: Res.unit.scale(1),
        opacity: 0.3,
    },
    textDisableColor: {
        color: "#000",
    },
    circleView: {
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        overflow: "hidden",
    }
})
