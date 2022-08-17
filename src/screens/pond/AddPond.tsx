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
  discardColour,
  saveColour,
} from '../../media/css/common';
import LabelTextInput from '../../components/LabelTextInput';
import Map from '../../components/Map';
import { CallPostApi, CallPostApiJson } from '../../utilites/Util';
import DropDownPicker from 'react-native-dropdown-picker';

// const pondConstructTypesOptions = ["Soil", "Tarpaulin"]

const logo = '../../media/AquaLogo.gif';

const url = ' http://103.127.146.20:4000/api/v1/ponds/pondregist/';

type imageFrame = {
  uri: string | undefined;
  type: string | undefined;
  name: string | undefined;
};

const AddPond: FC = () => {
  const [visible, setVisible] = useState(false);
  const [pondName, setPondName] = useState('');
  const [pondLength, setPondLength] = useState('');
  const [pondBreadth, setPondBreadth] = useState('');
  const [pondDepth, setPondDepth] = useState('');
  const [pondSurfaceArea, setPondSurfaceArea] = useState('');
  const [pondCapacity, setPondCapacity] = useState('');
  const [pondLocation, setPondLocation] = useState('');
  const [pondDesc, setPondDesc] = useState('');
  const [imageList, setImageList] = useState<imageFrame[]>([]);
  const navigation = useNavigation();
  const store = useSelector((state: any) => state.userStore);
  const farmStore = useSelector((state: any) => state.farmStore);
  const token = store.email;
  const farmID = farmStore.farmID;
  const [pondConstructOpen, setPondConstructOpen] = useState(false);
  const [pondConstructValue, setPondConstructValue] = useState(0);
  const [pondConstructItems, setPondConstructTypeItems] = useState([
    { label: 'Soil', value: 1 },
    { label: 'Tarpaulin', value: 2 },
  ]);
  const [pondTypeOpen, setPondTypeOpen] = useState(false);
  const [pondTypeValue, setPondTypeValue] = useState(0);
  const [pondTypeItems, setPondTypeItems] = useState([
    { label: 'Nursery', value: 1 },
    { label: 'Effluent Treatment Pond (ETS)', value: 2 },
    { label: 'Reservoir Pond', value: 3 },
  ]);
  let image_num = 0;

  const addImage = () => {
    setVisible(true);
  };

  const initialState = () => {
    setPondName('');
    setPondLength('');
    setPondBreadth('');
    setPondDepth('');
    setPondSurfaceArea('');
    setPondCapacity('');
    setPondLocation('');
    setPondDesc('');
    setImageList([]);
  };

  const removeimage = (name: string) => {
    const newImageList = imageList.filter((item) => item.name !== name);
    setImageList(newImageList);
  };
  const onSave = () => {
    const formData = new FormData();

    formData.append('farm', farmID);
    formData.append('pond_name', pondName);
    formData.append('pond_type', pondTypeValue);
    formData.append('pond_construct_type', pondConstructValue);
    formData.append('pond_length', parseInt(pondLength, 10));
    formData.append('pond_breadth', parseInt(pondBreadth, 10));
    formData.append('pond_depth', parseInt(pondDepth, 10));
    formData.append('pond_area', parseInt(pondSurfaceArea, 10));
    formData.append('pond_capacity', parseInt(pondCapacity, 10));
    formData.append('description', pondDesc);
    if (imageList.length > 0) {
      for (let i = 0; i < imageList.length; i++) {
        const photo = imageList[i];
        formData.append('pond_images', {
          name: photo.name,
          type: photo.type,
          uri: photo.uri,
        });
      }
    }
    console.log('FormData', formData);
    CallPostApi(url, formData, token).then((response) => {
      console.log('RESPONSE', response?.data);
      navigation.goBack();
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
          name: 'PondImage' + image_num + 'jpg',
        };
        image_num++;
        console.log('86', response);

        setImageList([...imageList, imageURI!]);
        console.log(imageList);

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
        name: 'PondImage' + image_num + 'jpg',
      };
      image_num++;

      console.log('86', response);

      setImageList([...imageList, imageURI!]);
      console.log(imageList);

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
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={PageStyles.scroll}>
          <View
            style={{
              width: windowWidth * 0.9,
              marginBottom: pondConstructOpen ? windowHeight * 0.15 : windowHeight * 0.02,
            }}
          >
            <Text> Choose pond construct type:</Text>
            <DropDownPicker
              open={pondConstructOpen}
              value={pondConstructValue}
              items={pondConstructItems}
              setOpen={setPondConstructOpen}
              setValue={setPondConstructValue}
              setItems={setPondConstructTypeItems}
              stickyHeader={true}
              placeholder={''}
              listMode="SCROLLVIEW"
            />
          </View>
          <View
            style={{ width: windowWidth * 0.9, marginBottom: pondTypeOpen ? windowHeight * 0.15 : windowHeight * 0.02 }}
          >
            <Text> Choose pond type:</Text>
            <DropDownPicker
              open={pondTypeOpen}
              value={pondTypeValue}
              items={pondTypeItems}
              setOpen={setPondTypeOpen}
              setValue={setPondTypeValue}
              setItems={setPondTypeItems}
              placeholder={''}
              listMode="SCROLLVIEW"
            />
          </View>

          <LabelTextInput
            nameOfField="Pond Name*:"
            onChange={(text) => {
              setPondName(text);
            }}
            width={windowWidth * 0.9}
            value={pondName}
          />
          <LabelTextInput
            nameOfField="Pond Length*:"
            onChange={(text) => {
              setPondLength(text);
            }}
            width={windowWidth * 0.9}
            value={pondLength}
          />
          <LabelTextInput
            nameOfField="Pond Breadth*:"
            onChange={(text) => {
              setPondBreadth(text);
            }}
            width={windowWidth * 0.9}
            value={pondBreadth}
          />
          <LabelTextInput
            nameOfField="Pond Depth*:"
            onChange={(text) => {
              setPondDepth(text);
            }}
            width={windowWidth * 0.9}
            value={pondDepth}
          />

          <LabelTextInput
            nameOfField="Pond Surface Area*:"
            onChange={(text) => {
              setPondSurfaceArea(text);
            }}
            width={windowWidth * 0.9}
            value={pondSurfaceArea}
          />

          <LabelTextInput
            nameOfField="Pond Capacity*:"
            onChange={(text) => {
              setPondCapacity(text);
            }}
            width={windowWidth * 0.9}
            value={pondCapacity}
          />
          <Map />

          <LabelTextInput
            nameOfField="Pond Description:"
            onChange={(text) => {
              setPondDesc(text);
            }}
            width={windowWidth * 0.9}
            value={pondDesc}
          />

          <View style={{ width: windowWidth * 0.9, flex: 1 }}>
            <Text>pond images*</Text>
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
  dropdown: {
    resizeMode: 'contain',
    alignItems: 'center',
    height: windowHeight * 0.05,
    justifyContent: 'center',
    paddingVertical: 10,
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
