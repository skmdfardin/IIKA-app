import React, { FunctionComponent } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { blackColor, windowWidth } from '../media/css/common';

interface LabelTextInputProps {
  nameOfField: string;
  width: number;
  value: string;
  disabled?: boolean;
  marginTop?: number;
  error?: boolean;
  isCalender?: boolean;
  onChange?: (text: string) => void;
  onCalenderPress?: () => void;
}

const LabelTextInput: FunctionComponent<LabelTextInputProps> = (props) => {
  return (
    <View style={{ marginTop: props.marginTop }}>
      <Text style={{ color: blackColor, fontWeight: '700', fontSize: windowWidth * 0.037 }}>{props.nameOfField}</Text>
      <View
        style={{
          borderColor: blackColor,
          borderWidth: 1,
          borderRadius: 12,
          marginTop: 9,
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
        />
        {props.isCalender && (
          <TouchableOpacity
            onPress={props.onCalenderPress}
            style={{ justifyContent: 'center', paddingRight: windowWidth * 0.05 }}
          >
            <MIcon name="calendar-month-outline" size={21} color={blackColor} />
          </TouchableOpacity>
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
  error: false,
  isCalender: false,
};

export default LabelTextInput;
