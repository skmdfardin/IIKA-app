import React, {FC} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  ImageBackground,
} from 'react-native';
import {ProgressBar} from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const logo = '../media/AquaLogo.gif';
const fishLogo = '../media/FishLogo.gif';

const SplashScreen: FC = () => {
  return (
    <View style={Styles.container}>
      <View style={Styles.imageContainer}>
        <ImageBackground style={Styles.backImage} source={require(fishLogo)}>
          <Image style={Styles.image} source={require(logo)} />
        </ImageBackground>
      </View>
      <View style={Styles.textContainer}>
        <Text style={Styles.text}>"The Question is not what you look at,</Text>
        <Text style={Styles.text}>but what you see"</Text>
      </View>
      <View style={Styles.progressContrainer}>
        <ProgressBar progress={0.7} color="#ffffff" style={Styles.progress} />
      </View>
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
    marginTop: windowHeight * 0.02,
  },
  progressContrainer: {
    marginTop: windowHeight * 0.1,
  },
  backImage: {
    opacity: 1,
  },
  image: {
    marginVertical: windowHeight * 0.23,
    paddingTop: windowHeight * 0.1,
    marginHorizontal: windowWidth * 0.25,
    resizeMode: 'contain',
  },
  textContainer: {
    marginVertical: 0,
    alignItems: 'center',
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
