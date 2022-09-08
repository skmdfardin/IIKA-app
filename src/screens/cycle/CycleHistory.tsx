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
  TouchableHighlight,
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
import { Button } from 'react-native-paper';

const logo = '../../media/AquaLogo.gif';
const fishlogo = '../../media/transparentFishLogo.gif';
const emptyBG = '../../media/emptyBG.png';

const shadow = styles.shadow;

type imageFrame = {
  uri: string | undefined;
  type: string | undefined;
  name: string | undefined;
};

type Props = {};

const CycleHistory = (props: Props) => {
  const [cycleHistory, setCycleHistory] = useState('');

  const initialState = () => {
    setCycleHistory('');
  };
  const filterMenu = undefined;

  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.header}>
        <Text style={Styles.backButton}>BACK</Text>
        <Image style={Styles.logo} source={require(logo)} />
      </View>
      <View style={{ height: windowHeight * 0.01 }} />
      <View style={{ flexDirection: 'row' }}>
        <Image style={Styles.fishlogo} source={require(fishlogo)} />
        <View style={{ flexDirection: 'column' }}>
          <Text style={Styles.farmName}>Cycle History</Text>
          <Text style={Styles.customText}>All Cycles</Text>
        </View>
        <View style={Styles.container}>
          <TouchableOpacity onPress={() => console.log('Filter Menu')} style={{ alignSelf: 'flex-end' }}>
            <View>
              <Text
                style={{
                  marginRight: windowWidth * 0.05,
                  marginTop: windowHeight * 0.015,
                }}
              >
                Filters
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Text
        style={{
          fontSize: 15,
          marginLeft: windowWidth * 0.15,
          marginRight: windowWidth * 0.15,
          marginTop: windowHeight * 0.03,
          fontWeight: '800',
          color: '#000000',
          textAlign: 'center',
        }}
      >
        Oops! Looks like you haven't created any cycles before.
      </Text>
      <View>
        <TouchableHighlight
          style={Styles.imageButton}
          onPress={() => {
            console.log('button press');
          }}
        >
          <Image style={Styles.imageBottom} source={require(emptyBG)} />
        </TouchableHighlight>
      </View>
      <View style={Styles.roundedTextBox}>
        <Text style={Styles.boxText}>Let's add a new cycle to the pond(#pondid - Pond Name) you have created.</Text>
        <TouchableOpacity style={Styles.addNewCycleButton}>
          <View>
            <Text style={Styles.addNewCycleButtonText}>Add New Cycle</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CycleHistory;

const Styles = StyleSheet.create({
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
    height: windowHeight * 0.06,
    width: windowWidth * 0.2,
    color: '#ffffff',
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
    fontWeight: '470',
    color: '#000000',
  },
  customText: {
    fontSize: 13,
    marginLeft: 3,
    marginTop: 2,
    fontWeight: '400',
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
    width: windowWidth * 0.9,
    height: windowHeight * 0.1,
    backgroundColor: '#f5f6f8',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: windowHeight * 0.015,
  },
  boxText: {
    justifyContent: 'space-between',
    fontSize: 15,
    marginLeft: 6,
    marginTop: 2,
    fontWeight: '450',
    color: '#000000',
    alignSelf: 'center',
  },
  addNewCycleButton: {
    flex: 1,
    borderRadius: 11,
    backgroundColor: '#ff9a13',
    width: windowWidth * 0.39,
    marginTop: windowHeight * 0.01,
    marginBottom: windowHeight * 0.012,
    marginLeft: windowWidth * 0.02,
    shadowColor: '#000',
    shadowOffset: {
      width: 7,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 6.68,
    elevation: 5,
  },
  addNewCycleButtonText: {
    alignSelf: 'center',
    fontWeight: '900',
    color: '#ffffff',
    marginTop: windowHeight * 0.002,
    fontSize: 15,
  },
});
