import React, { FC, useEffect, useState } from 'react';
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
  SafeAreaView,
} from 'react-native';
import AIcon from 'react-native-vector-icons/AntDesign';
import { Calendar } from 'react-native-calendars';
import { CameraOptions, ImageLibraryOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParamList } from '../../types/navigation';
import {
  windowHeight,
  windowWidth,
  whiteColor,
  asphaltGreyColour,
  blackColor,
  commonBlueColor,
  discardColour,
  saveColour,
  orangeColor2,
} from '../../media/css/common';
import LabelTextInput from '../../components/LabelTextInput';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { CallPostApi } from '../../utilites/Util';

const logo = '../../media/AquaLogo.gif';

const addCycleUrl = 'http://103.127.146.20:4000/api/v1/cycle/cycleregist/';

type naviType = NativeStackNavigationProp<NavigationParamList, 'splash_screen'>;

type imageFrame = {
  uri: string | undefined;
  type: string | undefined;
  name: string | undefined;
};

type dropdownValue = {
  label: string;
  value: number;
};

const AddCycle: FC = () => {
  const navigation = useNavigation<naviType>();
  const pondStore = useSelector((state: any) => state.pondStore);
  const validPonds = pondStore.pondDataArray;

  const [visible, setVisible] = useState(false);
  const [calenderVisible, setCalenderVisible] = useState(false);
  const [isPondImage, setisPondImage] = useState(false);
  const [totalNumberofLarvae, setTotalNumberofLarvae] = useState('');
  const [seedInvestmentAmount, setSeedInvestmentAmount] = useState('');
  const [seedingDate, setSeedingDate] = useState('');
  const [pondPreparationCost, setPondPreparationCost] = useState('');
  const [cycleDescription, setCycleDescription] = useState('');
  const [seedImages, setSeedImages] = useState<imageFrame[]>([]);
  const [pondImages, setPondImages] = useState<imageFrame[]>([]);
  const [selectSpeciesValue, setselectSpeciesValue] = useState(0);
  const [speciesPLStageValue, setSpeciesPLStageValue] = useState(0);
  const [selectSpeciesOpen, setSelectSpeciesOpen] = useState(false);
  const [speciesPLStageOpen, setSpeciesPLStageOpen] = useState(false);
  const [initialRender, setInitialRender] = useState(true);
  const [selectSpeciesItems, setSelectSpeciesItems] = useState<dropdownValue[]>([{ label: 'Vennamai', value: 1 }]);
  const [speciesPLStageItems, setSpeciesPLStageItems] = useState<dropdownValue[]>([
    { label: 'PL-5', value: 1 },
    { label: 'PL-10', value: 2 },
    { label: 'PL-15', value: 3 },
  ]);
  const [selectSeedCompanyItems, setSelectSeedCompanyItems] = useState<dropdownValue[]>([
    { label: 'Company-ABC', value: 1 },
    { label: 'Company-XYZ', value: 2 },
  ]);
  const [selectSeedCompanyValue, setSelectSeedCompanyValue] = useState(0);
  const [selectSeedCompanyOpen, setSelectSeedCompanyOpen] = useState(false);
  const [selectPondItems, setSelectPondItems] = useState<dropdownValue[]>([]);
  const [selectPondValue, setSelectPondValue] = useState(0);
  const [selectPondOpen, setSelectPondOpen] = useState(false);
  const store = useSelector((state: any) => state.userStore);
  const token = store.email;

  useEffect(() => {
    getPondItems();
    if (initialRender) {
      setInitialRender(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialRender]);

  const getPondItems = async () => {
    let temp: dropdownValue[] = [];
    try {
      temp = await validPonds.map((pond: any) => {
        return {
          label: pond.id.string + '-' + pond.pond_name,
          value: pond.id,
        };
      });
    } catch (error) {
      console.log(error);
    }
    pondItems(temp);
  };

  const pondItems = (items: dropdownValue[]) => {
    setSelectPondItems(items);
  };
  const addImage = () => {
    setVisible(true);
  };
  const addPondImage = () => {
    setisPondImage(true);
    setVisible(true);
  };

  const initialState = () => {
    setTotalNumberofLarvae('');
    setSeedInvestmentAmount('');
    setSeedingDate('');
    setPondPreparationCost('');
    setCycleDescription('');
    setSeedImages([]);
    setSelectPondItems([]);
    setPondImages([]);
  };

  const alert = (text: string) => {
    console.log('29 from alert', text);
  };

  const removeimageSeed = (name: string) => {
    const newSeedImages = seedImages.filter((item) => item.name !== name);
    setSeedImages(newSeedImages);
  };
  const removeimagePond = (name: string) => {
    const newPondImages = pondImages.filter((item) => item.name !== name);
    setPondImages(newPondImages);
  };

  const onSave = () => {
    const formData = new FormData();

    formData.append('Pond', selectPondValue);
    formData.append('species', selectSpeciesValue);
    formData.append('species_pl_stage', speciesPLStageValue);
    formData.append('seed_company', selectSeedCompanyValue);
    formData.append('invest_amount', parseInt(seedInvestmentAmount, 10));
    formData.append('pondPrep_cost', parseInt(pondPreparationCost, 10));
    formData.append('seeding_date', seedingDate);
    formData.append('description', cycleDescription);
    formData.append('numbers_of_larva', parseInt(totalNumberofLarvae, 10));
    if (seedImages.length > 0) {
      for (let i = 0; i < seedImages.length; i++) {
        const photo = seedImages[i];
        formData.append('seed_images', {
          name: photo.name,
          type: photo.type,
          uri: photo.uri,
        });
      }
    }
    if (pondImages.length > 0) {
      for (let i = 0; i < pondImages.length; i++) {
        const photo = pondImages[i];
        formData.append('pond_images', {
          name: photo.name,
          type: photo.type,
          uri: photo.uri,
        });
      }
    }
    console.log('FORM DATA', formData);
    CallPostApi(addCycleUrl, formData, token).then((response) => {
      console.log('RESPONSE', response?.data);
      navigation.goBack();
    });
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        console.warn(error);
      }
      return false;
    }
    return true;
  };

  const pictureFromCamera = async (photo: any) => {
    console.log('type', photo);
    const options: CameraOptions = {
      quality: 1,
      mediaType: photo,
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
        let temp = '';
        if (!isPondImage) {
          temp = 'seed' + selectPondValue + seedImages.length + 'image';
        } else {
          temp = 'cycle' + selectPondValue + pondImages.length + 'image';
        }
        const imageURI = {
          uri: assetsOfImage.uri,
          type: assetsOfImage.type,
          name: temp,
        };
        if (!isPondImage) {
          console.log('successful');
          setSeedImages([...seedImages, imageURI]);
        } else {
          setPondImages([...pondImages, imageURI]);
          setisPondImage(false);
        }
        console.log('86', response);
        setVisible(false);
      });
    }
  };

  const fromGallery = (photo: any) => {
    const options: ImageLibraryOptions = {
      mediaType: photo,
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
      let temp = '';
      if (!isPondImage) {
        temp = 'seed' + selectPondValue + seedImages.length + 'image';
      } else {
        temp = 'cycle' + selectPondValue + pondImages.length + 'image';
      }
      const imageURI = {
        uri: assetsOfImage.uri,
        type: assetsOfImage.type,
        name: temp,
      };
      console.log(isPondImage);
      if (!isPondImage) {
        console;
        console.log('successful');
        setSeedImages([...seedImages, imageURI]);
      } else {
        setPondImages([...pondImages, imageURI]);
        setisPondImage(false);
      }
      console.log('86', response);
      setVisible(false);
    });
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (error) {
        console.warn(error);
        return false;
      }
    }
    return true;
  };

  return (
    <SafeAreaView style={PageStyles.container}>
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
      <Modal visible={calenderVisible} transparent={true}>
        <TouchableOpacity
          style={{ backgroundColor: '#000000aa', flex: 1, justifyContent: 'center' }}
          onPress={() => {
            setCalenderVisible(!calenderVisible);
          }}
        >
          <Calendar
            initialDate={moment().format('YYYY-MM-DD')}
            onDayPress={(day) => {
              console.log('selected day', day.dateString);
              setSeedingDate(day.dateString);
              setCalenderVisible(false);
            }}
          />
        </TouchableOpacity>
      </Modal>
      <View style={PageStyles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={PageStyles.backButton}>BACK</Text>
        </TouchableOpacity>
        <Image style={PageStyles.logo} source={require(logo)} />
      </View>
      <View style={{ backgroundColor: orangeColor2, height: windowHeight * 0.04 }}>
        <View>
          <Text style={PageStyles.text}> + Add New Cycle</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={PageStyles.scroll}>
          <View
            style={{
              width: windowWidth * 0.9,
              marginBottom: selectPondOpen ? windowHeight * 0.27 : windowHeight * 0.01,
              marginTop: windowHeight * 0.02,
            }}
          >
            <Text> Select Pond*:</Text>
            <DropDownPicker
              open={selectPondOpen}
              value={selectPondValue}
              items={selectPondItems}
              setOpen={setSelectPondOpen}
              setValue={setSelectPondValue}
              setItems={setSelectPondItems}
              placeholder={''}
              listMode="SCROLLVIEW"
              dropDownDirection="BOTTOM"
            />
          </View>
          <View
            style={{
              width: windowWidth * 0.9,
              marginBottom: selectSpeciesOpen ? windowHeight * 0.05 * selectSpeciesItems.length : windowHeight * 0.01,
              marginTop: windowHeight * 0.02,
            }}
          >
            <Text> Select Species*:</Text>
            <DropDownPicker
              open={selectSpeciesOpen}
              value={selectSpeciesValue}
              items={selectSpeciesItems}
              setOpen={setSelectSpeciesOpen}
              setValue={setselectSpeciesValue}
              setItems={setSelectSpeciesItems}
              placeholder={''}
              listMode="SCROLLVIEW"
              dropDownDirection="BOTTOM"
            />
          </View>
          <View
            style={{
              width: windowWidth * 0.9,
              marginBottom: speciesPLStageOpen ? windowHeight * 0.05 * speciesPLStageItems.length : windowHeight * 0.01,
              marginTop: windowHeight * 0.02,
            }}
          >
            <Text>Species PL-Stage*:</Text>
            <DropDownPicker
              open={speciesPLStageOpen}
              value={speciesPLStageValue}
              items={speciesPLStageItems}
              setOpen={setSpeciesPLStageOpen}
              setValue={setSpeciesPLStageValue}
              setItems={setSpeciesPLStageItems}
              placeholder={''}
              listMode="SCROLLVIEW"
              dropDownDirection="BOTTOM"
            />
          </View>
          <LabelTextInput
            nameOfField="Total Number of Larvae*"
            onChange={(text) => {
              setTotalNumberofLarvae(text);
            }}
            width={windowWidth * 0.9}
            value={totalNumberofLarvae}
          />
          <View
            style={{
              width: windowWidth * 0.9,
              marginBottom: selectSeedCompanyOpen
                ? windowHeight * 0.05 * selectSeedCompanyItems.length
                : windowHeight * 0.01,
              marginTop: windowHeight * 0.02,
            }}
          >
            <Text> Select Seed Company*:</Text>
            <DropDownPicker
              open={selectSeedCompanyOpen}
              value={selectSeedCompanyValue}
              items={selectSeedCompanyItems}
              setOpen={setSelectSeedCompanyOpen}
              setValue={setSelectSeedCompanyValue}
              setItems={setSelectSeedCompanyItems}
              placeholder={''}
              listMode="SCROLLVIEW"
              dropDownDirection="BOTTOM"
            />
          </View>
          <LabelTextInput
            nameOfField="Seed Investment Amount*"
            onChange={(text) => {
              setSeedInvestmentAmount(text);
            }}
            width={windowWidth * 0.9}
            value={seedInvestmentAmount}
          />
          <LabelTextInput
            nameOfField="Seeding Date*"
            isCalender={true}
            onChange={(text) => {
              setSeedingDate(text);
            }}
            onCalenderPress={() => {
              setCalenderVisible(true);
            }}
            width={windowWidth * 0.9}
            value={seedingDate}
          />
          <LabelTextInput
            nameOfField="Pond Preparation Cost*:"
            onChange={(text) => {
              setPondPreparationCost(text);
            }}
            width={windowWidth * 0.9}
            value={pondPreparationCost}
          />
          <LabelTextInput
            nameOfField="Cycle Description(Optional)"
            onChange={(text) => {
              setCycleDescription(text);
            }}
            width={windowWidth * 0.9}
            value={cycleDescription}
          />
          <View style={{ height: windowHeight * 0.02 }} />
          <View style={{ width: windowWidth * 0.9, flex: 1 }}>
            <Text style={{ color: blackColor }}>Seed images*</Text>
            <View
              style={{
                width: windowWidth * 0.9,
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                padding: 10,
              }}
            >
              {seedImages &&
                seedImages.map((image, id) => {
                  return (
                    <View style={PageStyles.imageContainer} key={id}>
                      <View style={PageStyles.image}>
                        <Image source={{ uri: image.uri }} style={{ flex: 1 }} />
                      </View>
                      <TouchableOpacity
                        style={PageStyles.imageButton}
                        onPress={() => {
                          removeimageSeed(image.name!);
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

          <View style={{ width: windowWidth * 0.9, flex: 1 }}>
            <Text style={{ color: blackColor }}>Prepared Pond Images*</Text>
            <View
              style={{
                width: windowWidth * 0.9,
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                padding: 10,
              }}
            >
              {pondImages &&
                pondImages.map((image, id) => {
                  return (
                    <View style={PageStyles.imageContainer} key={id}>
                      <View style={PageStyles.image}>
                        <Image source={{ uri: image.uri }} style={{ flex: 1 }} />
                      </View>
                      <TouchableOpacity
                        style={PageStyles.imageButton}
                        onPress={() => {
                          removeimagePond(image.name!);
                        }}
                      >
                        <Text style={PageStyles.buttonText}>remove image</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              <TouchableOpacity onPress={addPondImage}>
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
    </SafeAreaView>
  );
};

export default AddCycle;

const PageStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: whiteColor,
    justifyContent: 'center',
    paddingLeft: windowWidth * 0.02,
    paddingTop: windowHeight * 0.008,
  },
  backButton: {
    color: '#ffffff',
    fontSize: windowHeight * 0.02,
    paddingLeft: windowWidth * 0.025,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    height: windowHeight * 0.07,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
    height: windowHeight * 0.07,
    width: windowWidth * 0.25,
  },
  scroll: {
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: windowHeight * 0.02,
  },
  imageButton: {
    height: windowHeight * 0.03,
    width: windowWidth * 0.35,
    borderRadius: 10,
    backgroundColor: '#0059AB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    margin: windowWidth * 0.01,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    backgroundColor: whiteColor,
    height: windowHeight * 0.17,
    width: windowWidth * 0.34,
    borderColor: '#BDBDBD',
    borderWidth: 2,
    borderStyle: 'solid',
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
