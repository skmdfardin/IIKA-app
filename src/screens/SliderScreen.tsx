import React, { FunctionComponent } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { windowHeight, windowWidth } from '../media/css/common';

interface SliderScreenProps {}

const logo = '../media/AquaLogo.gif';

const SliderScreen: FunctionComponent<SliderScreenProps> = () => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <Image style={Styles.image} source={require(logo)} />
      </View>
      <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 50 }} />
    </View>
  );
};

export default SliderScreen;

const Styles = StyleSheet.create({
  image: {
    marginVertical: windowHeight * 0.23,
    paddingTop: windowHeight * 0.1,
    marginHorizontal: windowWidth * 0.25,
    resizeMode: 'contain',
  },
});
