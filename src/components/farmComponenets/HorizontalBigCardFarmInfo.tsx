import React, { FC } from 'react';
import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParamList } from '../../types/navigation';
import { whiteColor, windowHeight, windowWidth, styles, blackColor } from '../../media/css/common';

const { robotoRegular12, robotoRegular18, robotoBold20, shadow } = styles;

type naviType = NativeStackNavigationProp<NavigationParamList>;

const HorizontalBigCardFarmInfo: FC = () => {
  const farmStore = useSelector((state: any) => state.farmStore);
  const pondStore = useSelector((state: any) => state.pondStore);
  const noPond = pondStore.pondDataArray.length;
  const navigation = useNavigation<naviType>();
  const farmImage = farmStore.farmImages[0];
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('farm_details');
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
              <Text style={[robotoRegular18, { color: blackColor }]}>No of Ponds: {noPond}</Text>
              <Text style={[robotoRegular18, { color: blackColor }]}>Average FCR: -</Text>
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
