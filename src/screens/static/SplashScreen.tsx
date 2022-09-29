import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { View, StyleSheet, Image, Text, Dimensions, StatusBar, SafeAreaView } from 'react-native';
import LoadingBar from '../../components/LoadingBar';
import { NavigationParamList } from '../../types/navigation';

const splashScreen = '../../media/splashScreen.png'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;



type naviType = NativeStackNavigationProp<NavigationParamList, 'splash_screen'>;

const SplashScreen: FC = () => {
  const navigation = useNavigation<naviType>();
  return (
    // <SafeAreaView>

    <View style={Styles.container}>
      <StatusBar hidden={true} />
      <View style={Styles.imageContainer}>
        <Image style={Styles.backImage1} source={require(splashScreen)} />
      </View>
      <View style={Styles.textContainer}>
        <Text style={Styles.text}>"The Question is not what you look at,</Text>
        <Text style={Styles.text}>but what you see"</Text>
      </View>
      <LoadingBar
        onExit={() => {
          console.log("The navigation stack is already working");
        }}
      />
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
    marginTop: windowWidth * 0.1,
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
