import React, {FC} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const profile = '../../media/profile.png';

const UserBasicInfoCard: FC = () => {
  const onSubmit = () => {
    console.log('EXIT!');
  };
  return (
    <View style={Styles.container}>
      <View style={Styles.imageContainer}>
        <Image style={Styles.profile} source={require(profile)} />
      </View>
      <View style={Styles.textContainer}>
        <Text style={Styles.text}>John Doe</Text>
        <Text style={Styles.text}>Admin</Text>
        <Text style={Styles.text}>Average FCR: - </Text>
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
