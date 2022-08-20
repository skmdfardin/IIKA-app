import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { whiteColor, windowHeight, windowWidth, styles } from '../../media/css/common';
const shadow = styles.shadow;

interface Props {
  onPress: any | undefined;
  pondName: string;
  pondImage: string;
  pondType: string;
}

const PondCard: FC<Props> = (props) => {
  return (
    <View style={[Styles.container, shadow]}>
      <TouchableOpacity onPress={props.onPress}>
        <Image
          style={Styles.image}
          source={{
            uri: `${props.pondImage}`,
          }}
        />
        <Text style={Styles.title}>{props.pondName}</Text>
        <Text style={Styles.subtitle}>{props.pondType}</Text>
      </TouchableOpacity>
    </View>
  );
};
export default PondCard;

const Styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    alignItems: 'flex-start',
    margin: 5,
    borderRadius: 10,
    height: windowHeight * 0.14,
    width: windowWidth * 0.29,
    backgroundColor: whiteColor,
  },
  image: {
    borderRadius: 8,
    margin: 5.5,
    marginBottom: 1,
    height: windowHeight * 0.085,
    width: windowWidth * 0.26,
  },
  title: {
    fontSize: 13,
    marginBottom: 0,
    marginLeft: 7,
    fontWeight: '600',
    color: '#000000',
  },
  subtitle: {
    fontSize: 11,
    marginLeft: 7,
    fontWeight: '500',
  },
  shadowProp: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 6.68,
    elevation: 3,
  },
});
