import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import React, { FC, useState } from 'react';
import { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import CustomeTextInput from '../../components/CustomTextInput';
import { SIGN_UP, NEW_USER_LANDING } from '../../navigation/StackNavigation';
import { storeEmailId, storeFirstName, storeLastName, storeMobile, storeUserName } from '../../reduxstore/userSlice';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const signInURL = 'http://103.127.146.20:4000/api/v1/account/login';

const fishLogo = '../../media/FishLogo.gif';
const logo = '../../media/AquaLogo.gif';
const glogo = '../../media/googleLogo.png';

const SignIn: FC = () => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [signInError, setSignInError] = useState('');
  const [isSignInError, setIsSignInError] = useState(false);
  const [temp, setTemp] = useState('');
  const [tempState, setTempState] = useState(false);

  const navigation = useNavigation();
  const dispatch = useDispatch();

  const goToSignUp = () => {
    navigation.navigate(SIGN_UP.toString());
  };

  const onForgotPassword = () => {
    setTemp('TEMP');
    setTempState(true);
    console.log(temp, tempState);
  };

  const onSubmit = async () => {
    let data;
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailId, password: password }),
      };
      const response = await fetch(signInURL, requestOptions);
      data = await response.json();
      console.log(data.message);
      if (data.message) {
        setIsSignInError(true);
        setSignInError(data.message);
      } else {
        dispatch(storeEmailId({ email: data.email }));
        dispatch(storeFirstName({ firstName: data.first_name }));
        dispatch(storeLastName({ lastName: data.last_name }));
        dispatch(storeMobile({ mobile: data.phone_no }));
        dispatch(storeUserName({ userName: data.username }));
        navigation.navigate(NEW_USER_LANDING.toString());
      }
    } catch (error) {
      console.log('Error', error);
    }
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
          placeholder="Enter Email"
          onChangeText={(text) => setEmailId(text)}
          fieldWidth={0}
          errorMessage=""
          errorState={false}
        />
        <CustomeTextInput
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          fieldWidth={0}
          errorMessage={temp}
          errorState={tempState}
        />
        <TouchableOpacity style={Styles.button} onPress={onSubmit}>
          <Text style={Styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={Styles.googleContainer}>
          <Image style={Styles.glogo} source={require(glogo)} />
          <Text>Log In via Google</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={Styles.text}>New user?</Text>
          <TouchableOpacity onPress={goToSignUp}>
            <Text style={Styles.text}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onForgotPassword}>
          <Text>Forgot password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;

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
  googleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    padding: 5,
    flexDirection: 'row',
  },
  text: {
    marginVertical: windowHeight * 0.03,
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
  glogo: {
    resizeMode: 'contain',
    height: windowHeight * 0.05,
    width: windowWidth * 0.1,
    marginRight: 10,
  },
  button: {
    height: windowHeight * 0.05,
    width: windowWidth * 0.28,
    marginBottom: windowHeight * 0.02,
    marginTop: windowHeight * 0.05,
    borderRadius: 10,
    backgroundColor: '#0059AB',
    paddingHorizontal: windowWidth * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
