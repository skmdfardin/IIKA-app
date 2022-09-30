import React, { FC, useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface LoadingBarProps {
  onExit: Function;
}

const LoadingBar: FC<LoadingBarProps> = (props: LoadingBarProps) => {
  const [progressCount, setProgressCount] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [progressWords, setProgressWords] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      const temp = parseFloat((progressCount >= 1 ? 1 : progressCount + 0.02).toFixed(2));
      setProgressCount(temp);
      setPercentage(Math.floor(progressCount * 100));
      if (percentage <= 10) {
        setProgressWords('Loading Basic assets...');
      } else if (percentage > 10 && percentage <= 30) {
        setProgressWords('Loading Headphones...');
      } else if (percentage > 30 && percentage <= 57) {
        setProgressWords('Loading Neckbands...');
      } else if (percentage > 57 && percentage <= 70) {
        setProgressWords('Searching for Offers...');
      } else if (percentage > 70 && percentage <= 84) {
        setProgressWords('Compiling Data...');
      } else if (percentage > 70 && percentage <= 84) {
        setProgressWords('Loading Basic assets...');
      } else if (percentage > 84 && percentage <= 97) {
        setProgressWords('Loading App...');
      } else if (percentage > 97 && percentage < 100) {
        setProgressWords('Loading Complete...');
      } else {
        setProgressWords('Starting App..');
      }
    }, 50);
    afterLoad();
    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progressCount, percentage, progressWords]);

  const afterLoad = () => {
    if (percentage === 100) {
      props.onExit();
    }
  };

  return (
    <View style={Styles.container}>
      <Text style={Styles.loadText}>{progressWords}</Text>
      <ProgressBar progress={progressCount} color="#e0bf57" style={Styles.progressBarStyle} />
      <View
        style={{
          width: progressCount > 0.04 ? windowWidth * 0.9 * progressCount : windowWidth * 0.9 * 0.05,
        }}
      >
        <Text style={Styles.text}>{percentage}%</Text>
      </View>
    </View>
  );
};

export default LoadingBar;

const Styles = StyleSheet.create({
  progressBarStyle: {
    height: windowWidth * 0.025,
    width: windowWidth * 0.9,
    borderRadius: 10
  },
  container: {
    marginTop: windowHeight * 0.2,
  },
  text: {
    color: '#FFFFFF',
    fontSize: windowHeight * 0.015,
    textAlign: 'right',
  },
  loadText: {
    color: '#FFFFFF',
    fontSize: windowHeight * 0.02,
    textAlign: 'center',
    marginBottom: windowHeight * 0.01,
  },
});
