import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { whiteColor, windowHeight, windowWidth, styles } from '../../media/css/common';

const shadow = styles.shadow;

const HorizontalBigCardFarmInfo: FC = () => {
  return (
    <View style={[Styles.container, shadow]}>
      <Text>Test</Text>
    </View>
  );
};

export default HorizontalBigCardFarmInfo;

const Styles = StyleSheet.create({
  container: {
    backgroundColor: whiteColor,
    marginVertical: windowHeight * 0.005,
    borderRadius: 10,
    width: windowWidth * 0.9,
    height: windowHeight * 0.3,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
});
