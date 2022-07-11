import React, {FC} from 'react';
import {View, StyleSheet, Image, Dimensions} from 'react-native';
import ActivityCard from '../../components/userComponenets/ActivityCard';
import UserBasicInfoCard from '../../components/userComponenets/UserBasicInfoCard';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const fishBowl = '../../media/SplashSlider/undraw_fish_bowl_uu881.png';
const logo = '../../media/AquaLogo.gif';

const NewUserLanding: FC = () => {
  return (
    <View style={Styles.container}>
      <View style={Styles.header}>
        <Image style={Styles.logo} source={require(logo)} />
      </View>
      <Icon name="rocket" size={30} color="#900" />;
      <ActivityCard />
      <UserBasicInfoCard />
      <Image source={require(fishBowl)} />
    </View>
  );
};

export default NewUserLanding;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
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
});
