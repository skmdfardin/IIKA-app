import React, { FunctionComponent } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { windowHeight, windowWidth, whiteColor, commonBlueColor } from '../../media/css/common';
import ImageCarousel from '../../components/ImageCarousel';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationParamList } from '../../types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface SliderScreenProps { }
type naviType = NativeStackNavigationProp<StackNavigationParamList, 'slider_screen'>;

const logo = '../../media/splashScreen.png';
const fishLogo = '../../media/splashScreen.png';

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
    descriptionText: 'Audio Accessories',
  },
  {
    title: 'Beautiful handpicked collection Choosing Accessories made easy',
    filepath: require('../../media/SplashSlider/image9.png'),
    descriptionText: 'Smart Devices',
  },
  {
    title: '"The question is not what you look at, but what you see."',
    filepath: require('../../media/SplashSlider/image8.png'),
    descriptionText: 'Wearable Devices',
  },
];

const textList: Array<SliderTextItems> = [
  {
    titleText: 'Accessories made easy',
    descriptionText: 'Beautiful Handpicked Collections',
  },
  {
    titleText: 'Best-In-Class Loyalty Program',
    descriptionText: '"Freebies to choose from"',
  },
  {
    titleText: 'Get Started',
    descriptionText: '',
  },
];

const SliderScreen: FunctionComponent<SliderScreenProps> = () => {
  const [currentSliderIndex, setCurrentSliderIndex] = useState(0);
  const navigation = useNavigation<naviType>();
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
            style={{ width: windowWidth * 0.5, height: windowWidth * 0.5, alignSelf: 'flex-end', resizeMode: 'contain' }}
            source={require(logo)}
          />
          {currentSliderIndex === 0 && (
            <Text style={{ color: 'white' }}>Helloo</Text>
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
                    navigation.navigate('sign_up');
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
                    navigation.navigate('sign_in');
                    console.log('navigation.navigate');
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
