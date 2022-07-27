import { Formik } from 'formik';
import React, { FC, useState } from 'react';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';
import { windowHeight, windowWidth, greenColour, whiteColor, styles } from '../../media/css/common';
import LabelTextInput from '../../components/LabelTextInput';

const logo = '../../media/AquaLogo.gif';

const AddFarm: FC = () => {
  const [temp, setTemp] = useState('TEST');
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
        </View>
      </ScrollView>
    </View>
  );
};

export default AddFarm;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
