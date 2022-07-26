import React, { FC, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Text, Dimensions, Image, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import CustomeTextInput from '../../components/CustomTextInput';
import { NEW_USER_LANDING } from '../../navigation/StackNavigation';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const fishLogo = '../../media/FishLogo.gif';
const logo = '../../media/AquaLogo.gif';
const signInURL = 'http://103.127.146.20:4000/api/v1/account/register';

const SignUp: FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [mobileNum, setMobileNum] = useState(0);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [mobileNumError, setMobileNumError] = useState(false);

  const dispatch = useDispatch();
  const navigation = useNavigation();

  const onSubmit = async () => {
    let data;
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email,
          first_name: firstName,
          last_name: lastName,
          password: password,
          password2: confirmPassword,
          phone_no: mobileNum,
        }),
      };
      const response = await fetch(signInURL, requestOptions);
      data = await response.json();
      console.log(data.message);
      if (data.message) {
        setIsSignInError(true);
        setSignInError(data.message);
        console.log('check', data.message);
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
        <Text style={Styles.text}>Create an account</Text>
        <View style={{ flexDirection: 'row' }}>
          <CustomeTextInput
            placeholder="First Name"
            onChangeText={(text) => setFirstName(text)}
            fieldWidth={windowWidth * 0.45}
            errorMessage=" First Name Error"
            errorState={false}
          />
          <CustomeTextInput
            placeholder="Last Name"
            onChangeText={(text) => setLastName(text)}
            fieldWidth={windowWidth * 0.45}
            errorMessage="Name error"
            errorState={false}
          />
        </View>
        <CustomeTextInput
          placeholder="Email ID"
          onChangeText={(text) => setEmail(text)}
          fieldWidth={0}
          errorMessage="Email Error"
          errorState={emailError}
        />
        <CustomeTextInput
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          fieldWidth={0}
          errorMessage="test!"
          errorState={passwordError}
        />
        <CustomeTextInput
          placeholder="Confirm Password"
          onChangeText={(text) => setConfirmPassword(text)}
          fieldWidth={0}
          errorMessage="test!"
          errorState={confirmPasswordError}
        />
        <CustomeTextInput
          placeholder="Enter Mobile no"
          onChangeText={(text) => setMobileNum(text)}
          fieldWidth={0}
          errorMessage="test!"
          errorState={mobileNumError}
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
    marginTop: windowHeight * 0.35,
    backgroundColor: '#ffffff',
    width: windowWidth,
    height: windowHeight,
    borderRadius: 20,
  },
  text: {
    marginVertical: windowHeight * 0.03,
    color: '#000000',
    textAlign: 'center',
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
    height: windowHeight * 0.05,
    width: windowWidth * 0.28,
    marginVertical: windowHeight * 0.02,
    borderRadius: 10,
    backgroundColor: '#0059AB',
    paddingHorizontal: windowWidth * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
