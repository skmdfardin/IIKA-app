import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { windowHeight, windowWidth, greenColour } from '../media/css/common';

const Map: FC = () => {
  return (
    <View style={Styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ backgroundColor: greenColour }}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />
    </View>
  );
};

export default Map;

const Styles = StyleSheet.create({
  container: {
    height: windowHeight * 0.35,
    width: windowWidth * 0.85,
    marginTop: windowHeight * 0.04,
  },
});
