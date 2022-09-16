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
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import Aicons from 'react-native-vector-icons/AntDesign';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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
  successColor,
} from '../../media/css/common';
import LabelTextInput from '../../components/LabelTextInput';
import RadioForm from 'react-native-simple-radio-button';
import { CallGetApi, CallPostApi } from '../../utilites/Util';
import { useDispatch, useSelector } from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import { NavigationParamList } from '../../types/navigation';
import { replacePondArray } from '../../reduxstore/pondSlice';

const logo = '../../media/AquaLogo.gif';
const url = 'http://103.127.146.20:4000/api/v1/harvest/harvestregist/';

type harvestCycleRoute = RouteProp<NavigationParamList, 'harvest_cycle_screen'>;
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

const harvestTypeItems = [
  { label: 'Partial Harvest', value: 'P' },
  { label: 'Full Harvest', value: 'F' },
];
const chillKill = [
  { label: 'Yes', value: 'true' },
  { label: 'No', value: 'false' },
];

const HarvestCycleScreen: FC = () => {
  const navigation = useNavigation<naviType>();
  const dispatch = useDispatch();
  const {
    params: { pondID, cycleID, harvestType, pondName },
  } = useRoute<harvestCycleRoute>();

  const store = useSelector((state: any) => state.userStore);
  const farmStore = useSelector((state: any) => state.farmStore);
  const farmID = farmStore.farmID;
  const token = store.email;

  const [selectSeedCompanyItems, setSelectSeedCompanyItems] = useState<dropdownValue[]>([
    { label: 'Company-ABC', value: 1 },
    { label: 'Company-XYZ', value: 2 },
  ]);
  const [selectSeedCompanyValue, setSelectSeedCompanyValue] = useState(0);
  const [selectSeedCompanyOpen, setSelectSeedCompanyOpen] = useState(false);

  const [visible, setVisible] = useState(false);
  const [isPondImage, setisPondImage] = useState(false);
  const [isLogisticsImage, setisLogisticsImage] = useState(false);
  const [totalHarvest, setTotalHarvest] = useState('');
  const [harvestDate, setHarvestDate] = useState('');
  const [animalCount, setAnimalCount] = useState('');
  const [totalKg, setTotalKg] = useState('');
  const [pricePerKg, setpricePerKg] = useState('');
  const [waterTemperature, setWaterTemperature] = useState('');
  const [harvestCost, setHarvestCost] = useState('');
  const [harvestNotes, setharvestNotes] = useState('');
  const [animalImages, setAnimalImages] = useState<imageFrame[]>([]);
  const [PondImages, setPondImages] = useState<imageFrame[]>([]);
  const [LogisticsImages, setLogisticsImages] = useState<imageFrame[]>([]);
  const [cycleDetailsDropStatus, setCycleDetailsDropStatus] = useState(false);
  const [harvestTypeValue, setHarvestTypeValue] = useState('');
  const [chillKillValue, setChillKillValue] = useState(true);
  const [calenderVisible, setCalenderVisible] = useState(false);

  const [cycleDescription, setCycleDescription] = useState('');
  const [seedingDate, setSeedingDate] = useState('');
  const [speciesPLStage, setSpeciesPLStage] = useState(Number);
  const [noOfLarve, setNoOfLarve] = useState(Number);
  const [pondPrepCost, setPondPrepCost] = useState(Number);
  const [seedCompany, setSeedCompany] = useState('');
  const [seedCost, setSeedCost] = useState(Number);
  const [seedImages, setSeedImages] = useState(['']);
  const [cyclePondImages, setCyclePondImages] = useState(['']);

  const getSeedCompany = (companyNo: number) => {
    if (companyNo === 1) {
      return 'Company-ABC';
    }
    if (companyNo === 2) {
      return 'Company-XYZ';
    }
    return 'unknown';
  };

  const getPLStage = (PLstage: number) => {
    if (PLstage === 1) {
      return 'PL-5';
    }
    if (PLstage === 2) {
      return 'PL-10';
    }
    if (PLstage === 3) {
      return 'PL-15';
    }
    return 'unknown';
  };

  const addImage = () => {
    setVisible(true);
  };
  const addPondImage = () => {
    setisPondImage(true);
    setVisible(true);
  };
  const addLogisticsImage = () => {
    setisLogisticsImage(true);
    setVisible(true);
  };

  const initialState = () => {
    setTotalHarvest('');
    setHarvestDate('');
    setAnimalCount('');
    setTotalKg('');
    setpricePerKg('');
    setWaterTemperature('');
    setHarvestCost('');
    setharvestNotes('');
    setAnimalImages([]);
    setPondImages([]);
    setLogisticsImages([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (harvestType === 0) {
        setHarvestTypeValue('P');
      } else {
        setHarvestTypeValue('F');
      }
      try {
        const cycleURL = 'http://103.127.146.20:4000/api/v1/cycle/cycleregist/' + cycleID;
        const cycleData: any = await CallGetApi(cycleURL, token);
        const data = cycleData.data;

        setCycleDescription(data.description);
        setSeedingDate(data.seeding_date);
        setSpeciesPLStage(data.species_pl_stage);
        setNoOfLarve(data.numbers_of_larva);
        setPondPrepCost(data.pondPrep_cost);
        setSeedCompany(getSeedCompany(data.seed_company));
        setSeedCost(data.invest_amount);
        const seedTemp = data.seed_images.map((seed: any) => {
          return seed.image.replace('localhost', '103.127.146.20');
        });
        setSeedImages(seedTemp);
        const pondTemp = data.pond_images.map((seed: any) => {
          return seed.image.replace('localhost', '103.127.146.20');
        });
        setCyclePondImages(pondTemp);
        console.log('Seed Temp \n', seedTemp, '\n Pond Temp \n', pondTemp);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cycleID, token]);

  const alert = (text: string) => {
    console.log('29 from alert', text);
  };

  const removeimageSeed = (name: string) => {
    const newAnimalImages = animalImages.filter((item) => item.name !== name);
    setAnimalImages(newAnimalImages);
  };
  const removeimagePond = (name: string) => {
    const newPondImages = PondImages.filter((item) => item.name !== name);
    setPondImages(newPondImages);
  };
  const removeimageLogistics = (name: string) => {
    const newPondImages = PondImages.filter((item) => item.name !== name);
    setLogisticsImages(newPondImages);
  };

  const onSave = () => {
    const formData = new FormData();

    //   "harvest_type": "F",
    // "total_kgs": 0,
    // "is_chill_kill": true,
    // "temperature": 0,
    // "harvest_notes": "string",
    // "harvest_cost": 0,
    // "animal_count_1": 0,
    // "total_kg_1": 0,
    // "price_kg_1": 0,
    // "sold_to": 0,
    // "cycle": 0

    formData.append('harvest_type', harvestTypeValue);
    let temp1 = parseInt(totalHarvest, 10);
    formData.append('total_kgs', temp1);
    formData.append('is_chill_kill', chillKillValue);
    let temp2 = parseInt(waterTemperature, 10);
    formData.append('temperature', temp2);
    formData.append('harvest_notes', harvestNotes);
    let temp3 = parseInt(harvestCost, 10);
    formData.append('harvest_cost', temp3);
    let temp4 = parseInt(animalCount, 10);
    formData.append('animal_count_1', temp4);
    let temp5 = parseInt(totalKg, 10);
    formData.append('total_kg_1', temp5);
    let temp6 = parseInt(pricePerKg, 10);
    formData.append('price_kg_1', temp6);
    formData.append('sold_to', selectSeedCompanyValue);
    formData.append('cycle', cycleID);
    if (animalImages.length > 0) {
      for (let i = 0; i < animalImages.length; i++) {
        const photo = animalImages[i];
        formData.append('ani_images', {
          name: photo.name,
          type: photo.type,
          uri: photo.uri,
        });
      }
    }
    if (PondImages.length > 0) {
      for (let i = 0; i < PondImages.length; i++) {
        const photo = PondImages[i];
        formData.append('pond_images', {
          name: photo.name,
          type: photo.type,
          uri: photo.uri,
        });
      }
    }
    if (LogisticsImages.length > 0) {
      for (let i = 0; i < LogisticsImages.length; i++) {
        const photo = LogisticsImages[i];
        formData.append('log_images', {
          name: photo.name,
          type: photo.type,
          uri: photo.uri,
        });
      }
    }
    console.log('FORM DATA \n', formData);
    CallPostApi(url, formData, token).then(async () => {
      console.log('Success in harvest');
      try {
        const pondURL = 'http://103.127.146.20:4000/api/v1/farms/farmregist/' + farmID + '/get-related-ponds/';
        const pondApiCall: any = await CallGetApi(pondURL, token);
        if (pondApiCall.data.result.ponds !== null) {
          const pondData = pondApiCall.data.result.ponds;
          dispatch(replacePondArray({ pondDataArray: pondData }));
        }
      } catch (error) {
        console.log(error);
      }
      navigation.navigate('new_user_landing');
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
        let name = '';
        let number = 0;
        if (!isPondImage && !isLogisticsImage) {
          number = animalImages.length;
          name = 'animal' + number + 'cycle' + cycleID;
        } else if (!LogisticsImages) {
          number = PondImages.length;
          name = 'pond' + number + 'cycle' + cycleID;
        } else {
          number = LogisticsImages.length;
          name = 'logistic' + number + 'cycle' + cycleID;
        }
        const imageURI = {
          uri: assetsOfImage.uri,
          type: assetsOfImage.type,
          name: name,
        };
        if (!isPondImage && !isLogisticsImage) {
          console.log('successful');
          setAnimalImages([...animalImages, imageURI]);
        } else if (!isLogisticsImage) {
          setPondImages([...PondImages, imageURI]);
          setisPondImage(false);
        } else {
          setLogisticsImages([...LogisticsImages, imageURI]);
          setisLogisticsImage(false);
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
      let name = '';
      let number = 0;
      if (!isPondImage && !isLogisticsImage) {
        number = animalImages.length;
        name = 'animal' + number;
      } else if (!LogisticsImages) {
        number = PondImages.length;
        name = 'pond' + number;
      } else {
        number = LogisticsImages.length;
        name = 'logistic' + number;
      }
      const imageURI = {
        uri: assetsOfImage.uri,
        type: assetsOfImage.type,
        name: name,
      };
      console.log(isPondImage);
      if (!isPondImage && !isLogisticsImage) {
        console;
        console.log('successful');
        setAnimalImages([...animalImages, imageURI]);
      } else if (!LogisticsImages) {
        setPondImages([...PondImages, imageURI]);
        setisPondImage(false);
      } else {
        setLogisticsImages([...LogisticsImages, imageURI]);
        setisLogisticsImage(false);
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
              setHarvestDate(day.dateString);
              setCalenderVisible(false);
            }}
          />
        </TouchableOpacity>
      </Modal>
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
          <Text style={Styles.backButton}>BACK</Text>
        </TouchableOpacity>
        <Image style={PageStyles.logo} source={require(logo)} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={PageStyles.scroll}>
          <View style={{ flexDirection: 'column', width: windowWidth * 0.9 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={Stylings.customText}>{pondName}</Text>
              <Text style={{ marginTop: windowWidth * 0.03 }}>#{pondID.toString()}</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ marginTop: windowWidth * 0.01, color: 'midnightblue', fontWeight: '800' }}>
                {farmStore.farmName}
              </Text>
              <Text style={{ alignSelf: 'flex-end', marginTop: windowWidth * 0.01 }}>Location</Text>
            </View>
            <View
              style={{ flexDirection: 'row', marginTop: windowHeight * 0.04, flex: 1, justifyContent: 'space-between' }}
            >
              <Text style={{ fontSize: 20, fontWeight: '400', color: 'black' }}>Vannamei</Text>
              <View
                style={{
                  flexDirection: 'column',
                  height: windowHeight * 0.05,
                }}
              >
                <Text style={{ fontSize: 11, color: 'black', marginLeft: windowWidth * 0.03, fontWeight: '800' }}>
                  #{cycleID.toString()}
                </Text>
                <Text style={{ fontSize: 11, color: 'black' }}>12.03.2022</Text>
              </View>
            </View>
          </View>

          <View style={{ width: windowWidth * 0.95 }}>
            <TouchableOpacity
              onPress={() => {
                setCycleDetailsDropStatus(!cycleDetailsDropStatus);
              }}
            >
              <View
                style={[
                  Styles.shadowProp,
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: '#FF9A13',
                    height: windowHeight * 0.07,
                    alignItems: 'center',
                    borderRadius: 10,
                    paddingHorizontal: windowWidth * 0.04,
                  },
                ]}
              >
                <Text style={{ color: whiteColor, fontWeight: '900', fontSize: windowWidth * 0.045 }}>
                  Cycle Initiation Info
                </Text>
                {cycleDetailsDropStatus ? (
                  <Aicons name="caretdown" size={25} color={whiteColor} />
                ) : (
                  <Aicons name="caretright" size={25} color={whiteColor} />
                )}
              </View>
            </TouchableOpacity>
            {cycleDetailsDropStatus && (
              <View
                style={[
                  Styles.shadowProp,
                  { backgroundColor: whiteColor, borderRadius: 10, paddingBottom: windowHeight * 0.01 },
                ]}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: windowWidth * 0.05,
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={Styles.infoCard2}>
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={{ fontSize: windowHeight * 0.015, fontWeight: '900', color: blackColor }}>
                        Seed(kg)
                      </Text>
                      <Text style={{ fontSize: windowHeight * 0.024, fontWeight: '900', color: blackColor }}>
                        2546Kg
                      </Text>
                    </View>
                  </View>
                  <View style={Styles.infoCard2}>
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={{ fontSize: windowHeight * 0.015, fontWeight: '900', color: blackColor }}>
                        Seeding Date
                      </Text>
                      <Text style={{ fontSize: windowHeight * 0.024, fontWeight: '900', color: blackColor }}>
                        {seedingDate}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: windowWidth * 0.08,
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ width: windowWidth * 0.5 }}>
                    <Text style={{ color: blackColor, fontWeight: '600' }}>Species:</Text>
                    <Text style={{ color: blackColor, fontWeight: '600' }}>Species PL stage:</Text>
                    <Text style={{ color: blackColor, fontWeight: '600' }}>Total Number Of Larvey:</Text>
                    <Text style={{ color: blackColor, fontWeight: '600' }}>Pond Preperation cost:</Text>
                    <Text style={{ color: blackColor, fontWeight: '600' }}>Seed Company:</Text>
                    <Text style={{ color: blackColor, fontWeight: '600' }}>Seed Cost:</Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'flex-start',
                      width: windowWidth * 0.35,
                      marginLeft: windowWidth * 0.01,
                    }}
                  >
                    <Text style={{ color: blackColor }}>Vennami</Text>
                    <Text style={{ color: blackColor }}>{getPLStage(speciesPLStage)}</Text>
                    <Text style={{ color: blackColor }}>{noOfLarve}</Text>
                    <Text style={{ color: blackColor }}>₹ {pondPrepCost}</Text>
                    <Text style={{ color: blackColor }}>{seedCompany}</Text>
                    <Text style={{ color: blackColor }}>₹ {seedCost}</Text>
                  </View>
                </View>
                <View style={{ alignSelf: 'center', marginHorizontal: windowWidth * 0.04 }}>
                  <Text style={{ fontSize: windowHeight * 0.018, fontWeight: '400', color: '#000000' }}>
                    {cycleDescription}
                  </Text>
                </View>
                <View style={{ marginHorizontal: windowWidth * 0.04, marginVertical: windowHeight * 0.01 }}>
                  <Text style={{ color: blackColor, fontWeight: '600' }}>Seed Images</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: windowWidth * 0.02 }}>
                    {seedImages.map((seed, index) => {
                      return (
                        <View style={Styles.pondDetailsimage} key={index}>
                          <Image source={{ uri: seed }} style={{ flex: 1 }} />
                        </View>
                      );
                    })}
                  </View>
                </View>
                <View style={{ marginHorizontal: windowWidth * 0.04, marginVertical: windowHeight * 0.01 }}>
                  <Text style={{ color: blackColor, fontWeight: '600' }}>Pond Preperation images</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: windowWidth * 0.02 }}>
                    {cyclePondImages.map((seed, index) => {
                      return (
                        <View style={Styles.pondDetailsimage} key={index}>
                          <Image source={{ uri: seed }} style={{ flex: 1 }} />
                        </View>
                      );
                    })}
                  </View>
                </View>
              </View>
            )}
          </View>
          <View style={{ justifyContent: 'space-between', marginVertical: windowHeight * 0.025 }}>
            <Text style={{ alignSelf: 'center', fontSize: 20, color: 'black', fontWeight: '800' }}>Harvest Type</Text>
            <RadioForm
              radio_props={harvestTypeItems}
              animation={false}
              initial={harvestType}
              onPress={(value) => {
                console.log(value);
                setHarvestTypeValue(value);
              }}
            />
          </View>
          <LabelTextInput
            nameOfField="Total Harvest(Kg)"
            onChange={(text) => {
              setTotalHarvest(text);
            }}
            width={windowWidth * 0.9}
            value={totalHarvest}
          />
          <LabelTextInput
            nameOfField="Harvest Date*"
            //calender to be added
            onChange={(text) => {
              setHarvestDate(text);
            }}
            onCalenderPress={() => setCalenderVisible(true)}
            isCalender={true}
            width={windowWidth * 0.9}
            value={harvestDate}
          />
          <View style={{ flexDirection: 'row', width: windowWidth * 0.9, justifyContent: 'space-between' }}>
            <View style={{ marginRight: windowWidth * 0.02 }}>
              <LabelTextInput
                nameOfField="Animal Count"
                onChange={(text) => {
                  setAnimalCount(text);
                }}
                width={windowWidth * 0.28}
                value={animalCount}
              />
            </View>
            <View style={{ marginRight: windowWidth * 0.02 }}>
              <LabelTextInput
                nameOfField="Total Kg"
                onChange={(text) => {
                  setTotalKg(text);
                }}
                width={windowWidth * 0.28}
                value={totalKg}
              />
            </View>
            <View style={{}}>
              <LabelTextInput
                nameOfField="Price Per Kg"
                onChange={(text) => {
                  setpricePerKg(text);
                }}
                width={windowWidth * 0.28}
                value={pricePerKg}
              />
            </View>
          </View>
          <View>
            <LabelTextInput
              nameOfField="Animal/Storage Water Temperature"
              onChange={(text) => {
                setWaterTemperature(text);
              }}
              width={windowWidth * 0.9}
              value={waterTemperature}
            />
            <View style={{ height: windowHeight * 0.15, justifyContent: 'space-between', alignContent: 'center' }}>
              <Text style={{ marginTop: windowHeight * 0.03, alignSelf: 'center', fontWeight: 'bold', color: 'black' }}>
                Are You using chill kill?(Dropdown)
              </Text>
              <RadioForm
                radio_props={chillKill}
                initial={0}
                animation={false}
                onPress={(value) => {
                  setChillKillValue(value.replace('"', ''));
                }}
              />
            </View>

            <View
              style={{
                width: windowWidth * 0.9,
                marginBottom: selectSeedCompanyOpen
                  ? windowHeight * 0.05 * selectSeedCompanyItems.length
                  : windowHeight * 0.01,
                marginTop: windowHeight * 0.02,
              }}
            >
              <Text> Sold to*:</Text>
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
              nameOfField="Harvest Cost(₹)"
              onChange={(text) => {
                setHarvestCost(text);
              }}
              width={windowWidth * 0.9}
              value={harvestCost}
            />
            <LabelTextInput
              nameOfField="Harvest Notes(Optional)"
              onChange={(text) => {
                setharvestNotes(text);
              }}
              width={windowWidth * 0.9}
              value={harvestNotes}
            />
          </View>
          <View style={{ width: windowWidth * 0.9, flex: 1 }}>
            <Text>Animal Images*</Text>
            <View
              style={{
                width: windowWidth * 0.9,
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                padding: 10,
              }}
            >
              {animalImages &&
                animalImages.map((image, id) => {
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
                  <Aicons name="plus" size={30} color={asphaltGreyColour} />
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ width: windowWidth * 0.9, flex: 1 }}>
            <Text>Post Harvest Pond Images*</Text>
            <View
              style={{
                width: windowWidth * 0.9,
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                padding: 10,
              }}
            >
              {PondImages &&
                PondImages.map((image, id) => {
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
                  <Aicons name="plus" size={30} color={asphaltGreyColour} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ width: windowWidth * 0.9, flex: 1 }}>
            <Text>Logistics Images*</Text>
            <View
              style={{
                width: windowWidth * 0.9,
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                padding: 10,
              }}
            >
              {LogisticsImages &&
                LogisticsImages.map((image, id) => {
                  return (
                    <View style={PageStyles.imageContainer} key={id}>
                      <View style={PageStyles.image}>
                        <Image source={{ uri: image.uri }} style={{ flex: 1 }} />
                      </View>
                      <TouchableOpacity
                        style={PageStyles.imageButton}
                        onPress={() => {
                          removeimageLogistics(image.name!);
                        }}
                      >
                        <Text style={PageStyles.buttonText}>remove image</Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              <TouchableOpacity onPress={addLogisticsImage}>
                <View style={[PageStyles.addImage]}>
                  <Aicons name="plus" size={30} color={asphaltGreyColour} />
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

export default HarvestCycleScreen;

const Stylings = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  backButton: {
    color: '#ffffff',
    fontSize: windowHeight * 0.02,
    paddingLeft: windowWidth * 0.025,
  },
  fishlogo: {
    resizeMode: 'contain',
    marginLeft: windowWidth * 0.03,
    height: windowHeight * 0.06,
    width: windowWidth * 0.2,
    margin: windowWidth * 0.01,
    color: '#ffffff',
    borderRadius: 5,
  },
  image: {
    borderRadius: 8,
    margin: 5.5,
    marginBottom: 1,
    height: windowHeight * 0.12,
    width: windowWidth * 0.27,
  },
  emptyBG: {
    borderRadius: 8,
    margin: 5.5,
    marginBottom: 1,
    height: windowHeight * 0.3,
    width: windowWidth * 0.6,
    resizeMode: 'contain',
  },
  farmName: {
    //HEADING TEXT
    fontSize: 20,
    marginLeft: 1,
    // marginTop: 5,
    fontWeight: '800',
    color: '#000000',
  },
  customText: {
    fontSize: 20,
    // marginLeft: windowWid,
    marginTop: windowWidth * 0.03,
    fontWeight: '700',
    color: '#000000',
  },
  Filter: {
    fontSize: 15,
    marginLeft: 60,
    alignSelf: 'flex-end',
    // marginTop: 5,
    fontWeight: '600',
    color: '#000000',
  },
  EditFarmDetails: {
    marginTop: 5,
    marginLeft: 3,
    backgroundColor: '#f4f7f8',
    alignItems: 'center',
    height: windowHeight * 0.03,
    width: windowWidth * 0.32,
    borderRadius: 25,
    padding: 2,
  },
  imageBottom: {
    // marginTop:windowHeight*0.015,
    height: windowHeight * 0.2,
    width: windowWidth * 0.6,
    borderRadius: 7,
    alignSelf: 'center',
  },
  imageButton: {
    marginTop: windowHeight * 0.015,
    height: windowHeight * 0.2,
    width: windowWidth * 0.6,
    borderRadius: 7,
    alignSelf: 'center',
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 7,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 6.68,
    elevation: 5,
  },
  textBox: {
    borderRadius: 0.03,
    backgroundColor: '#f5f6f8',
    alignSelf: 'center',
    marginTop: windowHeight * 0.01,
  },
  roundedTextBox: {
    width: windowWidth * 0.95,
    height: windowHeight * 0.05,
    backgroundColor: 'orange',
    borderRadius: 10,
    alignSelf: 'center',
    //   flexDirection:'column',
    marginTop: windowHeight * 0.015,
    shadowColor: '#000',
    shadowOffset: {
      width: 7,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 6.68,
    elevation: 5,
  },
  boxText: {
    // justifyContent: 'space-between',
    fontSize: 15,
    marginLeft: 6,
    marginTop: 6,
    fontWeight: '300',
    color: '#000000',
    alignSelf: 'flex-end',
  },
  addNewCycleButton: {
    // flex: 1,
    justifyContent: 'space-between',
    borderRadius: 7,
    backgroundColor: 'orange',
    width: windowWidth * 0.9,
    height: windowHeight * 0.06,
    // marginTop: windowHeight * 0.01,
    marginBottom: windowHeight * 0.001,
    // marginLeft: windowWidth * 0.2,
    flexDirection: 'row',
  },
  addNewCycleButtonText: {
    // resizeMode: 'contain',
    flex: 1,
    alignSelf: 'flex-start',
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: windowWidth * 0.03,
    marginTop: windowWidth * 0.025,
    fontSize: 15,
  },
  activeIcon: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: windowWidth * 0.05,
    height: windowHeight * 0.012,
  },
  iconPack: {
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    marginTop: windowHeight * 0.012,
    marginLeft: windowWidth * 0.013,
  },
  iconStyle: {
    resizeMode: 'contain',
    width: windowWidth * 0.1,
    height: windowHeight * 0.1,
  },
  iconBox1: {
    backgroundColor: 'indigo',
    alignSelf: 'flex-start',
    marginTop: windowHeight * 0.007,
    marginLeft: windowWidth * 0.01,
    borderRadius: 3,
    width: windowWidth * 0.06,
    height: windowHeight * 0.02,
  },
  iconBox2: {
    backgroundColor: 'mediumturquoise',
    alignSelf: 'flex-start',
    marginTop: windowHeight * 0.007,
    marginLeft: windowWidth * 0.01,
    borderRadius: 3,
    width: windowWidth * 0.06,
    height: windowHeight * 0.02,
  },
  iconBox3: {
    backgroundColor: 'seagreen',
    alignSelf: 'flex-start',
    marginTop: windowHeight * 0.007,
    marginLeft: windowWidth * 0.01,
    borderRadius: 3,
    width: windowWidth * 0.06,
    height: windowHeight * 0.02,
  },
  iconBox4: {
    backgroundColor: 'gold',
    alignSelf: 'flex-start',
    marginTop: windowHeight * 0.007,
    marginLeft: windowWidth * 0.01,
    borderRadius: 3,
    width: windowWidth * 0.06,
    height: windowHeight * 0.02,
  },
  iconBox5: {
    backgroundColor: 'sienna',
    alignSelf: 'flex-start',
    marginTop: windowHeight * 0.007,
    marginLeft: windowWidth * 0.01,
    borderRadius: 3,
    width: windowWidth * 0.06,
    height: windowHeight * 0.02,
  },
  iconText1: {
    fontWeight: '800',
    color: 'white',
    marginLeft: windowWidth * 0.01,
  },
  iconText2: {
    fontWeight: '800',
    color: 'black',
    marginLeft: windowWidth * 0.019,
  },
});

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

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pondCard: {
    borderRadius: 10,
    alignSelf: 'center',
    width: windowWidth * 0.95,
    backgroundColor: whiteColor,
    margin: windowWidth * 0.02,
  },
  backButton: {
    color: '#ffffff',
    fontSize: windowHeight * 0.02,
    paddingLeft: windowWidth * 0.025,
  },
  image: {
    borderRadius: 8,
    margin: 5.5,
    marginBottom: 1,
    height: windowHeight * 0.12,
    width: windowWidth * 0.27,
  },
  pondName: {
    fontSize: windowWidth * 0.045,
    marginLeft: 6,
    marginTop: 5,
    fontWeight: '700',
    color: '#000000',
  },
  EditPondDetails: {
    marginTop: 5,
    marginLeft: 3,
    backgroundColor: '#f4f7f8',
    alignItems: 'center',
    height: windowHeight * 0.03,
    width: windowWidth * 0.32,
    borderRadius: 25,
    padding: 2,
  },
  infoCard: {
    height: windowHeight * 0.09,
    width: windowWidth * 0.28,
    backgroundColor: '#0059AB',
    margin: windowWidth * 0.01,
    borderRadius: 10,
  },
  infoCard2: {
    height: windowHeight * 0.08,
    width: windowWidth * 0.37,
    backgroundColor: whiteColor,
    margin: windowWidth * 0.01,
    borderWidth: 1,
    borderColor: '#E6E9EF',
    borderRadius: 10,
    padding: windowHeight * 0.01,
  },
  graph: {
    borderRadius: 10,
    padding: 2.5,
    height: windowHeight * 0.3,
    width: windowWidth * 0.93,
    backgroundColor: whiteColor,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 5,
    alignSelf: 'center',
  },
  imageBottom: {
    height: windowHeight * 0.3,
    width: windowWidth * 0.92,
    borderRadius: 7,
    alignSelf: 'center',
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 7,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 6.68,
    elevation: 5,
  },
  blueText: {
    color: '#459BFF',
    marginVertical: windowHeight * 0.01,
    marginHorizontal: windowHeight * 0.02,
    fontWeight: '600',
  },
  subTabContainer: {
    marginTop: windowHeight * 0.01,
    backgroundColor: '#000000',
    height: windowHeight * 0.06,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabTextInactive: {
    color: '#ffffff',
    textAlign: 'center',
  },
  tabTextActive: {
    color: '#000000',
    textAlign: 'center',
  },
  tabActive: {
    backgroundColor: '#ffffff',
    height: windowHeight * 0.04,
    width: windowWidth * 0.44,
    paddingTop: windowHeight * 0.005,
    borderRadius: 5,
  },
  tabInactive: {
    backgroundColor: '#000000',
    height: windowHeight * 0.04,
    width: windowWidth * 0.44,
    paddingTop: windowHeight * 0.005,
    borderRadius: 5,
  },
  pondDetailsimage: {
    backgroundColor: whiteColor,
    height: windowHeight * 0.12,
    width: windowWidth * 0.27,
    borderColor: '#BDBDBD',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  button: {
    height: windowHeight * 0.04,
    width: windowWidth * 0.4,
    borderRadius: 10,
    backgroundColor: successColor,
    paddingHorizontal: windowWidth * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
