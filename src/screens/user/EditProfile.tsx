import { Formik } from 'formik';
import React, { FunctionComponent, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import {
  Image,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  Modal,
  Pressable,
  Platform,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import { CameraOptions, ImageLibraryOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import LabelTextInput from '../../components/LabelTextInput';
import { blackColor, commonBlueColor, whiteColor, windowHeight, windowWidth } from '../../media/css/common';
import { CallPostApi } from '../../utilites/Util';
import { storeIsProfileComplete } from '../../reduxstore/userSlice';

interface EditProfileScreenProps {}

const logo = '../../media/AquaLogo.gif';
const profile = '../../media/profile.png';

const EditProfileScreen: FunctionComponent<EditProfileScreenProps> = () => {
  const store = useSelector((state: any) => state.userStore);
  const dispatch = useDispatch();
  const [isSaving, setIsSaving] = useState(false);
  const [userName, setuserName] = useState(store.userName);
  const [fileUri, setFileUri] = useState(undefined);
  const [fileResponse, setFileResponse] = useState(undefined);
  const [visible, setVisible] = useState(false);

  const navigation = useNavigation();
  const token = store.email;

  const alert = (text: string) => {
    console.log('29 from alert', text);
  };

  const pictureFromCamera = async (type: any) => {
    console.log('type', type);
    const options: CameraOptions = {
      quality: 1,
      mediaType: type,
    };
    const isCameraPermitted = await requestCameraPermission();
    const isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      launchCamera(options, (response) => {
        console.log('Response = ', response.assets);

        if (response.didCancel) {
          alert('User cancelled camera picker');
          return;
        }
        if (response.errorCode === 'camera_unavailable') {
          alert('Camera not available on device');
          console.log('708');
          return;
        }
        if (response.errorCode === 'permission') {
          alert('Permission not satisfied');
          return;
        }
        if (response.errorCode === 'others') {
          alert(response.errorMessage ? response.errorMessage : '');
          return;
        }
        const assetsOfImage = response.assets[0];
        console.log('86', response);

        setFileResponse(response);
        setFileUri(assetsOfImage.uri);
        setVisible(false);
      });
    }
  };

  const fromGallery = (type: any) => {
    const options: ImageLibraryOptions = {
      mediaType: type,
      quality: 1,
    };
    launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        alert('User cancelled camera picker');
        return;
      }
      if (response.errorCode === 'camera_unavailable') {
        alert('Camera not available on device');
        console.log('747');
        return;
      }
      if (response.errorCode === 'permission') {
        alert('Permission not satisfied');
        return;
      }
      if (response.errorCode === 'others') {
        alert(response.errorMessage ? response.errorMessage : '');
        return;
      }
      const assetsOfImage = response.assets[0] ? response.assets[0] : '';
      console.log('fileName -> ', assetsOfImage.uri);
      setFileResponse(response);
      setFileUri(assetsOfImage.uri);
      setVisible(false);
    });
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  const onSubmitPressed = async (values: any) => {
    const formData = new FormData();
    formData.append('email', values.emailId);
    formData.append('phone_no', values.mobileNo);
    formData.append('first_name', values.fullname);
    formData.append('username', userName);
    formData.append('image', {
      uri: fileResponse.assets[0].uri,
      type: fileResponse.assets[0].type,
      name: 'profile.jpg',
    });
    formData.append('company_name', values.companyName);
    formData.append('sic_gst_code', values.gstCode);
    formData.append('pan_no', values.panNo);
    formData.append('address_one', values.addressOne);
    formData.append('address_two', values.addressTwo);
    formData.append('pincode', values.pincode);
    formData.append('website', values.website);
    console.log('FORM DATA:', formData);
    console.log('Token', token);
    CallPostApi('http://103.127.146.20:4000/api/v1/account/profile', formData, token).then((response) => {
      console.log('RESPONSE', response);
      setIsSaving(false);
      dispatch(storeIsProfileComplete({ isProfileComplete: true }));
      // navigation.goBack();
    });
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
      }
      return false;
    }
    return true;
  };

  return (
    <ScrollView>
      <Modal visible={visible} transparent>
        <View style={{ backgroundColor: '#000000aa', flex: 1 }}>
          <View
            style={{
              backgroundColor: whiteColor,
              flexDirection: 'column',
              justifyContent: 'center',
              alignSelf: 'center',
              padding: windowWidth * 0.12,
              marginTop: windowWidth * 0.2,
            }}
          >
            <Pressable
              style={{
                marginTop: windowWidth * 0.02,
                width: windowWidth * 0.45,
                height: windowHeight * 0.05,
                backgroundColor: commonBlueColor,
                borderRadius: 5,
                alignSelf: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                console.log('launch camera');
                pictureFromCamera('photo');
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: whiteColor,
                  fontSize: windowWidth * 0.04,
                }}
              >
                Launch Camera
              </Text>
            </Pressable>
            <Pressable
              style={{
                marginTop: windowWidth * 0.02,
                width: windowWidth * 0.45,
                height: windowHeight * 0.05,
                backgroundColor: commonBlueColor,
                borderRadius: 5,
                alignSelf: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                console.log('open gallery');
                fromGallery('photo');
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: whiteColor,
                  fontSize: windowWidth * 0.04,
                }}
              >
                Select From Gallery
              </Text>
            </Pressable>
            <Pressable
              style={{
                marginTop: windowWidth * 0.02,
                width: windowWidth * 0.45,
                height: windowHeight * 0.05,
                backgroundColor: blackColor,
                borderRadius: 5,
                alignSelf: 'center',
                alignContent: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                setVisible(false);
              }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  color: whiteColor,
                  fontSize: windowWidth * 0.04,
                }}
              >
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={{ flexDirection: 'column' }}>
        <View style={Styles.container}>
          <View style={Styles.header}>
            <Image style={Styles.logo} source={require(logo)} />
          </View>
        </View>
        <View style={{ marginStart: windowWidth * 0.03 }}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => {
                setVisible(true);
                console.log('', visible);
              }}
            >
              <Image
                style={{ width: 100, height: 100, borderRadius: 100 / 2, marginTop: 5 }}
                source={fileUri !== undefined ? { uri: fileUri } : require(profile)}
              />
            </TouchableOpacity>
            <View style={{ marginStart: windowWidth * 0.1 }} />
            <View style={{ flexDirection: 'column', marginTop: windowWidth * 0.018 }}>
              <Text style={{ color: blackColor, fontWeight: 'bold', textAlign: 'right', alignSelf: 'flex-end' }}>
                Admin User
              </Text>
              <LabelTextInput
                nameOfField={'Username/ID :'}
                width={windowWidth * 0.5}
                onChange={(text) => {
                  setuserName(text);
                }}
                marginTop={windowWidth * 0.018}
                value={userName}
                disabled={true}
              />
            </View>
          </View>
          <Formik
            initialValues={{
              username: store.userName,
              fullname: store.firstName,
              emailId: store.email,
              mobileNo: store.mobile,
              companyName: '',
              gstCode: '',
              panNo: '',
              addressOne: '',
              addressTwo: '',
              pincode: '',
              website: '',
            }}
            onSubmit={(values) => {
              console.log('values', values);
              setIsSaving(true);
              onSubmitPressed(values);
            }}
          >
            {({ handleChange, handleSubmit, values }) => (
              <View style={{ marginStart: 8 }}>
                <LabelTextInput
                  nameOfField={'Full Name:'}
                  onChange={handleChange('fullname')}
                  width={windowWidth * 0.89}
                  value={values.fullname}
                />
                <LabelTextInput
                  nameOfField={'Registered E-Mail ID:'}
                  onChange={handleChange('emailId')}
                  width={windowWidth * 0.89}
                  value={values.emailId}
                />
                <View style={{ flexDirection: 'row' }}>
                  <LabelTextInput
                    nameOfField={'ICC:'}
                    onChange={() => console.log('icc')}
                    width={windowWidth * 0.15}
                    disabled
                    value={'+91'}
                  />
                  <View style={{ width: 16 }} />
                  <LabelTextInput
                    nameOfField={'Mobile Number:'}
                    onChange={handleChange('mobileNo')}
                    width={windowWidth * 0.7}
                    value={values.mobileNo}
                  />
                </View>
                <LabelTextInput
                  nameOfField={'Company Name:'}
                  onChange={handleChange('companyName')}
                  width={windowWidth * 0.89}
                  value={values.companyName}
                />
                <LabelTextInput
                  nameOfField={'SIC Code/GST No.:'}
                  onChange={handleChange('gstCode')}
                  width={windowWidth * 0.89}
                  value={values.gstCode}
                />
                <LabelTextInput
                  nameOfField={'PAN No.:'}
                  onChange={handleChange('panNo')}
                  width={windowWidth * 0.89}
                  value={values.panNo}
                />
                <LabelTextInput
                  nameOfField={'Address Line 1:'}
                  onChange={handleChange('addressOne')}
                  width={windowWidth * 0.89}
                  value={values.addressOne}
                />
                <LabelTextInput
                  nameOfField={'Address Line 2:'}
                  onChange={handleChange('addressTwo')}
                  width={windowWidth * 0.89}
                  value={values.addressTwo}
                />
                <LabelTextInput
                  nameOfField={'Pincode:'}
                  onChange={handleChange('pincode')}
                  width={windowWidth * 0.89}
                  value={values.pincode}
                />
                <LabelTextInput
                  nameOfField={'Website:'}
                  onChange={handleChange('website')}
                  width={windowWidth * 0.89}
                  value={values.website}
                />
                {isSaving ? (
                  <ActivityIndicator size="large" color="#00ff00" style={{ marginVertical: windowHeight * 0.02 }} />
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-evenly',
                      marginVertical: windowHeight * 0.02,
                    }}
                  >
                    <Button color={commonBlueColor} onPress={(text) => console.log('button', text)} title="discard" />
                    <Button onPress={handleSubmit} title="Submit" />
                  </View>
                )}
              </View>
            )}
          </Formik>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;

const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: windowWidth,
    height: windowHeight * 0.07,
    backgroundColor: '#000000',
  },
  logo: {
    resizeMode: 'contain',
    height: windowHeight * 0.07,
    width: windowWidth * 0.25,
  },
});
