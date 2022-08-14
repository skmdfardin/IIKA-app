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
  orangeColor2,
} from '../../media/css/common';
import LabelTextInput from '../../components/LabelTextInput';

const logo = '../../media/AquaLogo.gif';

const shadow = styles.shadow;

type imageFrame = {
  uri: string | undefined;
  type: string | undefined;
  name: string | undefined;
};

const AddCycle: FC = () => {
  const [visible, setVisible] = useState(false);
  const [isPondImage, setisPondImage] = useState(false);
  const [SelectPond, setSelectPond] = useState('');
  const [SelectSpecies, setSelectSpecies] = useState('');
  const [SpeciesPLStage, setSpeciesPLStage] = useState('');
  const [TotalNumberofLarvae, setTotalNumberofLarvae] = useState('');
  const [SelectSeedCompany, setSelectSeedCompany] = useState('');
  const [SeedInvestmentAmount, setSeedInvestmentAmount] = useState('');
  const [SeedingDate, setSeedingDate] = useState('');
  const [PondPreparationCost, setPondPreparationCost] = useState('');
  const [CycleDescription, setCycleDescription] = useState('');
  const [SeedImages, setSeedImages] = useState<imageFrame[]>([]);
  const [PondImages, setPondImages] = useState<imageFrame[]>([]);

  const addImage = () => {
    setVisible(true);
  };
  const addPondImage = () => {
    setisPondImage(true);
    setVisible(true);
  };

  const initialState = () => {
    setSelectPond('');
    setSelectSpecies('');
    setSpeciesPLStage('');
    setTotalNumberofLarvae('');
    setSelectSeedCompany('');
    setSeedInvestmentAmount('');
    setSeedingDate('');
    setPondPreparationCost('');
    setCycleDescription('');
    setSeedImages([]);
    setPondImages([]);
  };

  const alert = (text: string) => {
    console.log('29 from alert', text);
  };

  const removeimageSeed = (name: string) => {
    const newSeedImages = SeedImages.filter((item) => item.name !== name);
    setSeedImages(newSeedImages);
  };
  const removeimagePond = (name: string) => {
    const newPondImages = PondImages.filter((item) => item.name !== name);
    setPondImages(newPondImages);
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
          setSeedImages([...SeedImages, imageURI]);
        } else {
          setPondImages([...PondImages, imageURI]);
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
      const imageURI = {
        uri: assetsOfImage.uri,
        type: assetsOfImage.type,
        name: assetsOfImage.fileName,
      };
      console.log(isPondImage);
      if (!isPondImage) {
        console;
        console.log('successful');
        setSeedImages([...SeedImages, imageURI]);
      } else {
        setPondImages([...PondImages, imageURI]);
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
      <View style={PageStyles.header}>
        <Text style={PageStyles.backButton}>BACK</Text>
        <Image style={PageStyles.logo} source={require(logo)} />
      </View>
      <View style={{ backgroundColor: orangeColor2, height: windowHeight * 0.04 }}>
        <View>
          <Text style={PageStyles.text}> + Add New Cycle</Text>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={PageStyles.scroll}>
          <LabelTextInput
            nameOfField="Select Pond*"
            onChange={(text) => {
              setSelectPond(text);
            }}
            width={windowWidth * 0.9}
            value={SelectPond}
          />
          <LabelTextInput
            nameOfField="Select Species*"
            onChange={(text) => {
              setSelectSpecies(text);
            }}
            width={windowWidth * 0.9}
            value={SelectSpecies}
          />
          <LabelTextInput
            nameOfField="Species PL Stage*"
            onChange={(text) => {
              setSpeciesPLStage(text);
            }}
            width={windowWidth * 0.9}
            value={SpeciesPLStage}
          />
          <LabelTextInput
            nameOfField="Total Number of Larvae*"
            onChange={(text) => {
              setTotalNumberofLarvae(text);
            }}
            width={windowWidth * 0.9}
            value={TotalNumberofLarvae}
          />
          <LabelTextInput
            nameOfField="Select Seed Company*"
            onChange={(text) => {
              setSelectSeedCompany(text);
            }}
            width={windowWidth * 0.9}
            value={SelectSeedCompany}
          />
          <LabelTextInput
            nameOfField="Seed Investment Amount*"
            onChange={(text) => {
              setSeedInvestmentAmount(text);
            }}
            width={windowWidth * 0.9}
            value={SeedInvestmentAmount}
          />
          <LabelTextInput
            nameOfField="Seeding Date*"
            //there is a calender
            onChange={(text) => {
              setSeedingDate(text);
            }}
            width={windowWidth * 0.9}
            value={SeedingDate}
          />
          <LabelTextInput
            nameOfField="Pond Preparation Cost*:"
            onChange={(text) => {
              setPondPreparationCost(text);
            }}
            width={windowWidth * 0.9}
            value={PondPreparationCost}
          />
          <LabelTextInput
            nameOfField="Cycle Description(Optional)"
            onChange={(text) => {
              setCycleDescription(text);
            }}
            width={windowWidth * 0.9}
            value={CycleDescription}
          />
          <View style={{ height: windowHeight * 0.02 }}></View>

          <View style={{ width: windowWidth * 0.9, flex: 1 }}>
            <Text>Seed images*</Text>
            <View
              style={{
                width: windowWidth * 0.9,
                flex: 1,
                flexDirection: 'row',
                flexWrap: 'wrap',
                padding: 10,
              }}
            >
              {SeedImages &&
                SeedImages.map((image, id) => {
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
            <Text>Prepared Pond Images*</Text>
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