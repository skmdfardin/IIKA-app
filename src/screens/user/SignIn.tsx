import React, {FC} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import CustomeTextInput from '../../components/CustomTextInput';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SignIn: FC = () => {
  return (
    <View style={Styles.container}>
      <View style={Styles.subContainer}>
        <Text style={Styles.text}>LogIn</Text>
        <CustomeTextInput
          placeholder="UserName"
          onChangeText={text => console.log(text)}
        />
        <CustomeTextInput
          placeholder="Password"
          onChangeText={text => console.log(text)}
        />
      </View>
    </View>
  );
};

export default SignIn;

const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#000000',
  },
  subContainer: {
    alignItems: 'center',
    marginTop: windowHeight * 0.3,
    backgroundColor: '#ffffff',
    width: windowWidth,
    height: windowHeight,
    borderRadius: 20,
  },
  text: {
    margin: windowHeight * 0.05,
    color: '#000000',
  },
  imageContainer: {
    alignItems: 'center',
    position: 'absolute',
    bottom: windowHeight * 1.15,
  },
});
