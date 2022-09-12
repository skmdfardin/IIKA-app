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
// import Icon from 'react-native-vector-icons/AntDesign';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
// import { faCircle } from '@fortawesome/free-solid-svg-icons/faCircle';
import FontAwesome, { SolidIcons, RegularIcons, BrandIcons, parseIconFromClassName } from 'react-native-fontawesome';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {
  faEye,
  faSearch,
  faBars,
  faSmile,
  faCircleArrowRight,
  faStarAndCrescent,
  faStar,
  faAd,
  faScroll,
  faTable,
} from '@fortawesome/free-solid-svg-icons';

import Icon from 'react-native-vector-icons/FontAwesome';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const logo = '../../media/AquaLogo.gif';
const fishlogo = '../../media/transparentFishLogo.gif';
const emptyBG = '../../media/emptyBG.png';
const circleImg = '../../media/circle.png';

type Props = {};

const CycleSummaryCard = (props: Props) => {
  const parsedIcon = parseIconFromClassName('fab fa-apple');
  return (
    <SafeAreaView style={Styles.container}>
      <TouchableOpacity
        style={Styles.roundedTextBox}
        onPress={() => {
          console.log('button press');
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              marginLeft: windowWidth * 0.025,
              fontSize: 11,
            }}
          >
            Date: 31 Mar 2022
          </Text>
          <View style={{ justifyContent: 'space-between' }}>
            <Text style={{ marginLeft: windowWidth * 0.515, fontSize: 11 }}>#2243</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: windowHeight * 0.01 }}>
          <Image source={require('../../media/FarmPond.png')} style={Styles.fishlogo} />
          <View style={{ flexDirection: 'column' }}>
            <Text style={Styles.farmName}>Pond Name</Text>
            <Text style={Styles.customText}>Vannamei</Text>
          </View>
          <View style={{ flexDirection: 'column' }}>
            <View style={Styles.addNewCycleButton}>
              <Text style={Styles.addNewCycleButtonText}>Active</Text>
              <Image source={require(circleImg)} style={Styles.activeIcon} />
            </View>
            <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
              <Text style={{ fontWeight: '400', color: 'black', fontSize: 15 }}>DOC:</Text>
              <Text style={{ fontWeight: '900', color: 'black', fontSize: 15 }}>23 Days</Text>
            </View>
          </View>
        </View>
        <View style={Styles.iconPack}>
          <View style={Styles.iconBox1}>
            <Text style={Styles.iconText1}>N</Text>
          </View>
          <View style={Styles.iconBox2}>
            <Text style={Styles.iconText1}>Ph</Text>
          </View>
          <View style={Styles.iconBox3}>
            <Text style={Styles.iconText1}>DO</Text>
          </View>
          <View style={Styles.iconBox4}>
            <Text style={Styles.iconText2}>S</Text>
          </View>
          <View style={Styles.iconBox5}>
            <Text style={Styles.iconText1}>T</Text>
          </View>

          <Icon
            name='arrow-circle-right'
            size={25}
            style={{ color: 'darkslategray', margin: windowWidth * 0.01, marginLeft: windowWidth * 0.52 }}
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CycleSummaryCard;

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
    fontSize: 13,
    marginLeft: 3,
    marginTop: 6,
    fontWeight: '800',
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
    height: windowHeight * 0.15,
    backgroundColor: '#fdfeff',
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
    justifyContent: 'space-between',
    fontSize: 15,
    marginLeft: 6,
    marginTop: 2,
    fontWeight: '450',
    color: '#000000',
    alignSelf: 'center',
  },
  addNewCycleButton: {
    // flex: 1,
    justifyContent: 'space-between',
    borderRadius: 11,
    backgroundColor: '#323338',
    width: windowWidth * 0.2,
    height: windowHeight * 0.03,
    // marginTop: windowHeight * 0.01,
    marginBottom: windowHeight * 0.012,
    marginLeft: windowWidth * 0.2,
    flexDirection: 'row',
  },
  addNewCycleButtonText: {
    resizeMode: 'contain',
    flex: 1,
    alignSelf: 'center',
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: windowWidth * 0.03,
    fontSize: 13,
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
