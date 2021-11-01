import React from 'react';
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import TextView from './TextView';
import type { MonthListProps, MonthListItemProps } from '../interface/PropsInterface';
import { baseStyles } from '../style/baseStyles';
import Res from '../style/Res';
import { getTestProps } from '../util/AppUtil';
import { DateUtil } from '../util/DateUtil';

const MonthListView = ({ testId, onClick }: MonthListProps) => {
    const monthList = DateUtil.monthList()

    return (
        <View style={[styles.floatStyle, styles.parent]}>
            <View style={[styles.floatStyle, styles.blurStyle]} />
            <FlatList
                {...getTestProps(testId + '-month-list')}
                data={monthList}
                style={[styles.floatStyle, styles.listStyle,]}
                numColumns={3}
                contentContainerStyle={[baseStyles.viewGrid]}
                scrollEnabled={false}
                renderItem={({ item, index }: { item: MonthListItemProps, index: number }) => {

                    return (
                        <TouchableOpacity
                            activeOpacity={0.4}
                            style={[baseStyles.viewGrid]}
                            {...getTestProps(testId + '-month-view-' + index)}
                            onPress={() => {
                                onClick && onClick(item.value);
                            }}>
                            <View
                                style={[styles.viewMonth]}>
                                <TextView
                                    {...getTestProps(testId + '-month-name')}
                                    style={[
                                        styles.textMonthName,
                                    ]}
                                >{item.label}</TextView>
                            </View>
                        </TouchableOpacity>
                    );
                }}
                keyExtractor={(item: MonthListItemProps, index: number) => `${index + item.value}`}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    )
}

export default MonthListView

const styles = StyleSheet.create({
    floatStyle: {
        position: "absolute",
        flex: 1,
    },
    parent: {
        width: "100%",
        height: "100%",
        zIndex: 2,
        alignItems: "center",
        justifyContent: "center",
    },
    blurStyle: {
        height: "100%",
        width: "100%",
        zIndex: 3,
        opacity: 0.9,
        backgroundColor: Res.color.white
    },
    listStyle: {
        zIndex: 4,
        backgroundColor: Res.color.white,
        borderBottomWidth: Res.unit.scale(1),
        borderColor: Res.color.gridColor,
    },
    viewMonth: {
        height: Res.unit.scale(50),
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: Res.unit.scale(0.5),
    },
    textMonthName: {
        fontSize: Res.unit.scale(14),
        lineHeight: Res.unit.scale(24),
        width: Dimensions.get("screen").width / 3,
        textAlign: 'center',
        color: Res.color.textColor,
        fontFamily: Res.font.Regular
    },
})
