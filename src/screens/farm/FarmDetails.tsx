import React, { FC } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlipInEasyX } from 'react-native-reanimated';
import { windowHeight, windowWidth, whiteColor } from '../../media/css/common';

const logo = '../../media/AquaLogo.gif';

const FarmDetails: FC = () => {
  const farmEdit = () => {
    console.log('Navigate to farm edit page');
  };

  return (
    <View style={Styles.container}>
      <View style={Styles.header}>
        <Text style={Styles.backButton}>BACK</Text>
        <Image style={Styles.logo} source={require(logo)} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ margin: 13, marginTop: 20 }}>
        <View style={[Styles.farmCard, Styles.shadowProp]}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Image style={Styles.image} source={{ uri: 'https://wallpaperaccess.com/full/803470.jpg' }} />
            <View style={{ flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
              <Text style={Styles.farmName}>Farm Name</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'column' }}>
                  <TouchableOpacity
                    style={Styles.EditFarmDetails}
                    onPress={() => {
                      farmEdit();
                    }}
                  >
                    <Text style={{ fontSize: 13, fontWeight: '900', color: '#479dfb' }}>Edit Farm Details</Text>
                  </TouchableOpacity>
                  <Text style={{ marginTop: 0, marginLeft: 6 }}>Avg FCR: 1.2</Text>
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
                  <Text>#FarmID</Text>
                  <Text>Location</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 25, flexDirection: 'row', flex: 1, alignItems: 'center' }}>
          <View style={Styles.infoCard}>
            <View style={{ flexDirection: 'column', paddingTop: 10, padding: 13 }}>
              <Text style={{ fontSize: 13, fontWeight: '900', color: 'white' }}>Total Harvest</Text>
              <View style={{ flexDirection: 'row', marginTop: 2 }}>
                <Text style={{ fontSize: 22, fontWeight: '900', color: 'white' }}>235</Text>
                <Text style={{ fontSize: 15, fontWeight: '300', color: 'white' }}>tn</Text>
              </View>
            </View>
          </View>
          <View style={Styles.infoCard}>
            <View style={{ flexDirection: 'column', paddingTop: 10, padding: 13 }}>
              <Text style={{ fontSize: 13, fontWeight: '900', color: 'white' }}>Active Cycles</Text>
              <Text style={{ fontSize: 22, fontWeight: '900', color: 'white' }}>10</Text>
            </View>
          </View>
          <View style={Styles.infoCard}>
            <View style={{ flexDirection: 'column', paddingTop: 10, padding: 13 }}>
              <Text style={{ fontSize: 13, fontWeight: '900', color: 'white' }}>Total Ponds</Text>
              <Text style={{ fontSize: 22, fontWeight: '900', color: 'white' }}>235</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 25, margin: 7 }}>
          <Text style={{ fontSize: 18, fontWeight: '400', color: '#000000' }}>
            This is where the description of the Farm goes.Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is where the description of the Farm
            goes.Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </Text>
        </View>
        <View style={[Styles.graph, Styles.shadowProp]}></View>
        <View style={[Styles.graph, Styles.shadowProp]}></View>
        <View style={{ marginTop: 25 }}>
          <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: '800', color: '#000000' }}>All Ponds</Text>
        </View>
      </ScrollView>
    </View>
  );
};
export default FarmDetails;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  farmCard: {
    borderRadius: 10,
    alignSelf: 'center',
    padding: 2.5,
    height: windowHeight * 0.14,
    width: windowWidth * 0.93,
    backgroundColor: whiteColor,
    flexDirection: 'row',
  },
  backButton: {
    color: '#ffffff',
    fontSize: windowHeight * 0.02,
    paddingLeft: windowWidth * 0.025,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: windowHeight * 0.07,
    backgroundColor: '#000000',
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
    height: windowHeight * 0.06,
    width: windowWidth * 0.25,
  },
  image: {
    borderRadius: 8,
    margin: 5.5,
    marginBottom: 1,
    height: windowHeight * 0.12,
    width: windowWidth * 0.27,
  },
  farmName: {
    fontSize: 20,
    marginLeft: 6,
    marginTop: 5,
    fontWeight: '700',
    color: '#000000',
  },
  EditFarmDetails: {
    marginTop: 5,
    marginLeft: 3,
    backgroundColor: '#f4f7f8',
    alignItems: 'center',
    height: windowHeight * 0.03,
    width: windowWidth * 0.32,
    borderRadius: 25,
    padding: 2,
  },
  infoCard: {
    height: windowHeight * 0.09,
    width: windowWidth * 0.28,
    backgroundColor: '#0059ab',
    margin: 7,
    marginTop: 10,
    marginRight: 1,
    borderRadius: 10,
  },
  graph: {
    borderRadius: 10,
    padding: 2.5,
    height: windowHeight * 0.35,
    width: windowWidth * 0.93,
    backgroundColor: whiteColor,
    marginTop: 15,
    marginRight: 5,
    alignSelf: 'center',
  },
  // container: {
  //   alignContent: 'center',
  //   alignItems: 'flex-start',
  //   margin: 5,
  //   borderRadius: 10,
  //   height: windowHeight * 0.14,
  //   width: windowWidth * 0.29,
  //   backgroundColor: whiteColor,
  // },
  // image: {
  //   borderRadius: 8,
  //   margin: 5.5,
  //   marginBottom: 1,
  //   height: windowHeight * 0.085,
  //   width: windowWidth * 0.26,
  // },
  // title: {
  //   fontSize: 13,
  //   marginBottom: 0,
  //   marginLeft: 7,
  //   fontWeight: '600',
  //   color: '#000000',
  // },
  // subtitle: {
  //   fontSize: 11,
  //   marginLeft: 7,
  //   fontWeight: '500',
  // },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 7,
      height: 5,
    },
    shadowOpacity: 0.75,
    shadowRadius: 6.68,
    elevation: 5,
  },
});
