import React, {FC} from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';

import ActivityCard from '../../components/userComponenets/ActivityCard';
import UserBasicInfoCard from '../../components/userComponenets/UserBasicInfoCard';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const fishBowl = '../../media/SplashSlider/undraw_fish_bowl_uu881.png';
const logo = '../../media/AquaLogo.gif';
const menu = '../../media/menu.png';

const NewUserLanding: FC = () => {
  return (
    <View style={Styles.container}>
      <View style={Styles.header}>
        <Image style={Styles.menu} source={require(menu)} />
        <Image style={Styles.logo} source={require(logo)} />
      </View>
      <UserBasicInfoCard />
      <ActivityCard />
      <Image style={Styles.image} source={require(fishBowl)} />
    </View>
  );
};

export default NewUserLanding;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth,
    height: windowHeight * 0.09,
    backgroundColor: '#000000',
  },
  logo: {
    resizeMode: 'contain',
    height: windowHeight * 0.09,
    width: windowWidth * 0.25,
  },
  menu: {
    resizeMode: 'contain',
    height: windowHeight * 0.08,
    width: windowWidth * 0.1,
    marginLeft: windowWidth * 0.04,
    marginTop: windowHeight * 0.005,
  },
  image: {
    marginHorizontal: windowWidth * 0.2,
    marginVertical: windowHeight * 0.01,
  },
});
