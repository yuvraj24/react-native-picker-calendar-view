import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import RadioButton from './components/common/RadioButton';
import DayView from './components/custom/DayView';
import HeaderView from './components/custom/HeaderView';
import WeekNameView from './components/custom/WeekNameView';
import { baseStyle } from './style/baseStyle';

export default function App() {

  const [option, setOption] = useState(0)

  const optionlist = [
    { label: "Day view", component: <DayView />, index: 0 },
    { label: "Week name view", component: <WeekNameView />, index: 1 },
    { label: "Header view", component: <HeaderView />, index: 2 }
  ]

  return (
    <View style={[baseStyle.container, styles.parent]}>
      <Text style={styles.header}>Custom Views</Text>
      <FlatList
        contentContainerStyle={styles.flatStyle}
        data={optionlist}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.itemStyle} onPress={() => setOption(index)} >
              <View style={baseStyle.row}>
                <RadioButton selected={index === option} />
                <Text style={styles.text}> {item.label}</Text>
              </View>
            </TouchableOpacity>
          )
        }}
        keyExtractor={(item) => `${item.index}`}
      />

      <View style={styles.calendarView}>
        {option >= 0 && optionlist[option].component}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    paddingTop: 16
  },
  header: {
    paddingHorizontal: 16,
    fontFamily: "NotoSans-SemiBold"
  },
  flatStyle: {
    width: "100%",
    marginTop: 10,
  },
  itemStyle: {
    padding: 10,
    backgroundColor: "white",
    paddingHorizontal: 16
  },
  calendarView: {
    position: "absolute",
    bottom: 0,
    left: 0, right: 0
  },
  text: {
    marginHorizontal: 10,
    alignSelf: "center"
  }
});

