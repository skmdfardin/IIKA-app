import React, { FC } from 'react';
import { View } from 'react-native';
import { ProgressBar } from 'react-native-paper';

const LoadingBar: FC = () => {
  return (
    <View>
      <ProgressBar progress={0.2} color="#8034eb" />
    </View>
  );
};

export default LoadingBar;
