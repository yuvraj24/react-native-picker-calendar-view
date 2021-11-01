import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { TextProps } from '../interface/PropsInterface';
import Res from '../style/Res';
import { getTestProps } from '../util/AppUtil';

const TextView = ({ children, style, testId = 'text-view' }: TextProps) => {
    return (
        <View {...getTestProps(testId)}>
            <Text
                {...getTestProps(testId)}
                style={[styles.textStyle, style]}>
                {children}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    textStyle: {
        fontFamily: Res.font.Regular,
        fontSize: 16,
        lineHeight: 24,
        color: Res.color.textColor,
    },
});

export default TextView;
