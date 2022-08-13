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
import DropDownPicker from 'react-native-dropdown-picker';
import CustomButton from '../../components/CustomButton'

// const pondConstructTypesOptions = ["Soil", "Tarpaulin"]


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
  // const [isCertificateImage, setIsCertificateImage] = useState(false);
  const [pondName, setPondName] = useState('');
  const [pondLength, setPondLength] = useState('');
  const [pondBreadth, setPondBreadth] = useState('');
  const [pondDepth, setPondDepth] = useState('');
  const [pondSurfaceArea, setPondSurfaceArea] = useState('');
  const [pondCapacity, setPondCapacity] = useState('');
  // const [district, setDistrict] = useState('');
  // const [townVill, setTownVill] = useState('');
  // const [pincode, setPincode] = useState('');
  const [pondLocation, setPondLocation] = useState('');
  const [pondDesc, setPondDesc] = useState('');
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
    setPondName('');
    setPondLength('');
    setPondBreadth('');
    setPondDepth('');
    setPondSurfaceArea('');
    setPondCapacity('');
    setPondLocation('');
    // setPincode('');
    setPondDesc('');
    setImageList([]);
  };

  const removeimage = (name: string) => {
    const newImageList = imageList.filter((item) => item.name !== name);
    setImageList(newImageList);
  };
  const onSave = () => {
    const formData = new FormData();

    formData.append('pond_name', pondName);
    formData.append('pond_length', parseInt(pondLength, 10));
    formData.append('pond_breadth', parseInt(pondBreadth, 10));
    formData.append('pond_depth', parseInt(pondDepth, 10));
    formData.append('pond_surface_area', parseInt(pondSurfaceArea));
    formData.append('pond_capacity', parseInt(pondCapacity));
    // formData.append('location', location);
    // formData.append('district', district);
    // formData.append('town_village', townVill);
    formData.append('description', pondDesc);
    formData.append('pond_images', null);
    console.log('FormData', formData);
    const payload = {
      pond_name: pondName,
      pond_length: parseInt(pondLength, 10),
      pond_breadth: parseInt(pondBreadth, 10),
      pond_depth: parseInt(pondDepth, 10),
      pond_surface_area: parseInt(pondSurfaceArea),
      // pincode: pincode,
      // district: district,
      // town_village: townVill,
      description: pondDesc,
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
  const [pondOpen, setPondConstructOpen] = useState(false);
  const [pondConstructValue, setPondConstructValue] = useState(null);
  const [pondConstructItems, setPondConstructTypeItems] = useState([
    { label: 'Soil', value: 'Soil' },
    { label: 'Tarpaulin', value: 'Tarpaulin' }
  ]);
  const [pondTypeOpen, setPondTypeOpen] = useState(false);
  const [pondTypeValue, setPondTypeValue] = useState(null);
  const [pondTypeItems, setPondTypeItems] = useState([
    { label: 'Nursery', value: 'Nursery' },
    { label: 'Effluent Treatment Pond (ETS)', value: 'Effluent Treatment Pond (ETS)' },
    { label: 'Reservoir Pond', value: 'Reservoir Pond' }
  ]);

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
          {/* <label>Choose Pond Construction Type</label> */}
          <DropDownPicker
            open={pondOpen}
            value={pondConstructValue}
            items={pondConstructItems}
            setOpen={setPondConstructOpen}
            setValue={setPondConstructValue}
            setItems={setPondConstructTypeItems}
            stickyHeader={true}
            placeholder={"Choose Pond Construct Type"}
            dropDownDirection="AUTO"
            bottomOffset={100}

          />
        </View>
        <View>
          {/* <label>Choose Pond Type</label> */}
          <DropDownPicker
            open={pondTypeOpen}
            value={pondTypeValue}
            items={pondTypeItems}
            setOpen={setPondTypeOpen}
            setValue={setPondTypeValue}
            setItems={setPondTypeItems}
            placeholder={"Choose Pond Type"}
          />
        </View>
        {/* <LabelTextInput
            nameOfField="Choose Pond Type*:"
            onChange={(text) => {
              setPondArea(text);
            }}
            width={windowWidth * 0.9}
            value={farmArea}
          /> */}

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
        <View style={{ flexDirection: 'row' }}>
          <View style={{ marginRight: windowWidth * 0.05 }}>
            <LabelTextInput
              nameOfField="Pond Surface Area*:"
              onChange={(text) => {
                setPondSurfaceArea(text);
              }}
              width={windowWidth * 0.425}
              value={pondSurfaceArea}
            />
          </View>
          <LabelTextInput
            nameOfField="Pond Capacity*:"
            onChange={(text) => {
              setPondCapacity(text);
            }}
            width={windowWidth * 0.9}
            value=""
          />
          <Map />
          <View>

          <LabelTextInput
            nameOfField="Pond Description:"
            onChange={(text) => {
              setPondDesc(text);
            }}
            width={windowWidth * 0.9}
            value={pondDesc}
            />
            </View>
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

const  PageStyles = StyleSheet.create({
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
    paddingVertical: 10
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
