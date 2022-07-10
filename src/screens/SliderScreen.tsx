import React, { FunctionComponent } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { windowHeight, windowWidth, styles, whiteColor } from '../media/css/common';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImageCarousel from '../components/ImageCarousel';

interface SliderScreenProps {}

const logo = '../media/AquaLogo.gif';
const fishLogo = '../media/FishLogo.gif';
const sliderImageOne = '../media/SplashSlider/image6.png';

const { robotoRegular14 } = styles;

const SliderScreen: FunctionComponent<SliderScreenProps> = () => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <View style={{ flexDirection: 'column' }}>
          <Image
            style={{ width: 100, marginTop: windowWidth * 0.04, alignSelf: 'flex-end', resizeMode: 'contain' }}
            source={require(logo)}
          />
          <Image style={{ width: 80, resizeMode: 'contain', height: 80 }} source={require(fishLogo)} />
          <Text style={[Styles.whiteText, { fontSize: windowWidth * 0.1, fontWeight: 'bold' }]}>
            Aquaculture made easy
          </Text>
          <Text
            style={[
              Styles.whiteText,
              { marginTop: windowWidth * 0.02, fontWeight: 'bold', fontSize: windowWidth * 0.05 },
            ]}
          >
            beautiful handpicked collections in two lines
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 50 }}>
        <MIcon
          name="send"
          size={windowWidth * 0.05}
          color={whiteColor}
          style={{ transform: [{ rotateZ: '180deg' }] }}
        />
        <ImageCarousel />
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
