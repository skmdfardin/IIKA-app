import React, { FC, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
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
} from 'react-native';
import AIcon from 'react-native-vector-icons/AntDesign';
import { CameraOptions, ImageLibraryOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {
  windowHeight,
  windowWidth,
  whiteColor,
  asphaltGreyColour,
  blackColor,
  commonBlueColor,
  styles,
  discardColour,
  saveColour,
} from '../../media/css/common';
import LabelTextInput from '../../components/LabelTextInput';
import Map from '../../components/Map';
import { CallPostApiJson } from '../../utilites/Util';

const logo = '../../media/AquaLogo.gif';

const shadow = styles.shadow;

const url = 'http://103.127.146.20:4000/api/v1/farms/farmregist/';

type imageFrame = {
  uri: string | undefined;
  type: string | undefined;
  name: string | undefined;
};

const AddPond: FC = () => {
  const [visible, setVisible] = useState(false);
  const [isCertificateImage, setIsCertificateImage] = useState(false);
  const [farmName, setFarmName] = useState('');
  const [farmArea, setFarmArea] = useState('');
  const [farmAddr1, setFarmAddr1] = useState('');
  const [farmAddr2, setFarmAddr2] = useState('');
  const [addrState, setAddrState] = useState('');
  const [district, setDistrict] = useState('');
  const [townVill, setTownVill] = useState('');
  const [pincode, setPincode] = useState('');
  const [farmDesc, setFarmDesc] = useState('');
  const [imageList, setImageList] = useState<imageFrame[]>([]);
  const navigation = useNavigation();
  const store = useSelector((state: any) => state.userStore);
  const farmStore = useSelector((state: any) => state.farmStore);
  const token = store.email;
  const farmID = farmStore.farmID;

  const addImage = () => {
    setVisible(true);
  };

  const initialState = () => {
    setFarmName('');
    setFarmArea('');
    setFarmAddr1('');
    setFarmAddr2('');
    setAddrState('');
    setDistrict('');
    setTownVill('');
    setPincode('');
    setFarmDesc('');
    setImageList([]);
  };

  const removeimage = (name: string) => {
    const newImageList = imageList.filter((item) => item.name !== name);
    setImageList(newImageList);
  };
  const onSave = () => {
    const formData = new FormData();

    formData.append('farm_name', farmName);
    formData.append('farm_area', parseInt(farmArea, 10));
    formData.append('address_line_one', farmAddr1);
    formData.append('address_line_two', farmAddr2);
    formData.append('state', addrState);
    formData.append('pincode', pincode);
    formData.append('district', district);
    formData.append('town_village', townVill);
    formData.append('description', farmDesc);
    formData.append('farm_images', null);
    console.log('FormData', formData);
    const payload = {
      farm_name: farmName,
      farm_area: parseInt(farmArea, 10),
      address_line_one: farmAddr1,
      address_line_two: farmAddr2,
      state: addrState,
      pincode: pincode,
      district: district,
      town_village: townVill,
      description: farmDesc,
      farm_images: imageList,
    };
    CallPostApiJson(url, payload, token).then((response) => {
      console.log('RESPONSE', response?.data?.stringify);
      //  navigation.goBack();
    });
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
        const imageURI = {
          uri: assetsOfImage.uri,
          type: assetsOfImage.type,
          name: assetsOfImage.fileName,
        };

        console.log('86', response);
        if (!isCertificateImage) {
          setImageList([...imageList, imageURI!]);
          console.log(imageList);
        } else {
          setCertificateImage(imageURI!);
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
      console.log('RESPONSE', response);
      const assetsOfImage = response.assets[0];
      const imageURI = {
        uri: assetsOfImage.uri,
        type: assetsOfImage.type,
        name: assetsOfImage.fileName,
      };

      console.log('86', response);
      if (!isCertificateImage) {
        setImageList([...imageList, imageURI!]);
        console.log(imageList);
      } else {
        setCertificateImage(imageURI!);
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
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={PageStyles.buttonText}>BACK</Text>
        </TouchableOpacity>
        <Image style={PageStyles.logo} source={require(logo)} />
      </View>
      <View
        style={{
          backgroundColor: '#0059AB',
          height: windowHeight * 0.04,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ color: whiteColor }}> + Add New Pond</Text>
        <Text style={{ color: whiteColor }}>#{farmID}</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={PageStyles.scroll}>
          <LabelTextInput
            nameOfField="Choose Pond Construct Type*:"
            onChange={(text) => {
              setFarmName(text);
            }}
            width={windowWidth * 0.9}
            value={farmName}
          />
          <LabelTextInput
            nameOfField="Choose Pond Type*:"
            onChange={(text) => {
              setFarmArea(text);
            }}
            width={windowWidth * 0.9}
            value={farmArea}
          />
          <LabelTextInput
            nameOfField="Pond Name*:"
            onChange={(text) => {
              setFarmAddr1(text);
            }}
            width={windowWidth * 0.9}
            value={farmAddr1}
          />
          <LabelTextInput
            nameOfField="Pond Length*:"
            onChange={(text) => {
              setFarmAddr2(text);
            }}
            width={windowWidth * 0.9}
            value={farmAddr2}
          />
          <LabelTextInput
            nameOfField="Pond Breadth*:"
            onChange={(text) => {
              setFarmAddr2(text);
            }}
            width={windowWidth * 0.9}
            value={farmAddr2}
          />
          <LabelTextInput
            nameOfField="Pond Deapth*:"
            onChange={(text) => {
              setFarmAddr2(text);
            }}
            width={windowWidth * 0.9}
            value={farmAddr2}
          />
          <View style={{ flexDirection: 'row' }}>
            <View style={{ marginRight: windowWidth * 0.05 }}>
              <LabelTextInput
                nameOfField="Pond Surface Area*:"
                onChange={(text) => {
                  setTownVill(text);
                }}
                width={windowWidth * 0.425}
                value={townVill}
              />
            </View>
            <LabelTextInput
              nameOfField="Pond Volume*:"
              onChange={(text) => {
                setPincode(text);
              }}
              width={windowWidth * 0.425}
              value={pincode}
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
            nameOfField="Pond Description:"
            onChange={(text) => {
              setFarmDesc(text);
            }}
            width={windowWidth * 0.9}
            value={farmDesc}
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
                imageList.map((image, id) => {
                  return (
                    <View style={PageStyles.imageContainer} key={id}>
                      <View style={PageStyles.image}>
                        <Image source={{ uri: image.uri }} style={{ flex: 1 }} />
                      </View>
                      <TouchableOpacity
                        style={PageStyles.imageButton}
                        onPress={() => {
                          removeimage(image.name!);
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
          <View
            style={{
              flexDirection: 'row',
              width: windowWidth * 0.6,
              justifyContent: 'space-around',
            }}
          >
            <TouchableOpacity
              style={[PageStyles.endButton, { backgroundColor: discardColour }]}
              onPress={() => {
                initialState();
              }}
            >
              <Text style={PageStyles.buttonText}>Discard</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[PageStyles.endButton, { backgroundColor: saveColour }]}
              onPress={() => {
                onSave();
              }}
            >
              <Text style={PageStyles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddPond;

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
  certificateCard: {
    backgroundColor: whiteColor,
    marginVertical: windowHeight * 0.005,
    borderRadius: 30,
    width: windowWidth * 0.9,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  endButton: {
    height: windowHeight * 0.05,
    width: windowWidth * 0.2,
    marginVertical: windowHeight * 0.02,
    borderRadius: 10,
    backgroundColor: '#0059AB',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
