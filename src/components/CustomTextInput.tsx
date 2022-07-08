import React, {FC} from 'react';
import {View, StyleSheet, TextInput, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface Props {
  placeholder: string;
  onChangeText: (text: string) => void;
}

const CustomeTextInput: FC<Props> = props => {
  return (
    <View style={Styles.container}>
      <TextInput
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
      />
    </View>
  );
};

export default CustomeTextInput;

const Styles = StyleSheet.create({
  container: {
    height: windowHeight * 0.06,
    width: windowWidth * 0.9,
    marginVertical: windowHeight * 0.01,
    marginHorizontal: windowWidth * 0.9,
    borderRadius: 10,
    backgroundColor: '#F5F6F8',
    paddingHorizontal: windowWidth * 0.05,
    borderColor: '#C5C7D0',
    borderWidth: 1,
  },
});
