import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { whiteColor } from '../../media/css/common';

const HorizontalBigCardFarmInfo: FC = () => {
  return (
    <View style={Styles.container}>
      <Text>Test</Text>
    </View>
  );
};

export default HorizontalBigCardFarmInfo;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: whiteColor,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
