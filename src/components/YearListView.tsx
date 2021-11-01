import React, { useRef } from 'react';
import { Dimensions, FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import type { MonthListItemProps, MonthListProps } from '../interface/PropsInterface';
import { baseStyles } from '../style/baseStyles';
import Res from '../style/Res';
import { getTestProps } from '../util/AppUtil';
import { DateUtil } from '../util/DateUtil';
import TextView from './TextView';

const width = Dimensions.get("screen").width

const YearListView = ({ testId, onClick, yearList, toggleYearList }: MonthListProps) => {
    const flatRef = useRef<any>()

    return (
        <View style={[styles.floatStyle, styles.parent]}>
            <TouchableOpacity style={[styles.floatStyle, styles.blurStyle]} onPress={() => toggleYearList && toggleYearList()} />
            <FlatList
                onLayout={() => flatRef.current?.scrollToIndex({ index: 10, animated: true })}
                ref={flatRef}
                {...getTestProps(testId + '-year-list')}
                data={yearList}
                style={[styles.floatStyle, styles.listStyle,]}
                numColumns={5}
                initialNumToRender={DateUtil.MAX_YEAR_OFFSET * 2}
                snapToAlignment={"center"}
                decelerationRate={"fast"}
                contentContainerStyle={[baseStyles.viewGrid]}
                renderItem={({ item, index }: { item: MonthListItemProps, index: number }) => {
                    return (
                        <TouchableOpacity
                            activeOpacity={0.4}
                            style={[baseStyles.viewGrid]}
                            {...getTestProps(testId + '-year-view-' + index)}
                            onPress={() => {
                                onClick && onClick(item.value);
                            }}>
                            <View
                                style={[styles.viewMonth]}>
                                <TextView
                                    {...getTestProps(testId + '-year-name')}
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
                getItemLayout={(data, index) => ({
                    length: 40,
                    offset: 40 * index,
                    index,
                })}
            />
        </View>
    )
}

export default YearListView

const styles = StyleSheet.create({
    floatStyle: {
        position: "absolute",
        height: 230,
        bottom: 0
    },
    parent: {
        width: "100%",
        height: "112%",
        zIndex: 2,
        alignItems: "flex-end",
        justifyContent: "flex-end",
    },
    blurStyle: {
        height: "100%",
        width: "100%",
        zIndex: 3,
        opacity: 0.5,
        backgroundColor: Res.color.textColor
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
        width: width / 5,
        textAlign: 'center',
        color: Res.color.textColor,
        fontFamily: Res.font.Regular
    },
})
