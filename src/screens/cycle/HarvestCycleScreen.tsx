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
  SafeAreaView,
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
  successColor,
} from '../../media/css/common';
import LabelTextInput from '../../components/LabelTextInput';
import AIcons from 'react-native-vector-icons/AntDesign';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

const logo = '../../media/AquaLogo.gif';

const shadow = styles.shadow;

type imageFrame = {
  uri: string | undefined;
  type: string | undefined;
  name: string | undefined;
};
const harvestType = [
  { label: 'Partial Harvest', value: 0 },
  { label: 'Full Harvest', value: 1 },
];
const chillKill = [
  { label: 'Yes', value: 'Chill Kill Used' },
  { label: 'No', value: 'No chill kill' },
];

const HarvestCycleScreen: FC = () => {
  const [visible, setVisible] = useState(false);
  const [isPondImage, setisPondImage] = useState(false);
  const [isLogisticsImage, setisLogisticsImage] = useState(false);
  const [totalHarvest, setTotalHarvest] = useState('');
  const [harvestDate, setHarvestDate] = useState('');
  const [animalCount, setAnimalCount] = useState('');
  const [totalKg, setTotalKg] = useState('');
  const [pricePerKg, setpricePerKg] = useState('');
  const [waterTemperature, setWaterTemperature] = useState('');
  const [soldTo, setSoldTo] = useState('');
  const [harvestCost, setHarvestCost] = useState('');
  const [harvestNotes, setharvestNotes] = useState('');
  const [animalImages, setAnimalImages] = useState<imageFrame[]>([]);
  const [PondImages, setPondImages] = useState<imageFrame[]>([]);
  const [LogisticsImages, setLogisticsImages] = useState<imageFrame[]>([]);
  const [cycleDetailsDropStatus, setCycleDetailsDropStatus] = useState(false);
  const [pondDescrition, setPondDescription] = useState<string>('');
  const [radioState, setRadioState] = useState(0);

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
    setSoldTo('');
    setHarvestCost('');
    setharvestNotes('');
    setAnimalImages([]);
    setPondImages([]);
    setLogisticsImages([]);
    setRadioState(0);
  };

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
    console.log('data saved successfully');
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
        const imageURI = {
          uri: assetsOfImage.uri,
          type: assetsOfImage.type,
          name: assetsOfImage.fileName,
        };
        if (!isPondImage) {
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
      const imageURI = {
        uri: assetsOfImage.uri,
        type: assetsOfImage.type,
        name: assetsOfImage.fileName,
      };
      console.log(isPondImage);
      if (!isPondImage) {
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
        <Text style={PageStyles.backButton}>BACK</Text>
        <Image style={PageStyles.logo} source={require(logo)} />
      </View>
      {/* <View style={{ backgroundColor: orangeColor2, height: windowHeight * 0.04 }}>
                <View>
                    <Text style={PageStyles.text}> + Add New Cycle</Text>
                </View>
            </View> */}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={PageStyles.scroll}>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ width: windowWidth * 0.87, flexDirection: 'row' }}>
              <Text style={Stylings.customText}>Pond Name</Text>
              <Text style={{ marginLeft: windowWidth * 0.5, marginTop: windowWidth * 0.03 }}>#pondID</Text>
            </View>
            <View style={{ width: windowWidth * 0.87, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ marginTop: windowWidth * 0.01, color: 'midnightblue', fontWeight: '800' }}>
                Poseidon Seafood Farms
              </Text>
              <Text style={{ alignSelf: 'flex-end', marginTop: windowWidth * 0.01 }}>Nellore</Text>
            </View>
            <View style={{ flexDirection: 'row', marginTop: windowHeight * 0.04 }}>
              <Text style={{ fontSize: 20, fontWeight: '400', color: 'black', marginLeft: windowWidth * 0.02 }}>
                Vannamei
              </Text>
              <View
                style={{
                  flexDirection: 'column',
                  height: windowHeight * 0.05,
                  alignSelf: 'flex-end',
                  marginLeft: windowWidth * 0.5,
                }}
              >
                <Text style={{ fontSize: 11, color: 'black', marginLeft: windowWidth * 0.03, fontWeight: '800' }}>
                  #cycleID
                </Text>
                <Text style={{ fontSize: 11, color: 'black' }}>12.03.2022</Text>
              </View>
            </View>
          </View>

          <View style={{ width: windowWidth * 0.9 }}>
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
                  <AIcons name="caretdown" size={25} color={whiteColor} />
                ) : (
                  <AIcons name="caretright" size={25} color={whiteColor} />
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
                        02.02.22
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
                    <Text style={{ color: blackColor }}>18 days</Text>
                    <Text style={{ color: blackColor }}>2500</Text>
                    <Text style={{ color: blackColor }}>₹ 45,222</Text>
                    <Text style={{ color: blackColor }}>Seed Company</Text>
                    <Text style={{ color: blackColor }}>₹ 56568</Text>
                  </View>
                </View>
                <View style={{ alignSelf: 'center', marginHorizontal: windowWidth * 0.04 }}>
                  <Text style={{ fontSize: windowHeight * 0.018, fontWeight: '400', color: '#000000' }}>{}</Text>
                </View>
                <View style={{ marginHorizontal: windowWidth * 0.04, marginVertical: windowHeight * 0.01 }}>
                  <Text style={{ color: blackColor, fontWeight: '600' }}>Seed Images</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: windowWidth * 0.02 }}>
                    <View style={Styles.pondDetailsimage}>
                      <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1501577316686-a5cbf6c1df7e' }}
                        style={{ flex: 1 }}
                      />
                    </View>
                    <View style={Styles.pondDetailsimage}>
                      <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1501577316686-a5cbf6c1df7e' }}
                        style={{ flex: 1 }}
                      />
                    </View>
                    <View style={Styles.pondDetailsimage}>
                      <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1501577316686-a5cbf6c1df7e' }}
                        style={{ flex: 1 }}
                      />
                    </View>
                  </View>
                </View>
                <View style={{ marginHorizontal: windowWidth * 0.04, marginVertical: windowHeight * 0.01 }}>
                  <Text style={{ color: blackColor, fontWeight: '600' }}>Pond Preperation images</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: windowWidth * 0.02 }}>
                    <View style={Styles.pondDetailsimage}>
                      <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1501577316686-a5cbf6c1df7e' }}
                        style={{ flex: 1 }}
                      />
                    </View>
                    <View style={Styles.pondDetailsimage}>
                      <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1501577316686-a5cbf6c1df7e' }}
                        style={{ flex: 1 }}
                      />
                    </View>
                    <View style={Styles.pondDetailsimage}>
                      <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1501577316686-a5cbf6c1df7e' }}
                        style={{ flex: 1 }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>
          <View style={{ justifyContent: 'space-between' }}>
            <Text style={{ alignSelf: 'center', fontSize: 20, color: 'black', fontWeight: '800' }}>Harvest Type</Text>
            <RadioForm radio_props={harvestType} initial={0} onPress={(value) => console.log(value)} />
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
                  setAnimalCount(text);
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
              <RadioForm radio_props={chillKill} initial={0} onPress={(value) => console.log(value)} />
            </View>

            <LabelTextInput
              nameOfField="Sold to"
              onChange={(text) => {
                setSoldTo(text);
              }}
              width={windowWidth * 0.9}
              value={soldTo}
            />
            <LabelTextInput
              nameOfField="Harvest Cost(₹)"
              onChange={(text) => {
                setSoldTo(text);
              }}
              width={windowWidth * 0.9}
              value={harvestCost}
            />
            <LabelTextInput
              nameOfField="Harvest Notes(Optional)"
              onChange={(text) => {
                setSoldTo(text);
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
                  <AIcon name="plus" size={30} color={asphaltGreyColour} />
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
                  <AIcon name="plus" size={30} color={asphaltGreyColour} />
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: windowHeight * 0.07,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
    height: windowHeight * 0.06,
    width: windowWidth * 0.25,
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
