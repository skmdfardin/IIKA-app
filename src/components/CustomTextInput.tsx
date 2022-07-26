import React, { FC, useState } from 'react';
import { View, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface Props {
  placeholder: string;
  onChangeText: (text: string) => void;
  fieldWidth: number;
  errorState: boolean;
  errorMessage: string;
  isPassword: boolean;
}

const CustomeTextInput: FC<Props> = (props) => {
  const [errorState, setErrorState] = useState(props.errorState);

  const toggle = () => {
    setErrorState(!errorState);
  };

  return (
    <View>
      <View style={[Styles.container, { width: props.fieldWidth > 0 ? props.fieldWidth : windowWidth * 0.9 }]}>
        <TextInput
          placeholder={props.placeholder}
          secureTextEntry={props.isPassword}
          onChangeText={props.onChangeText}
        />
      </View>
      {errorState && (
        <View style={[Styles.errorContainer, { width: props.fieldWidth > 0 ? props.fieldWidth : windowWidth * 0.9 }]}>
          <TouchableOpacity onPress={toggle}>
            <Text style={Styles.errorText}>X</Text>
          </TouchableOpacity>
          <Text style={Styles.errorText}>{props.errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

export default CustomeTextInput;

const Styles = StyleSheet.create({
  container: {
    height: windowHeight * 0.06,
    marginVertical: windowHeight * 0.01,
    marginHorizontal: windowWidth * 0.01,
    borderRadius: 10,
    backgroundColor: '#F5F6F8',
    paddingHorizontal: windowWidth * 0.05,
    borderColor: '#C5C7D0',
    borderWidth: 1,
  },
  errorContainer: {
    marginHorizontal: windowWidth * 0.01,
    backgroundColor: '#C5C7D0',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  errorText: {
    marginVertical: windowHeight * 0.005,
    marginLeft: windowWidth * 0.03,
    marginRight: windowWidth * 0.01,
    textAlign: 'center',
    color: '#ffffff',
    flexShrink: 1,
  },
});
