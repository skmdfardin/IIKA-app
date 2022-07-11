import React, {FC} from 'react';
import {View, StyleSheet, Text, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface Props {
  buttonText: string;
}

const CustomButton: FC<Props> = props => {
  return (
    <View style={Styles.button}>
      <Text style={Styles.text}>{props.buttonText}</Text>
    </View>
  );
};

export default CustomButton;

const Styles = StyleSheet.create({
  button: {
    height: windowHeight * 0.06,
    width: windowWidth * 0.3,
    marginVertical: windowHeight * 0.02,
    borderRadius: 10,
    backgroundColor: '#0085FF',
    paddingHorizontal: windowWidth * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
  },
});
