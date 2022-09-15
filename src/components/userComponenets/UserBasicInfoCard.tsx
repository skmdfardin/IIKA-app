import React, { FC } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParamList } from '../../types/navigation';
import { windowHeight, windowWidth, styles } from '../../media/css/common';

const { robotoRegular13, robotoRegular16, robotoBold20 } = styles;

const profile = '../../media/profile.png';

type naviType = NativeStackNavigationProp<NavigationParamList>;

const UserBasicInfoCard: FC = () => {
  const store = useSelector((state: any) => state.userStore);
  const navigation = useNavigation<naviType>();

  const name = store.firstName;
  const profileImage = store.profileImage;

  const onSubmit = () => {
    console.log('STORE:', store);
    navigation.navigate('edit_profile_screen');
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.imageContainer}>
        <Image style={Styles.profile} source={profileImage !== '' ? { uri: profileImage } : require(profile)} />
      </View>
      <View style={Styles.textContainer}>
        <Text style={[Styles.text, robotoBold20]}>{name}</Text>
        <Text style={[Styles.text, robotoRegular13]}>Admin</Text>
        <Text style={[Styles.text, robotoRegular16]}>Average FCR: - </Text>
      </View>
      <View style={Styles.editButtonContainer}>
        <TouchableOpacity style={Styles.button} onPress={onSubmit}>
          <Text style={Styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserBasicInfoCard;

const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    marginVertical: windowHeight * 0.02,
    marginHorizontal: windowWidth * 0.05,
    height: windowHeight * 0.1,
    flexDirection: 'row',
  },
  profile: {
    resizeMode: 'contain',
    height: windowHeight * 0.1,
    width: windowWidth * 0.2,
    borderRadius: windowWidth * 0.5,
  },
  textContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    flexDirection: 'column',
    marginHorizontal: windowWidth * 0.02,
  },
  editButtonContainer: {
    justifyContent: 'flex-end',
    flexDirection: 'column',
    marginHorizontal: windowWidth * 0.02,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#459BFF',
  },
  button: {
    height: windowHeight * 0.04,
    width: windowWidth * 0.3,
    marginVertical: windowHeight * 0.01,
    borderRadius: 10,
    backgroundColor: '#F5F6F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#000000',
  },
});
