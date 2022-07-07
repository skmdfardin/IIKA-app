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
      const temp = parseFloat(
        (progressCount >= 1 ? 1 : progressCount + 0.01).toFixed(2),
      );
      setProgressCount(temp);
      setPerscentage(Math.floor(progressCount * 100));
    }, 500);
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
          width:
            progressCount > 0.04
              ? windowWidth * 0.9 * progressCount
              : windowWidth * 0.9 * 0.05,
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
    textAlign: 'right',
  },
});
