import React, { FC, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Platform,
  PermissionsAndroid,
  Modal,
  Pressable,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import AIcon from 'react-native-vector-icons/AntDesign';
import { CameraOptions, ImageLibraryOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {
  windowHeight,
  windowWidth,
  greenColour,
  whiteColor,
  asphaltGreyColour,
  blackColor,
  commonBlueColor,
  styles,
} from '../../media/css/common';
import LabelTextInput from '../../components/LabelTextInput';
import Map from '../../components/Map';

const logo = '../../media/AquaLogo.gif';

const shadow = styles.shadow;

const AddFarm: FC = () => {
  const [imageList, setImageList] = useState([]);
  const [userName, setuserName] = useState('');
  const [visible, setVisible] = useState(false);
  const [isCertificateImage, setIsCertificateImage] = useState(false);
  const [certificateImage, setCertificateImage] = useState('');

  const addImage = () => {
    setVisible(true);
  };

  const addCertificateImage = () => {
    setIsCertificateImage(true);
    setVisible(true);
  };

  const alert = (text: string) => {
    console.log('29 from alert', text);
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
        const imageURI = assetsOfImage.uri;

        console.log('86', response);
        if (!isCertificateImage) {
          setImageList([...imageList, imageURI]);
          console.log(imageList);
        } else {
          setCertificateImage(imageURI);
          setIsCertificateImage(false);
        }
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
      const assetsOfImage = response.assets[0];
      const imageURI = assetsOfImage.uri;

      console.log('86', response);
      if (!isCertificateImage) {
        setImageList([...imageList, imageURI]);
        console.log(imageList);
      } else {
        setCertificateImage(imageURI);
        setIsCertificateImage(false);
      }
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

  return (
    <View style={PageStyles.container}>
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
      <View style={PageStyles.header}>
        <Text style={PageStyles.buttonText}>BACK</Text>
        <Image style={PageStyles.logo} source={require(logo)} />
      </View>
      <View style={{ backgroundColor: greenColour, height: windowHeight * 0.04 }}>
        <Text> + Add New Farm</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={PageStyles.scroll}>
          <LabelTextInput
            nameOfField="Farm Name*:"
            onChange={(text) => {
              console.log(text);
            }}
            width={windowWidth * 0.9}
            value=""
          />
          <LabelTextInput
            nameOfField="Farm area*(acres):"
            onChange={(text) => {
              console.log(text);
            }}
            width={windowWidth * 0.9}
            value=""
          />
          <LabelTextInput
            nameOfField="Address Line 1*:"
            onChange={(text) => {
              console.log(text);
            }}
            width={windowWidth * 0.9}
            value=""
          />
          <LabelTextInput
            nameOfField="Address Line 2*:"
            onChange={(text) => {
              console.log(text);
            }}
            width={windowWidth * 0.9}
            value=""
          />
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginRight: windowWidth * 0.05 }}>
              <LabelTextInput
                nameOfField="State*:"
                onChange={(text) => {
                  console.log(text);
                }}
                width={windowWidth * 0.425}
                value=""
              />
            </View>
            <LabelTextInput
              nameOfField="District*:"
              onChange={(text) => {
                console.log(text);
              }}
              width={windowWidth * 0.425}
              value=""
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginRight: windowWidth * 0.05 }}>
              <LabelTextInput
                nameOfField="Town/Village*:"
                onChange={(text) => {
                  console.log(text);
                }}
                width={windowWidth * 0.425}
                value=""
              />
            </View>
            <LabelTextInput
              nameOfField="Pincode*:"
              onChange={(text) => {
                console.log(text);
              }}
              width={windowWidth * 0.425}
              value=""
            />
          </View>
          <LabelTextInput
            nameOfField="location*:"
            onChange={(text) => {
              console.log(text);
            }}
            width={windowWidth * 0.9}
            value=""
          />
          <Map />
          <LabelTextInput
            nameOfField="farm Description:"
            onChange={(text) => {
              console.log(text);
            }}
            width={windowWidth * 0.9}
            value=""
          />
          <View style={{ width: windowWidth * 0.9, flex: 1 }}>
            <Text>Farm images*</Text>
            <View
              style={{
                width: windowWidth * 0.9,
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                padding: 10,
              }}
            >
              {imageList &&
                imageList.map((imageUri, id) => {
                  return (
                    <View style={PageStyles.imageContainer}>
                      <View style={PageStyles.image}>
                        <Image source={{ uri: imageUri }} style={{ flex: 1 }} />
                      </View>
                      <TouchableOpacity
                        style={PageStyles.imageButton}
                        onPress={() => {
                          console.log('change');
                        }}
                      >
                        <Text style={PageStyles.buttonText}>remove image</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              <TouchableOpacity onPress={addImage}>
                <View style={[PageStyles.addImage]}>
                  <AIcon name="plus" size={30} color={asphaltGreyColour} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text>Farm Certifications*</Text>
            <TouchableOpacity onPress={addCertificateImage}>
              <View style={[PageStyles.addImage, { marginLeft: windowWidth * 0.25 }]}>
                <AIcon name="plus" size={30} color={asphaltGreyColour} />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={PageStyles.certificateButton}
              onPress={() => {
                console.log('UPDATE');
              }}
            >
              <Text style={PageStyles.buttonText}>Upload Certificate</Text>
            </TouchableOpacity>
            <View style={{ marginVertical: windowHeight * 0.01 }}>
              <Text>Select New Certificate:</Text>
              <View style={[PageStyles.certificateInput, shadow]}>
                <TextInput
                  onChangeText={(text) => {
                    console.log(text);
                    setuserName(text);
                  }}
                  value={userName}
                  placeholder=""
                />
              </View>
            </View>
            <View style={{ marginVertical: windowHeight * 0.01 }}>
              <Text>Certificate No:</Text>
              <View style={[PageStyles.certificateInput, shadow]}>
                <TextInput
                  onChangeText={(text) => {
                    console.log(text);
                    setuserName(text);
                  }}
                  value={userName}
                  placeholder=""
                />
              </View>
            </View>
            <View style={{ marginVertical: windowHeight * 0.01 }}>
              <Text>Another Identifier:</Text>
              <View style={[PageStyles.certificateInput, shadow]}>
                <TextInput
                  onChangeText={(text) => {
                    console.log(text);
                    setuserName(text);
                  }}
                  value={userName}
                  placeholder=""
                />
              </View>
            </View>
            <TouchableOpacity
              style={[PageStyles.certificateButton, { backgroundColor: greenColour }]}
              onPress={() => {
                console.log('change');
              }}
            >
              <Text style={PageStyles.buttonText}>Add New Certificate</Text>
            </TouchableOpacity>
            <View
              style={[
                shadow,
                {
                  backgroundColor: whiteColor,
                  borderRadius: 30,
                  width: windowWidth * 0.9,
                  paddingVertical: 20,
                  paddingHorizontal: 10,
                },
              ]}
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={[PageStyles.certificateImage]}>
                  <Image source={{ uri: certificateImage }} style={{ flex: 1 }} />
                </View>
                <TouchableOpacity
                  style={[PageStyles.certificateDeleteButton]}
                  onPress={() => {
                    console.log('change');
                  }}
                >
                  <Text style={PageStyles.buttonText}>Delete Certificate</Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text>DETAILS 1</Text>
                <Text>DETAILS 2</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddFarm;

const PageStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    height: windowHeight * 0.09,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
    height: windowHeight * 0.09,
    width: windowWidth * 0.25,
  },
  scroll: {
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: windowHeight * 0.02,
  },
  certificateButton: {
    height: windowHeight * 0.05,
    width: windowWidth * 0.5,
    marginVertical: windowHeight * 0.02,
    marginLeft: windowWidth * 0.2,
    borderRadius: 10,
    backgroundColor: '#0059AB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  certificateDeleteButton: {
    height: windowHeight * 0.05,
    width: windowWidth * 0.5,
    borderRadius: 10,
    backgroundColor: '#B63546',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageButton: {
    height: windowHeight * 0.03,
    width: windowWidth * 0.35,
    borderRadius: 10,
    backgroundColor: '#0059AB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: { margin: windowWidth * 0.01, alignItems: 'center', justifyContent: 'center' },
  image: {
    backgroundColor: whiteColor,
    height: windowHeight * 0.17,
    width: windowWidth * 0.34,
    borderColor: '#BDBDBD',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  certificateImage: {
    backgroundColor: whiteColor,
    height: windowHeight * 0.075,
    width: windowWidth * 0.3,
  },
  certificateInput: {
    width: windowWidth * 0.9,
    height: windowHeight * 0.07,
    backgroundColor: whiteColor,
    borderRadius: 5,
  },
  addImage: {
    height: windowHeight * 0.2,
    width: windowWidth * 0.4,
    margin: windowWidth * 0.01,
    backgroundColor: '#F5F6F8',
    borderStyle: 'dashed',
    borderWidth: 2,
    borderColor: '#C5C7D0',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
