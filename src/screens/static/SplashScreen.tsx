import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { View, StyleSheet, Image, Text, Dimensions } from 'react-native';
import LoadingBar from '../../components/LoadingBar';
import { SLIDER_SCREEN } from '../../navigation/StackNavigation';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const logo = '../../media/AquaLogo.gif';
const fishLogo = '../../media/FishLogo.gif';

const SplashScreen: FC = () => {
  const navigation = useNavigation();
  return (
    <View style={Styles.container}>
      <View style={Styles.imageContainer}>
        <Image style={Styles.backImage1} source={require(fishLogo)} />
        <Image style={Styles.backImage2} source={require(fishLogo)} />
        <Image style={Styles.backImage3} source={require(fishLogo)} />
        <Image style={Styles.logo} source={require(logo)} />
      </View>
      <View style={Styles.textContainer}>
        <Text style={Styles.text}>"The Question is not what you look at,</Text>
        <Text style={Styles.text}>but what you see"</Text>
      </View>
      <LoadingBar onExit={() => navigation.navigate(SLIDER_SCREEN.toString())} />
    </View>
  );
};

export default SplashScreen;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: windowHeight * 1.15,
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
