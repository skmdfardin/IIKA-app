import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigationParamList } from '../../types/navigation';
import { whiteColor, windowHeight, windowWidth, styles, successColor, blackColor } from '../../media/css/common';
import ActivityCard from '../userComponenets/ActivityCard';

type naviType = NativeStackNavigationProp<NavigationParamList, 'splash_screen'>;

const PondCardArray: FC = () => {
  const navigation = useNavigation<naviType>();
  const pondStore = useSelector((state: any) => state.pondStore);
  const validPonds = pondStore.pondDataArray;

  const onSelect = (pondID: number, status: boolean) => {
    if (status) {
      navigation.navigate('pond_details_active', { pondID });
    } else {
      navigation.navigate('pond_details_inactive', { pondID });
    }
  };

  const goToAddPond = (): void => {
    navigation.navigate('add_pond');
  };

  const pondType = (pondTypeNo: number) => {
    if (pondTypeNo === 1) {
      return 'Nursery';
    }
    if (pondTypeNo === 2) {
      return 'ETS';
    }
    if (pondTypeNo === 3) {
      return 'Reservoir Pond';
    }
  };

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {validPonds.length !== 0 ? (
        validPonds.map((pond: any, index: number) => {
          const image = pond.pond_images[0].image.replace('localhost', '103.127.146.20');
          return (
            <View style={[Styles.container, styles.shadow]} key={index}>
              <TouchableOpacity
                onPress={() => {
                  console.log('POND', pond);
                  onSelect(pond.id, pond.is_active_pond);
                }}
              >
                <ImageBackground
                  style={Styles.image}
                  source={{
                    uri: image,
                  }}
                >
                  {pond.is_active_pond && (
                    <>
                      <View
                        style={{
                          width: windowWidth * 0.08,
                          height: windowHeight * 0.04,
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: '#3A95FF',
                          borderRadius: 50,
                          position: 'absolute',
                          top: windowHeight * -0.02,
                          right: windowWidth * -0.02,
                        }}
                      >
                        <Text style={{ color: whiteColor, fontSize: windowHeight * 0.01 }}>DOC:</Text>
                        <Text style={{ color: whiteColor, fontSize: windowHeight * 0.01 }}>{pond.doc}</Text>
                      </View>

                      <View
                        style={{
                          backgroundColor: blackColor,
                          borderRadius: 20,
                          width: windowWidth * 0.18,
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignSelf: 'flex-end',
                          position: 'absolute',
                          top: windowHeight * 0.065,
                          right: windowWidth * -0.01,
                        }}
                      >
                        <Text style={{ color: whiteColor, fontSize: windowHeight * 0.015 }}>Active</Text>
                        <View
                          style={{
                            height: windowHeight * 0.01,
                            width: windowWidth * 0.02,
                            backgroundColor: successColor,
                            marginLeft: windowWidth * 0.01,
                            borderRadius: 10,
                          }}
                        />
                      </View>
                    </>
                  )}
                </ImageBackground>
                <Text style={Styles.title}>{pond.pond_name}</Text>
                <Text style={Styles.subtitle}>{pondType(pond.pond_type)}</Text>
              </TouchableOpacity>
            </View>
          );
        })
      ) : (
        <ActivityCard
          titleText="Your Farm has been successfully created"
          messageText="Let's start by adding ponds to your farm"
          buttonText="Add Pond"
          callBack={goToAddPond}
          buttonState={true}
        />
      )}
    </View>
  );
};

export default PondCardArray;

const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 5,
    width: windowWidth * 0.3,
    backgroundColor: whiteColor,
  },
  image: {
    borderRadius: 8,
    margin: 5.5,
    marginBottom: 1,
    height: windowHeight * 0.08,
    width: windowWidth * 0.26,
  },
  title: {
    fontSize: 13,
    marginBottom: 0,
    marginLeft: 7,
    fontFamily:'Poppins-SemiBold',
    color: '#000000',
  },
  subtitle: {
    fontSize: 12,
    marginLeft: 7,
    marginTop:-3,
    color: '#000000',
    fontFamily:'Poppins-Medium',
  },
  shadowProp: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 5,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 3,
    elevation: 3,
  },
});
