import React, { FunctionComponent } from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { blackColor, commonBlueColor, windowWidth } from '../media/css/common';

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
      <Text>{props.nameOfField}</Text>
      <TextInput
        mode="outlined"
        style={{ width: props.width, borderRadius: 15 }}
        outlineColor={blackColor}
        disabled={props.disabled}
        activeOutlineColor={commonBlueColor}
        onChangeText={props.onChange}
        value={props.value}
        error={props.error}
      />
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
