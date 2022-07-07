/* eslint-disable react-native/no-inline-styles */
import React, {FC, useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import {ProgressBar} from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const LoadingBar: FC = () => {
  const [progressCount, setProgressCount] = useState(0);
  const [percentage, setPerscentage] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setProgressCount(progressCount >= 1 ? 1 : progressCount + 0.01);
      setPerscentage(Math.floor(progressCount * 100));
    }, 200);
    return () => {
      clearInterval(timer);
    };
  }, [progressCount, percentage]);

  return (
    <View style={Styles.contrainer}>
      <ProgressBar
        progress={progressCount}
        color="#ffffff"
        style={Styles.progressBarStyle}
      />
      <View
        style={{
          width: progressCount,
        }}>
        <Text style={Styles.text}>{percentage}%</Text>
      </View>
    </View>
  );
};

export default LoadingBar;

const Styles = StyleSheet.create({
  progressBarStyle: {
    height: 5,
    width: windowWidth * 0.9,
  },
  contrainer: {
    marginTop: windowHeight * 0.2,
  },
  text: {
    color: '#FFFFFF',
    fontSize: windowHeight * 0.015,
  },
});
