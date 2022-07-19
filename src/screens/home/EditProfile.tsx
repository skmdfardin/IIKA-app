import React, { FunctionComponent } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import CustomeTextInput from '../../components/CustomTextInput';
import { whiteColor, windowHeight, windowWidth } from '../../media/css/common';

interface EditProfileScreenProps {}

const logo = '../../media/AquaLogo.gif';

const EditProfileScreen: FunctionComponent<EditProfileScreenProps> = () => {
  return (
    <View style={{ flexDirection: 'column' }}>
      <View style={Styles.container}>
        <View style={Styles.header}>
          <Image style={Styles.logo} source={require(logo)} />
        </View>
      </View>
      <View style={{ marginStart: windowWidth * 0.03 }}>
        <View style={{ flexDirection: 'row' }}>
          <Image style={{ width: 100, height: 100, borderRadius: 100 / 2, marginTop: 5 }} source={require(logo)} />
          <View style={{ marginStart: windowWidth * 0.1 }} />
          <CustomeTextInput
            placeholder="Email ID"
            onChangeText={(text) => console.log(text)}
            fieldWidth={windowWidth * 0.3}
          />
        </View>
        <CustomeTextInput
          placeholder="Email ID"
          onChangeText={(text) => console.log(text)}
          fieldWidth={windowWidth * 0.9}
        />
        <CustomeTextInput
          placeholder="Password"
          onChangeText={(text) => console.log(text)}
          fieldWidth={windowWidth * 0.9}
        />
        <CustomeTextInput
          placeholder="Confirm Password"
          onChangeText={(text) => console.log(text)}
          fieldWidth={windowWidth * 0.9}
        />
        <CustomeTextInput
          placeholder="Enter Mobile no"
          onChangeText={(text) => console.log(text)}
          fieldWidth={windowWidth * 0.9}
        />
      </View>
    </View>
  );
};

export default EditProfileScreen;

const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: windowWidth,
    height: windowHeight * 0.09,
    backgroundColor: '#000000',
  },
  logo: {
    resizeMode: 'contain',
    marginTop: windowWidth * 0.02,
    height: windowHeight * 0.09,
    width: windowWidth * 0.25,
  },
});
