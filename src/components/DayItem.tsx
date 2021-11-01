import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import type { DayItemProps } from 'src/interface/PropsInterface';
import Res from '../style/Res';
import { getTestProps } from '../util/AppUtil';
import TextView from './TextView';

const DayItem = ({ day, index, testId, month, year, onDayPress }: DayItemProps) => {

    return (
        <TouchableOpacity
            {...getTestProps(testId + '-date-view-' + index)}
            activeOpacity={!day.isValid ? 1 : 0.5}
            onPress={() => {
                onDayPress && onDayPress({ day: day.value, month, year });
            }}>
            <View>
                {!day.isHide && <TextView
                    {...getTestProps(`${testId}-date-${index}`)}
                    style={[
                        styles.textDayNumber,
                        !day.isValid && styles.viewDateDisabled,
                        day.isToday && (day.value < 10 ? styles.textTodaySingle : styles.textTodayDouble),
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
    textTodaySingle: {
        color: Res.color.white, 
        backgroundColor: Res.color.primary,
        paddingHorizontal: 11,
        paddingVertical: 3,
        borderRadius: 50
    },
    textTodayDouble: {
        color: Res.color.white,
        backgroundColor: Res.color.primary,
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 50
    },
    viewDateDisabled: {
        borderColor: Res.color.gridColor,
        borderWidth: Res.unit.scale(1),
        opacity: 0.3,
    },
})
