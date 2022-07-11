import React, {FC} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const UserBasicInfoCard: FC = () => {
  return (
    <View style={Styles.container}>
      <Text>HI from user basic UserBasicInfoCard</Text>
    </View>
  );
};

export default UserBasicInfoCard;

const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
  },
  textContainer: {
    marginTop: windowHeight * 0.67,
    alignItems: 'center',
  },
  backImage1: {
    position: 'absolute',
    resizeMode: 'cover',
    opacity: 0.3,
    width: windowWidth,
    height: windowHeight * 0.9,
  },
  backImage2: {
    position: 'absolute',
    resizeMode: 'cover',
    opacity: 0.3,
    width: windowWidth,
    height: windowHeight * 0.6,
    top: windowHeight * 0.2,
  },
  backImage3: {
    position: 'absolute',
    resizeMode: 'cover',
    top: windowHeight * 0.33,
    opacity: 0.3,
    width: windowWidth * 0.5,
    height: windowHeight * 0.3,
  },
  logo: {
    position: 'absolute',
    resizeMode: 'contain',
    top: windowHeight * 0.45,
    height: windowHeight * 0.11,
    width: windowWidth,
    opacity: 1,
  },
  text: {
    color: '#FFFFFF',
    fontSize: windowHeight * 0.015,
  },
  progress: {
    height: 5,
    width: windowWidth * 0.9,
  },
});
