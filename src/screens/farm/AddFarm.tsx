import React, { FC, useState } from 'react';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import AIcon from 'react-native-vector-icons/AntDesign';
import { windowHeight, windowWidth, greenColour, whiteColor, asphaltGreyColour } from '../../media/css/common';
import LabelTextInput from '../../components/LabelTextInput';
import Map from '../../components/Map';

const logo = '../../media/AquaLogo.gif';

const AddFarm: FC = () => {
  const [imageList, setImageList] = useState([]);
  return (
    <View style={Styles.container}>
      <View style={Styles.header}>
        <Text style={{ color: whiteColor }}>BACK</Text>
        <Image style={Styles.logo} source={require(logo)} />
      </View>
      <View style={{ backgroundColor: greenColour, height: windowHeight * 0.04 }}>
        <Text> + Add New Farm</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={Styles.scroll}>
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
              {}
              <View
                style={{
                  height: windowHeight * 0.2,
                  width: windowWidth * 0.4,
                  margin: windowWidth * 0.025,
                  backgroundColor: '#F5F6F8',
                  borderStyle: 'dashed',
                  borderWidth: 2,
                  borderColor: '#C5C7D0',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <AIcon name="plus" size={30} color={asphaltGreyColour} />
              </View>
            </View>
          </View>
          <LabelTextInput
            nameOfField="farm Description:"
            onChange={(text) => {
              console.log(text);
            }}
            width={windowWidth * 0.9}
            value=""
          />
          <LabelTextInput
            nameOfField="farm Description:"
            onChange={(text) => {
              console.log(text);
            }}
            width={windowWidth * 0.9}
            value=""
          />
          <LabelTextInput
            nameOfField="farm Description:"
            onChange={(text) => {
              console.log(text);
            }}
            width={windowWidth * 0.9}
            value=""
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default AddFarm;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: windowWidth,
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
});
