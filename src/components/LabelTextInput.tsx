import React, { FunctionComponent, useEffect, useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { blackColor, windowHeight, windowWidth } from '../media/css/common';

interface LabelTextInputProps {
  nameOfField: string;
  width: number;
  value: string;
  disabled?: boolean;
  marginTop?: number;
  errorState?: boolean;
  errorMessage?: string;
  isCalender?: boolean;
  onChange?: (text: string) => void;
  onCalenderPress?: () => void;
  isNumeric?: boolean;
  maxLength?: number;
}

const LabelTextInput: FunctionComponent<LabelTextInputProps> = (props) => {
  const [errorState, setErrorState] = useState(props.errorState);
  const toggleError = () => {
    setErrorState(!errorState);
  };

  useEffect(() => {
    setErrorState(props.errorState);
  }, [props.errorState]);

  return (
    <View style={{ marginTop: props.marginTop }}>
      <Text style={{ color: blackColor, fontWeight: '800', fontSize: windowWidth * 0.035 }}>{props.nameOfField}</Text>
      <View
        style={{
          borderColor: blackColor,
          borderWidth: 1,
          borderRadius: 15,
          borderStyle: props.disabled ? 'dashed' : 'solid',
          width: props.width,
          backgroundColor: '#F5F6F8',
          flexDirection: 'row',
        }}
      >
        <TextInput
          editable={!props.disabled}
          onChangeText={props.onChange}
          value={props.value}
          style={{ color: blackColor, flex: 1 }}
          keyboardType={props.isNumeric ? 'numeric' : 'default'}
          maxLength={props.maxLength}
        />
        {props.isCalender && (
          <TouchableOpacity
            onPress={props.onCalenderPress}
            style={{ justifyContent: 'center', paddingRight: windowWidth * 0.05 }}
          >
            <MIcon name="calendar-month-outline" size={25} color={blackColor} />
          </TouchableOpacity>
        )}
        {errorState && (
          <View style={[Styles.errorContainer, { width: props.width }]}>
            <TouchableOpacity onPress={toggleError}>
              <Text style={Styles.errorText}>X</Text>
            </TouchableOpacity>
            <Text style={Styles.errorText}>{props.errorMessage}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

LabelTextInput.defaultProps = {
  nameOfField: '',
  width: windowWidth * 0.9,
  disabled: false,
  marginTop: windowWidth * 0.05,
  errorState: false,
  isCalender: false,
  errorMessage: '',
  isNumeric: false,
  maxLength: 500,
};

const Styles = StyleSheet.create({
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

export default LabelTextInput;
