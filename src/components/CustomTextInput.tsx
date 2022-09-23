import React, { FC, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, TextInput, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';
import Iicon from 'react-native-vector-icons/Ionicons';
import { blackColor } from '../media/css/common';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface Props {
  placeholder: string;
  onChangeText: (text: string) => void;
  fieldWidth: number;
  errorState: boolean;
  errorMessage: string;
  isPassword: boolean;
  isNumeric?: boolean;
  maxLength?: number;
}

const CustomeTextInput: FC<Props> = (props) => {
  const [errorState, setErrorState] = useState(Boolean);
  const [isSecure, setIsSecure] = useState(props.isPassword);

  useEffect(() => {
    setErrorState(props.errorState);
  }, [props.errorState]);

  const toggleError = () => {
    setErrorState(!errorState);
  };

  const toggleSecure = () => {
    setIsSecure(!isSecure);
  };

  return (
    <View>
      <View style={[Styles.container, { width: props.fieldWidth > 0 ? props.fieldWidth : windowWidth * 0.9 }]}>
        <TextInput
          placeholder={props.placeholder}
          secureTextEntry={isSecure}
          onChangeText={props.onChangeText}
          style={{ flex: 1 }}
          keyboardType={props.isNumeric ? 'numeric' : 'default'}
          maxLength={props.maxLength}
        />
        {props.isPassword && (
          <TouchableOpacity
            onPress={toggleSecure}
            style={{ justifyContent: 'center', paddingRight: windowWidth * 0.01 }}
          >
            {isSecure ? (
              <Iicon name="eye" size={20} color={blackColor} />
            ) : (
              <Iicon name="eye-off" size={20} color={blackColor} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {errorState && (
        <View style={[Styles.errorContainer, { width: props.fieldWidth > 0 ? props.fieldWidth : windowWidth * 0.9 }]}>
          <TouchableOpacity onPress={toggleError}>
            <Text style={Styles.errorText}>X</Text>
          </TouchableOpacity>
          <Text style={Styles.errorText}>{props.errorMessage}</Text>
        </View>
      )}
    </View>
  );
};

export default CustomeTextInput;

CustomeTextInput.defaultProps = {
  isNumeric: false,
  maxLength: 500,
};

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
    flexDirection: 'row',
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
