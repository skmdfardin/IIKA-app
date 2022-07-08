import React, {FC} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import CustomeTextInput from '../../components/CustomTextInput';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const fishLogo = '../../media/FishLogo.gif';
const logo = '../../media/AquaLogo.gif';

const SignUp: FC = () => {
  const onSubmit = () => {
    console.log('EXIT!');
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.imageContainer}>
        <Image style={Styles.backImage1} source={require(fishLogo)} />
        <Image style={Styles.backImage2} source={require(fishLogo)} />
        <Image style={Styles.backImage3} source={require(fishLogo)} />
        <Image style={Styles.logo} source={require(logo)} />
      </View>
      <View style={Styles.subContainer}>
        <Text style={Styles.text}>LogIn</Text>
        <CustomeTextInput
          placeholder="UserName"
          onChangeText={text => console.log(text)}
        />
        <CustomeTextInput
          placeholder="Password"
          onChangeText={text => console.log(text)}
        />
        <TouchableOpacity style={Styles.button} onPress={onSubmit}>
          <Text style={Styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;
const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#000000',
  },
  subContainer: {
    alignItems: 'center',
    marginTop: windowHeight * 0.4,
    backgroundColor: '#ffffff',
    width: windowWidth,
    height: windowHeight,
    borderRadius: 20,
  },
  text: {
    margin: windowHeight * 0.05,
    color: '#000000',
  },
  buttonText: {
    color: '#ffffff',
  },
  imageContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: windowHeight * 1.3,
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
    top: windowHeight * 0.425,
    height: windowHeight * 0.11,
    width: windowWidth,
    opacity: 1,
  },
  button: {
    height: windowHeight * 0.06,
    width: windowWidth * 0.3,
    marginVertical: windowHeight * 0.02,
    borderRadius: 10,
    backgroundColor: '#0085FF',
    paddingHorizontal: windowWidth * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
