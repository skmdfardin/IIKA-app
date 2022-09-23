import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { windowHeight, windowWidth } from '../media/css/common';

interface Props {
  cardHeading: string;
  cardValue: number;
  weight?: string; //Kg,tn,Pound etc...
}

const BlueCards: FC<Props> = (props) => {
  return (
    <View style={{ marginTop: windowHeight * 0.05 }}>
      <View style={[Styles.infoCard, Styles.shadowProp]}>
        <View style={{ flexDirection: 'column', padding: windowWidth * 0.025 }}>
          <Text style={{ fontSize: windowHeight * 0.015, fontFamily: 'Poppins-Bold', color: 'white' }}>
            {props.cardHeading}
          </Text>
          <View style={{ flexDirection: 'row', marginTop: windowHeight*-0.006}}>
            <Text style={{ fontSize: windowHeight * 0.027, fontFamily: 'Poppins-Bold', color: 'white' }}>{props.cardValue}</Text>
            {props.weight && (
              <View style={{ marginTop: windowHeight*0.003 }}>
                <Text style={{ fontSize: windowHeight * 0.017, fontFamily: 'Poppins-Light', color: 'white' }}>
                  {' '}
                  {props.weight}
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};
export default BlueCards;

const Styles = StyleSheet.create({
  infoCard: {
    height: windowHeight * 0.083,
    width: windowWidth * 0.29,
    backgroundColor: '#0059ab',
    marginHorizontal: windowWidth * 0.01,
    borderRadius: 7,
  },
  shadowProp: {
    shadowColor: '#000000',
    shadowOffset: {
      width: -2,
      height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 7,
    elevation: 3,
  },
});
