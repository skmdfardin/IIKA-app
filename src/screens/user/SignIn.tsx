import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import React, { FC, useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomeTextInput from '../../components/CustomTextInput';
import {
  storeEmailId,
  storeFirstName,
  storeLastName,
  storeMobile,
  storeUserName,
  storeIsVerified,
  storeIsProfileComplete,
  storeProfileImage,
} from '../../reduxstore/userSlice';
import { storeIikaDescription, storeIikaID, storeIikaImages, storeIikaName } from '../../reduxstore/iikaSlice';
import { windowHeight, windowWidth } from '../../media/css/common';
import { CallGetApi } from '../../utilites/Util';
import { storeProductArray } from '../../reduxstore/productSlice';
import { StackNavigationParamList } from '../../types/navigation';

const signInURL = 'http://103.127.146.20:4000/api/v1/account/login';
const profileURL = 'http://103.127.146.20:4000/api/v1/account/profile';

const fishLogo = '../../media/profile.png';
const logo = '../../media/profile.png';
const glogo = '../../media/googleLogo.png';
type naviType = NativeStackNavigationProp<StackNavigationParamList, 'sign_in'>;

const SignIn: FC = () => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [signInError, setSignInError] = useState('');
  const [isSignInError, setIsSignInError] = useState(false);

  const navigation = useNavigation<naviType>();
  const dispatch = useDispatch();

  const goToSignUp = () => {
    navigation.navigate('sign_up');
  };

  const toggle = () => {
    setIsSignInError(!signInError);
  };

  const resetState = () => {
    setEmailId('');
    setPassword('');
    setSignInError('');
    setIsSignInError(false);
  };

  const onForgotPassword = () => { };

  const onSubmit = async () => {
    let data;
    let profileImageUrl;
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: emailId, password: password }),
      };
      const response = await fetch(signInURL, requestOptions);
      data = await response.json();
      if (data.message || data.detail === 'CSRF Failed: CSRF token missing or incorrect.') {
        setIsSignInError(true);
        setSignInError('Incorrect Email or Password');
      } else {
        resetState();
        const profileCheck: any = await CallGetApi(profileURL, data.email);
        const profileData = profileCheck.data;
        if (profileData.company_name !== '') {
          profileImageUrl = profileData.image.replace('localhost', '103.127.146.20');
          dispatch(storeIsProfileComplete({ isProfileComplete: true }));
          dispatch(storeProfileImage({ profileImage: profileImageUrl }));
        }
        if (data.iika_id !== null) {
          const iikaURL = 'http://103.127.146.20:4000/api/v1/iikas/iikaregist/' + data.iika_id + '/get-iika-summary/';
          const productURL = 'http://103.127.146.20:4000/api/v1/iikas/iikaregist/' + data.iika_id + '/get-related-products/';
          const iikaApicall: any = await CallGetApi(iikaURL, data.email);
          const iikaData = iikaApicall.data.result;
          const temp = iikaData.iika_images;
          const iikaImageArray = temp.map((item: any) => {
            return item.image.replace('localhost', '103.127.146.20');
          });
          const productApiCall: any = await CallGetApi(productURL, data.email);
          if (productApiCall.data.result.products !== null) {
            const productData = productApiCall.data.result.products;
            console.log('PRODUCT DATA', productData);
            dispatch(storeProductArray({ productDataArray: productData }));
          }
          dispatch(storeIikaName({ iikaName: iikaData.iika_name }));
          dispatch(storeIikaImages({ iikaImages: iikaImageArray }));
          dispatch(storeIikaID({ iikaID: data.iika_id }));
          dispatch(storeIikaDescription({ iikaDescription: iikaData.description }));
        }
        dispatch(storeEmailId({ email: data.email }));
        dispatch(storeFirstName({ firstName: data.first_name }));
        dispatch(storeLastName({ lastName: data.last_name }));
        dispatch(storeMobile({ mobile: data.phone_no }));
        dispatch(storeUserName({ userName: data.username }));
        dispatch(storeIsVerified({ isVerified: data.is_verified }));

        // navigation.navigate('');
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
          isPassword={false}
        />
        <CustomeTextInput
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          fieldWidth={0}
          errorMessage={signInError}
          errorState={isSignInError}
          isPassword={true}
        />
        {isSignInError && (
          <View style={[Styles.errorContainer, { width: windowWidth * 0.9 }]}>
            <TouchableOpacity onPress={toggle}>
              <Text style={Styles.errorText}>X</Text>
            </TouchableOpacity>
            <Text style={Styles.errorText}>{signInError}</Text>
          </View>
        )}
        {
          <TouchableOpacity style={Styles.button} onPress={() => {
            console.log('sign_in api called');
            navigation.navigate('product_display_screen');
          }}>
            <Text style={Styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
        }
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
    marginVertical: windowHeight * 0.02,
    borderRadius: 10,
    backgroundColor: '#0059AB',
    paddingHorizontal: windowWidth * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    marginHorizontal: windowWidth * 0.01,
    backgroundColor: '#C5C7D0',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    marginVertical: windowHeight * 0.005,
    marginLeft: windowWidth * 0.03,
    marginRight: windowWidth * 0.01,
    textAlign: 'center',
    color: '#ffffff',
    flexShrink: 1,
  },
});
