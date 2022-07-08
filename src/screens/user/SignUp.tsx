import React, {FC} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';
import CustomeTextInput from '../../components/CustomTextInput';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const SignUp: FC = () => {
  return (
    <View style={Styles.container}>
      <Text style={Styles.text}>SignUp</Text>
      <CustomeTextInput
        placeholder="UserName"
        onChangeText={text => console.log(text)}
      />
      <CustomeTextInput
        placeholder="Password"
        onChangeText={text => console.log(text)}
      />
    </View>
  );
};

export default SignUp;

const Styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#000000',
  },
  text: {
    color: '#ffffff',
  },
});
