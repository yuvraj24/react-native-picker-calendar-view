import React from 'react'
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'

const RadioButton = (props: { style?: StyleProp<ViewStyle>, selected?: boolean }) => {
    return (
        <View
            style={[
                {
                    height: 20,
                    width: 20,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: "#0277BD",
                    alignItems: 'center',
                    justifyContent: 'center',
                }, props.style
            ]}
        >
            {
                props.selected ?
                    <View style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: "#0277BD",
                    }} />
                    : null
            }
        </View>
    )
}

export default RadioButton

const styles = StyleSheet.create({})
