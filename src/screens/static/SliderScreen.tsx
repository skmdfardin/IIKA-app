import React, { FunctionComponent } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { windowHeight, windowWidth, whiteColor, blueColor, commonBlueColor, blackColor } from '../../media/css/common';
import ImageCarousel from '../../components/ImageCarousel';
import { useState } from 'react';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SIGN_IN, SIGN_UP } from '../../navigation/StackNavigation';
import { black } from 'react-native-paper/lib/typescript/styles/colors';

interface SliderScreenProps {}

const logo = '../../media/AquaLogo.gif';
const fishLogo = '../../media/FishLogo.gif';

export interface ImageItems {
  title: string;
  filepath: string;
  descriptionText: string;
}

interface SliderTextItems {
  titleText: string;
  descriptionText: string;
}
const imageItem: Array<ImageItems> = [
  {
    title: '"The question is not what you look at, but what you see."',
    filepath: require('../../media/SplashSlider/image6.png'),
    descriptionText: 'End-to-End Aqua Farm Management App',
  },
  {
    title: 'beautiful handpicked collection lines Aquaculture made easy',
    filepath: require('../../media/SplashSlider/image9.png'),
    descriptionText: 'Advanced Data Analytics, Recommendations & Predictions',
  },
  {
    title: '"The question is not what you look at, but what you see."',
    filepath: require('../../media/SplashSlider/image8.png'),
    descriptionText: 'Automate your Farm with IOT Devices',
  },
];

const textList: Array<SliderTextItems> = [
  {
    titleText: 'Aquaculture made easy',
    descriptionText: 'beautiful handpicked collections in two lines',
  },
  {
    titleText: 'Advanced Data Management & Analytics',
    descriptionText: '"The question is not what you look at, but what you see."',
  },
  {
    titleText: 'Get Started',
    descriptionText: '',
  },
];

const SliderScreen: FunctionComponent<SliderScreenProps> = () => {
  const [currentSliderIndex, setCurrentSliderIndex] = useState(0);
  const navigation = useNavigation();
  const callBackSliderIndex = (index: number) => {
    setCurrentSliderIndex(index);
    console.log('currentSliderIndex 40 ', index);
    console.log('currentSliderIndex', currentSliderIndex);
  };

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <View style={{ flexDirection: 'column', marginStart: windowWidth * 0.05, marginEnd: windowWidth * 0.05 }}>
          <Image
            style={{ width: 100, marginTop: windowWidth * 0.01, alignSelf: 'flex-end', resizeMode: 'contain' }}
            source={require(logo)}
          />
          {currentSliderIndex === 0 && (
            <Image style={{ width: 60, resizeMode: 'contain', height: 65 }} source={require(fishLogo)} />
          )}
          <Text
            style={[
              Styles.whiteText,
              {
                fontSize: windowWidth * 0.08,
                fontWeight: 'bold',
                marginTop: currentSliderIndex === 2 ? windowHeight * 0.02 : windowHeight * 0.009,
              },
            ]}
          >
            {textList[currentSliderIndex].titleText}
          </Text>
          {currentSliderIndex !== 2 && (
            <Text
              style={[
                Styles.whiteText,
                { marginTop: windowWidth * 0.02, fontWeight: 'bold', fontSize: windowWidth * 0.05 },
              ]}
            >
              {textList[currentSliderIndex].descriptionText}
            </Text>
          )}
          {currentSliderIndex === 2 && (
            <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: windowWidth * 0.07 }}>
              <Pressable
                style={{
                  backgroundColor: 'white',
                  height: windowHeight * 0.05,
                  borderRadius: 5,
                  width: windowWidth * 0.9,
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}
              >
                <Image
                  source={require('../../media/SplashSlider/google_logo.png')}
                  style={{ width: 22, height: 22, paddingTop: 3 }}
                />
                <View style={{ width: 12, height: 1 }} />
                <Text
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    alignSelf: 'center',
                    fontSize: windowWidth * 0.038,
                  }}
                >
                  Continue with Google
                </Text>
              </Pressable>
              <View style={{ flexDirection: 'row', marginTop: windowWidth * 0.07 }}>
                {/* <Button
                  mode="contained"
                  uppercase={false}
                  onPress={() => navigation.navigate(SIGN_UP.toString())}
                  style={{ backgroundColor: blueColor, marginEnd: windowWidth * 0.02, width: windowWidth * 0.45 }}
                >
                  Create an Account
                </Button>
                <Button
                  mode="contained"
                  uppercase={false}
                  onPress={() => navigation.navigate(SIGN_IN.toString())}
                  style={{ backgroundColor: blueColor, marginStart: windowWidth * 0.02, width: windowWidth * 0.4 }}
                >
                  Sign In
                </Button> */}
                <Pressable
                  style={{
                    width: windowWidth * 0.45,
                    height: windowHeight * 0.05,
                    backgroundColor: commonBlueColor,
                    borderRadius: 5,
                    alignSelf: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    navigation.navigate(SIGN_UP.toString());
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: whiteColor,
                      fontSize: windowWidth * 0.04,
                    }}
                  >
                    Create an Account
                  </Text>
                </Pressable>

                <View style={{ width: 10 }} />
                <Pressable
                  style={{
                    width: windowWidth * 0.4,
                    height: windowHeight * 0.05,
                    backgroundColor: commonBlueColor,
                    borderRadius: 5,
                    alignSelf: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => {
                    navigation.navigate(SIGN_IN.toString());
                  }}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      fontWeight: 'bold',
                      color: whiteColor,
                      fontSize: windowWidth * 0.043,
                    }}
                  >
                    Sign In
                  </Text>
                </Pressable>
              </View>
            </View>
          )}
          {currentSliderIndex !== 2 && (
            <Text style={[Styles.whiteText, { marginTop: windowWidth * 0.03 }]}>
              {currentSliderIndex + 1}/{textList.length}
            </Text>
          )}
        </View>
      </View>
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <View style={{ flex: 1, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: 'white' }}>
          <ImageCarousel imageItem={imageItem} callBackIndex={(index: number) => callBackSliderIndex(index)} />
        </View>
      </View>
    </View>
  );
};

export default SliderScreen;

const Styles = StyleSheet.create({
  image: {
    width: 100,
    marginTop: windowWidth * 0.04,
    alignSelf: 'flex-end',
    resizeMode: 'contain',
  },
  whiteText: {
    color: 'white',
  },
  fishlogo: {
    width: 50,
    resizeMode: 'contain',
  },
});
