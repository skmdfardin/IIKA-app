import React, { FC, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, StyleSheet, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomeTextInput from '../../components/CustomTextInput';
import { storeEmailId, storeFirstName, storeLastName, storeMobile, storeUserName } from '../../reduxstore/userSlice';
import { windowHeight, windowWidth } from '../../media/css/common';
import { NavigationParamList } from '../../types/navigation';

const fishLogo = '../../media/FishLogo.gif';
const logo = '../../media/AquaLogo.gif';
const signInURL = 'http://103.127.146.20:4000/api/v1/account/register';

type naviType = NativeStackNavigationProp<NavigationParamList, 'sign_up'>;

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
  const navigation = useNavigation<naviType>();

  const resetState = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setMobileNum(0);
    setEmailError(false);
    setPasswordError(false);
    setConfirmPasswordError(false);
    setMobileNumError(false);
  };
  const validate = async () => {
    console.log('check2');
    const comparePassword = await ComparePassword(password, confirmPassword);
    const checkEmail = await CheckEmail(email);
    const checkMobile = await CheckPhone(mobileNum.toString());
    let isError = false;
    if (comparePassword !== null) {
      console.log('check password');
      setConfirmPasswordError(true);
      isError = true;
    } else {
      setConfirmPasswordError(false);
      isError = false;
    }
    if (checkEmail !== null) {
      console.log('check email');
      setEmailError(true);
      isError = true;
    } else {
      setEmailError(false);
      isError = false;
    }
    if (checkMobile !== null) {
      setEmailError(true);
      isError = true;
    } else {
      setEmailError(false);
      isError = false;
    }
    if (!isError) {
      return false;
    } else {
      return true;
    }
  };
  const onSubmit = async () => {
    console.log('check1');
    if (await validate()) {
      console.log('check3');
      let data;
      try {
        console.log('check4');
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
        console.log('RESPONCE IN SIGN UP', response);
        data = await response.json();
        if (data.response) {
          console.log('DATA /n', data);
          dispatch(storeEmailId({ email: data.email }));
          dispatch(storeFirstName({ firstName: data.first_name }));
          dispatch(storeLastName({ lastName: data.last_name }));
          dispatch(storeMobile({ mobile: data.phone_no }));
          dispatch(storeUserName({ userName: data.username }));
          console.log('responce', data.responce);
          console.log('Data', data);
          resetState();
          navigation.navigate('new_user_landing');
        } else {
          console.log('Response', data);
        }
      } catch (error) {
        console.log('Error', error);
      }
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
      <ScrollView>
        <View style={Styles.subContainer}>
          <Text style={Styles.text}>Create an account</Text>
          <View style={{ flexDirection: 'row' }}>
            <CustomeTextInput
              placeholder="First Name"
              onChangeText={(text) => setFirstName(text)}
              fieldWidth={windowWidth * 0.45}
              errorMessage=" First Name Error"
              errorState={false}
              isPassword={false}
            />
            <CustomeTextInput
              placeholder="Last Name"
              onChangeText={(text) => setLastName(text)}
              fieldWidth={windowWidth * 0.45}
              errorMessage="Name error"
              errorState={false}
              isPassword={false}
            />
          </View>
          <CustomeTextInput
            placeholder="Email ID"
            onChangeText={(text) => setEmail(text)}
            fieldWidth={0}
            errorMessage="Enter a proper email"
            errorState={emailError}
            isPassword={false}
          />
          <CustomeTextInput
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            fieldWidth={0}
            errorMessage=""
            errorState={passwordError}
            isPassword={true}
          />
          <CustomeTextInput
            placeholder="Confirm Password"
            onChangeText={(text) => setConfirmPassword(text)}
            fieldWidth={0}
            errorMessage="Passwords do not match"
            errorState={confirmPasswordError}
            isPassword={true}
          />
          <CustomeTextInput
            placeholder="Enter Mobile no"
            onChangeText={(text) => setMobileNum(parseInt(text, 10))}
            fieldWidth={0}
            errorMessage=""
            errorState={mobileNumError}
            isPassword={false}
            isNumeric={true}
            maxLength={10}
          />

          <TouchableOpacity
            style={Styles.button}
            onPress={() => {
              console.log('pressed');
              onSubmit();
            }}
          >
            <Text style={Styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default SignUp;

const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#000000',
    flex: 1,
  },
  subContainer: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    width: windowWidth,
    height: windowHeight * 0.6,
    marginTop: windowHeight * 0.4,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
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
