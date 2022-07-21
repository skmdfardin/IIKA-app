import React, { FC } from 'react';
import { StyleSheet, Text, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface Props {
  buttonText: string;
  allCaps: boolean;
  onPress: Function;
  style: any;
}

const CustomButton: FC<Props> = (props) => {
  return (
    <Button style={[Styles.button, props.style]} onPress={props.onPress()} uppercase={props.allCaps}>
      <Text style={Styles.text}>{props.buttonText}</Text>
    </Button>
  );
};

export default CustomButton;

const Styles = StyleSheet.create({
  button: {
    height: windowHeight * 0.05,
    width: windowWidth * 0.28,
    marginVertical: windowHeight * 0.02,
    borderRadius: 10,
    backgroundColor: '#0059AB',
    paddingHorizontal: windowWidth * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
  },
});
