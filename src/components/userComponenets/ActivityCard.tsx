import React, { FC } from 'react';
import { View, StyleSheet, Text, Dimensions, TouchableOpacity } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface Props {
  titleText: string;
  messageText: string;
  buttonText: string;
  buttonState: boolean;
  updateStatus: (arg: string) => void;
}

const ActivityCard: FC<Props> = (props) => {
  const onSubmit = () => {
    props.updateStatus('Profile Updated');
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.textContainer}>
        <Text style={Styles.textTitle}>{props.titleText}</Text>
        <Text style={Styles.textMessage}>{props.messageText}</Text>
        <TouchableOpacity
          style={[Styles.button, { opacity: props.buttonState ? 1 : 0.3 }]}
          onPress={onSubmit}
          disabled={!props.buttonState}
        >
          <Text style={Styles.buttonText}>{props.buttonText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ActivityCard;

const Styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F6F8',
    borderRadius: 20,
    margin: windowHeight * 0.01,
  },
  imageContainer: {
    alignItems: 'center',
  },
  textContainer: {
    marginHorizontal: windowWidth * 0.1,
  },
  button: {
    height: windowHeight * 0.04,
    width: windowWidth * 0.6,
    marginVertical: windowHeight * 0.02,
    borderRadius: 10,
    backgroundColor: '#0059AB',
    paddingHorizontal: windowWidth * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
  },
  textTitle: {
    color: '#000000',
  },
  textMessage: {
    color: '#000000',
  },
});
