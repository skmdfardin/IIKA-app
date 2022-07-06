import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

interface SliderScreenProps {}

const SliderScreen: FunctionComponent<SliderScreenProps> = () => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={{ flex: 1, backgroundColor: 'black' }} />
      <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 50 }} />
    </View>
  );
};

export default SliderScreen;
