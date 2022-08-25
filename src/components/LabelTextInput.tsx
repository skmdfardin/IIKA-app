import React, { FunctionComponent } from 'react';
import { Text, View, TextInput } from 'react-native';
import { blackColor, windowWidth } from '../media/css/common';

interface LabelTextInputProps {
  nameOfField: string;
  width: number;
  onChange: (text: string) => void;
  value: string;
  disabled?: boolean;
  marginTop?: number;
  error?: boolean;
}

const LabelTextInput: FunctionComponent<LabelTextInputProps> = (props) => {
  return (
    <View style={{ marginTop: props.marginTop }}>
      <Text style={{ color: blackColor }}>{props.nameOfField}</Text>
      <View
        style={{
          borderColor: blackColor,
          borderWidth: 1,
          borderRadius: 15,
          borderStyle: props.disabled ? 'dashed' : 'solid',
          width: props.width,
          backgroundColor: '#F5F6F8',
        }}
      >
        <TextInput
          editable={!props.disabled}
          onChangeText={props.onChange}
          value={props.value}
          style={{ color: blackColor }}
        />
      </View>
    </View>
  );
};

LabelTextInput.defaultProps = {
  nameOfField: '',
  width: windowWidth * 0.9,
  disabled: false,
  marginTop: windowWidth * 0.05,
  error: false,
};

export default LabelTextInput;
