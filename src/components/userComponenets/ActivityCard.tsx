import React, {FC} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ActivityCard: FC = () => {
  const onSubmit = () => {
    console.log('EXIT!');
  };
  return (
    <View style={Styles.container}>
      <View style={Styles.textContainer}>
        <Text style={Styles.text}>
          Wohoo! Your account has been successfully created.
        </Text>
        <Text style={Styles.text}>
          Now complete your Profile & Business registration!
        </Text>
        <TouchableOpacity style={Styles.button} onPress={onSubmit}>
          <Text style={Styles.buttonText}>Complete our profile</Text>
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
  text: {
    color: '#000000',
  },
});
