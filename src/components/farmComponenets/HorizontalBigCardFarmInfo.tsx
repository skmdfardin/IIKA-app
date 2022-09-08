import React, { FC } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { whiteColor, windowHeight, windowWidth, styles, blackColor } from '../../media/css/common';
import { FARM_DETAILS } from '../../navigation/StackNavigation';

const { robotoRegular12, robotoRegular18, robotoBold20, shadow } = styles;

const HorizontalBigCardFarmInfo: FC = () => {
  const farmStore = useSelector((state: any) => state.farmStore);
  const navigation = useNavigation();
  const farmImage = farmStore.farmImages[0];
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate(FARM_DETAILS.toString());
      }}
    >
      <View style={[Styles.container, shadow]}>
        <View
          style={{
            width: windowWidth * 0.3,
            marginRight: windowWidth * 0.03,
            borderRadius: 10,
          }}
        >
          <Image style={{ flex: 1, borderRadius: 10 }} source={{ uri: farmImage }} />
        </View>
        <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
          <Text style={[robotoBold20, { color: blackColor }]}>{farmStore.farmName}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={[robotoRegular18, { color: blackColor }]}>No of Ponds</Text>
              <Text style={[robotoRegular18, { color: blackColor }]}>Average FCR</Text>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
              <Text style={[robotoRegular12, { color: blackColor }]}>#{farmStore.farmID}</Text>
              <Text style={[robotoRegular12, { color: blackColor }]}>Location</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HorizontalBigCardFarmInfo;

const Styles = StyleSheet.create({
  container: {
    backgroundColor: whiteColor,
    marginVertical: windowHeight * 0.02,
    marginHorizontal: windowWidth * 0.025,
    borderRadius: 10,
    width: windowWidth * 0.95,
    height: windowHeight * 0.15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
  },
});
