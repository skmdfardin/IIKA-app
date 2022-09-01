import React, { FC, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AIcons from 'react-native-vector-icons/AntDesign';
import ImageCarousel1 from '../../components/ImageCarousel1';
import {
  windowHeight,
  windowWidth,
  whiteColor,
  blackColor,
  pearlGreyColour,
  darkYellow,
  successColor,
} from '../../media/css/common';

const logo = '../../media/AquaLogo.gif';

export interface ImageCarouselItem {
  id: number;
  uri: string;
  title: string;
}

const data: ImageCarouselItem[] = [
  {
    id: 0,
    uri: 'https://images.pexels.com/photos/97465/pexels-photo-97465.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    title: 'Dahlia',
  }, // https://unsplash.com/photos/Jup6QMQdLnM
  {
    id: 1,
    uri: 'https://media.gettyimages.com/photos/the-perfect-backyard-picture-id157329538?s=612x612',
    title: 'Sunflower',
  }, // https://unsplash.com/photos/oO62CP-g1EA
  {
    id: 2,
    uri: 'https://images.pexels.com/photos/97465/pexels-photo-97465.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    title: 'Zinnia',
  }, // https://unsplash.com/photos/gKMmJEvcyA8
  {
    id: 3,
    uri: 'https://wallpaperaccess.com/full/803470.jpg',
    title: 'Tulip',
  }, // https://unsplash.com/photos/N7zBDF1r7PM
  {
    id: 4,
    uri: 'https://wallpaperaccess.com/full/803470.jpg',
    title: 'Chrysanthemum',
  }, // https://unsplash.com/photos/GsGZJMK0bJc
  {
    id: 5,
    uri: 'https://images.unsplash.com/photo-1501577316686-a5cbf6c1df7e',
    title: 'Hydrangea',
  }, // https://unsplash.com/photos/coIBOiWBPjk
];

const PondDetails: FC = () => {
  const [currentSliderIndex, setCurrentSliderIndex] = useState(0);
  const [pondStatus, setPondStatus] = useState('inactive');
  const [currentTab, setCurrentTab] = useState('Details');
  const [pondDetailsDropStatus, setPondDetailsDropStatus] = useState(false);

  const toggleTab = (selectedTab: string) => {
    setCurrentTab(selectedTab);
  };
  const pondEdit = () => {
    console.log('Navigate to pond edit page');
    setPondStatus('active');
  };

  const callBackSliderIndex = (index: number) => {
    setCurrentSliderIndex(index);
  };

  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.header}>
        <Text style={Styles.backButton}>BACK</Text>
        <Image style={Styles.logo} source={require(logo)} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {pondStatus === 'inactive' ? (
          <View style={[Styles.pondCard, Styles.shadowProp, { paddingBottom: windowHeight * 0.02 }]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: windowWidth * 0.95,
                height: windowHeight * 0.05,
                backgroundColor: '#0059AB',
                alignItems: 'center',
                paddingHorizontal: windowWidth * 0.02,
                borderTopEndRadius: 10,
                borderTopLeftRadius: 10,
              }}
            >
              <Text style={{ color: whiteColor }}>#pondId</Text>
              <View
                style={{
                  backgroundColor: whiteColor,
                  borderRadius: 20,
                  width: windowWidth * 0.25,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text>Inactive</Text>
                <View
                  style={{
                    height: windowHeight * 0.0175,
                    width: windowWidth * 0.035,
                    backgroundColor: blackColor,
                    marginLeft: windowWidth * 0.01,
                    borderRadius: 10,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                padding: windowHeight * 0.01,
              }}
            >
              <Image
                source={{ uri: 'https://wallpaperaccess.com/full/803470.jpg' }}
                style={{
                  height: windowHeight * 0.09,
                  width: windowWidth * 0.18,
                  borderRadius: 10,
                }}
              />
              <View style={{ marginLeft: windowWidth * 0.02 }}>
                <Text>Farm Name</Text>
                <Text>Pond Name</Text>
                <Text>Pond Type</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                marginHorizontal: windowWidth * 0.02,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  pondEdit();
                }}
              >
                <View
                  style={{
                    backgroundColor: pearlGreyColour,
                    borderRadius: 10,
                    marginVertical: windowHeight * 0.005,
                    height: windowHeight * 0.05,
                  }}
                >
                  <Text style={Styles.blueText}>Edit Pond details</Text>
                </View>
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: pearlGreyColour,
                  borderRadius: 10,
                  marginVertical: windowHeight * 0.005,
                  height: windowHeight * 0.05,
                }}
              >
                <Text style={Styles.blueText}>View Cycle History</Text>
              </View>
              <View
                style={{
                  backgroundColor: pearlGreyColour,
                  borderRadius: 10,
                  marginVertical: windowHeight * 0.005,
                  height: windowHeight * 0.05,
                }}
              >
                <Text style={Styles.blueText}>Create New Cycle</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={[Styles.pondCard, Styles.shadowProp]}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: windowWidth * 0.95,
                height: windowHeight * 0.05,
                backgroundColor: darkYellow,
                alignItems: 'center',
                paddingHorizontal: windowWidth * 0.02,
                borderTopEndRadius: 10,
                borderTopLeftRadius: 10,
              }}
            >
              <Text style={{ color: whiteColor }}>#pondId</Text>
              <View
                style={{
                  backgroundColor: whiteColor,
                  borderRadius: 20,
                  width: windowWidth * 0.25,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text>Active</Text>
                <View
                  style={{
                    height: windowHeight * 0.0175,
                    width: windowWidth * 0.035,
                    backgroundColor: successColor,
                    marginLeft: windowWidth * 0.01,
                    borderRadius: 10,
                  }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                padding: windowHeight * 0.01,
              }}
            >
              <Image
                source={{ uri: 'https://wallpaperaccess.com/full/803470.jpg' }}
                style={{
                  height: windowHeight * 0.09,
                  width: windowWidth * 0.18,
                  borderRadius: 10,
                }}
              />
              <View style={{ marginLeft: windowWidth * 0.02 }}>
                <Text>Farm Name</Text>
                <Text>Pond Name</Text>
                <Text>Pond Type</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                marginHorizontal: windowWidth * 0.02,
              }}
            >
              <View
                style={{
                  backgroundColor: pearlGreyColour,
                  borderRadius: 10,
                  marginVertical: windowHeight * 0.005,
                  height: windowHeight * 0.05,
                }}
              >
                <Text style={Styles.blueText}>Edit Pond details</Text>
              </View>
              <View
                style={{
                  backgroundColor: pearlGreyColour,
                  borderRadius: 10,
                  marginVertical: windowHeight * 0.005,
                  height: windowHeight * 0.05,
                }}
              >
                <Text style={Styles.blueText}>View Cycle History</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: windowWidth * 0.03,
                marginVertical: windowHeight * 0.01,
                alignItems: 'center',
              }}
            >
              <View>
                <Text>Species</Text>
                <View
                  style={{
                    backgroundColor: pearlGreyColour,
                    borderRadius: 10,
                    marginVertical: windowHeight * 0.005,
                    height: windowHeight * 0.05,
                  }}
                >
                  <Text style={Styles.blueText}>Edit Cycle Details</Text>
                </View>
              </View>
              <View>
                <Text>#CycleId</Text>
                <Text>Cycle Start Date</Text>
                <View style={[Styles.button]}>
                  <Text style={[Styles.buttonText]}>Harvest Cycle</Text>
                </View>
              </View>
            </View>
            <View style={Styles.subTabContainer}>
              <TouchableOpacity
                onPress={() => {
                  toggleTab('Details');
                }}
              >
                <View style={currentTab === 'Details' ? Styles.tabActive : Styles.tabInactive}>
                  <Text style={currentTab === 'Details' ? Styles.tabTextActive : Styles.tabTextInactive}>Details</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  toggleTab('Records');
                }}
              >
                <View style={currentTab === 'Records' ? Styles.tabActive : Styles.tabInactive}>
                  <Text style={currentTab === 'Records' ? Styles.tabTextActive : Styles.tabTextInactive}>Records</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}
        {currentTab === 'Details' && pondStatus === 'active' ? (
          <View style={{ marginHorizontal: windowWidth * 0.03 }}>
            <TouchableOpacity
              onPress={() => {
                setPondDetailsDropStatus(!pondDetailsDropStatus);
              }}
            >
              <View
                style={[
                  Styles.shadowProp,
                  {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    backgroundColor: darkYellow,
                    height: windowHeight * 0.07,
                    alignItems: 'center',
                    borderRadius: 10,
                    paddingHorizontal: windowWidth * 0.04,
                  },
                ]}
              >
                <Text style={{ color: whiteColor, fontWeight: '900', fontSize: windowWidth * 0.045 }}>
                  Active Pond Details
                </Text>
                {pondDetailsDropStatus ? (
                  <AIcons name="caretdown" size={25} color={whiteColor} />
                ) : (
                  <AIcons name="caretright" size={25} color={whiteColor} />
                )}
              </View>
            </TouchableOpacity>
            {pondDetailsDropStatus && (
              <View
                style={[
                  Styles.shadowProp,
                  { backgroundColor: whiteColor, borderRadius: 10, paddingBottom: windowHeight * 0.01 },
                ]}
              >
                <View
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: windowWidth * 0.05,
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={Styles.infoCard2}>
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={{ fontSize: windowHeight * 0.015, fontWeight: '900', color: blackColor }}>
                        Seed(kg)
                      </Text>
                      <Text style={{ fontSize: windowHeight * 0.024, fontWeight: '900', color: blackColor }}>
                        2546Kg
                      </Text>
                    </View>
                  </View>
                  <View style={Styles.infoCard2}>
                    <View style={{ flexDirection: 'column' }}>
                      <Text style={{ fontSize: windowHeight * 0.015, fontWeight: '900', color: blackColor }}>
                        Seeding Date
                      </Text>
                      <Text style={{ fontSize: windowHeight * 0.024, fontWeight: '900', color: blackColor }}>
                        02.02.22
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: windowWidth * 0.08,
                    justifyContent: 'space-between',
                  }}
                >
                  <View style={{ width: windowWidth * 0.5 }}>
                    <Text style={{ color: blackColor, fontWeight: '600' }}>Species:</Text>
                    <Text style={{ color: blackColor, fontWeight: '600' }}>Species PL stage:</Text>
                    <Text style={{ color: blackColor, fontWeight: '600' }}>Total Number Of Larvey:</Text>
                    <Text style={{ color: blackColor, fontWeight: '600' }}>Pond Preperation cost:</Text>
                    <Text style={{ color: blackColor, fontWeight: '600' }}>Seed Company:</Text>
                    <Text style={{ color: blackColor, fontWeight: '600' }}>Seed Cost:</Text>
                  </View>
                  <View
                    style={{
                      alignItems: 'flex-start',
                      width: windowWidth * 0.35,
                      marginLeft: windowWidth * 0.01,
                    }}
                  >
                    <Text style={{ color: blackColor }}>Vennami</Text>
                    <Text style={{ color: blackColor }}>18 days</Text>
                    <Text style={{ color: blackColor }}>2500</Text>
                    <Text style={{ color: blackColor }}>₹ 45,222</Text>
                    <Text style={{ color: blackColor }}>Seed Company</Text>
                    <Text style={{ color: blackColor }}>₹ 56568</Text>
                  </View>
                </View>
                <View style={{ alignSelf: 'center', marginHorizontal: windowWidth * 0.04 }}>
                  <Text style={{ fontSize: windowHeight * 0.018, fontWeight: '400', color: '#000000' }}>
                    This is where the description of the Cycle goes.Lorem ipsum dolor sit amet, consectetur adipiscing
                    elit,sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is where the description
                    of the Pond goes.Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                  </Text>
                </View>
                <View style={{ marginHorizontal: windowWidth * 0.04, marginVertical: windowHeight * 0.01 }}>
                  <Text style={{ color: blackColor, fontWeight: '600' }}>Seed Images</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: windowWidth * 0.02 }}>
                    <View style={Styles.pondDetailsimage}>
                      <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1501577316686-a5cbf6c1df7e' }}
                        style={{ flex: 1 }}
                      />
                    </View>
                    <View style={Styles.pondDetailsimage}>
                      <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1501577316686-a5cbf6c1df7e' }}
                        style={{ flex: 1 }}
                      />
                    </View>
                    <View style={Styles.pondDetailsimage}>
                      <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1501577316686-a5cbf6c1df7e' }}
                        style={{ flex: 1 }}
                      />
                    </View>
                  </View>
                </View>
                <View style={{ marginHorizontal: windowWidth * 0.04, marginVertical: windowHeight * 0.01 }}>
                  <Text style={{ color: blackColor, fontWeight: '600' }}>Pond Preperation images</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: windowWidth * 0.02 }}>
                    <View style={Styles.pondDetailsimage}>
                      <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1501577316686-a5cbf6c1df7e' }}
                        style={{ flex: 1 }}
                      />
                    </View>
                    <View style={Styles.pondDetailsimage}>
                      <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1501577316686-a5cbf6c1df7e' }}
                        style={{ flex: 1 }}
                      />
                    </View>
                    <View style={Styles.pondDetailsimage}>
                      <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1501577316686-a5cbf6c1df7e' }}
                        style={{ flex: 1 }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            )}
          </View>
        ) : currentTab === 'Records' && pondStatus === 'active' ? (
          <View>
            <Text>Records Place Holder</Text>
          </View>
        ) : null}
        <View style={{ marginTop: 25, flexDirection: 'row', flex: 1, alignSelf: 'center' }}>
          <View style={Styles.infoCard}>
            <View style={{ flexDirection: 'column', paddingTop: 10, padding: 13 }}>
              <Text style={{ fontSize: windowHeight * 0.013, fontWeight: '900', color: 'white' }}>Total Cycles</Text>
              <View style={{ alignContent: 'flex-end' }}>
                <View style={{ flexDirection: 'row', marginTop: 2 }}>
                  <Text style={{ fontSize: windowHeight * 0.022, fontWeight: '900', color: 'white' }}>235</Text>
                  <Text style={{ fontSize: windowHeight * 0.015, fontWeight: '300', color: 'white' }}>tn</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={Styles.infoCard}>
            <View style={{ flexDirection: 'column', paddingTop: 10, padding: 13 }}>
              <Text style={{ fontSize: windowHeight * 0.013, fontWeight: '900', color: 'white' }}>
                Completed Cycles
              </Text>
              <Text style={{ fontSize: windowHeight * 0.022, fontWeight: '900', color: 'white' }}>10</Text>
            </View>
          </View>
          <View style={Styles.infoCard}>
            <View style={{ flexDirection: 'column', paddingTop: 10, padding: 13 }}>
              <Text style={{ fontSize: windowHeight * 0.013, fontWeight: '900', color: 'white' }}>AVG. FCR</Text>
              <Text style={{ fontSize: windowHeight * 0.022, fontWeight: '900', color: 'white' }}>1.234</Text>
            </View>
          </View>
        </View>
        <View style={{ marginTop: 10 }}>
          <ImageCarousel1 imageItem={data} callBackIndex={(index: number) => callBackSliderIndex(index)} />
        </View>
        <View style={{ marginTop: 25, margin: 7, alignSelf: 'center' }}>
          <Text style={{ fontSize: windowHeight * 0.018, fontWeight: '400', color: '#000000' }}>
            This is where the description of the Pond goes.Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed
            do eiusmod tempor incididunt ut labore et dolore magna aliqua.This is where the description of the Pond
            goes.Lorem ipsum dolor sit amet, consectetur adipiscing elit,sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </Text>
        </View>
        <View style={[Styles.graph, Styles.shadowProp]}>
          <Text>GRAPH</Text>
        </View>
        <View style={[Styles.graph, Styles.shadowProp]}>
          <Text>GRAPH</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default PondDetails;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pondCard: {
    borderRadius: 10,
    alignSelf: 'center',
    width: windowWidth * 0.95,
    backgroundColor: whiteColor,
    margin: windowWidth * 0.02,
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
    height: windowHeight * 0.07,
    width: windowWidth * 0.25,
  },
  image: {
    borderRadius: 8,
    margin: 5.5,
    marginBottom: 1,
    height: windowHeight * 0.12,
    width: windowWidth * 0.27,
  },
  pondName: {
    fontSize: windowWidth * 0.045,
    marginLeft: 6,
    marginTop: 5,
    fontWeight: '700',
    color: '#000000',
  },
  EditPondDetails: {
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
    backgroundColor: '#0059AB',
    margin: windowWidth * 0.01,
    borderRadius: 10,
  },
  infoCard2: {
    height: windowHeight * 0.08,
    width: windowWidth * 0.37,
    backgroundColor: whiteColor,
    margin: windowWidth * 0.01,
    borderWidth: 1,
    borderColor: '#E6E9EF',
    borderRadius: 10,
    padding: windowHeight * 0.01,
  },
  graph: {
    borderRadius: 10,
    padding: 2.5,
    height: windowHeight * 0.3,
    width: windowWidth * 0.93,
    backgroundColor: whiteColor,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 5,
    alignSelf: 'center',
  },
  imageBottom: {
    height: windowHeight * 0.3,
    width: windowWidth * 0.92,
    borderRadius: 7,
    alignSelf: 'center',
  },
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
  blueText: {
    color: '#459BFF',
    marginVertical: windowHeight * 0.01,
    marginHorizontal: windowHeight * 0.02,
    fontWeight: '600',
  },
  subTabContainer: {
    marginTop: windowHeight * 0.01,
    backgroundColor: '#000000',
    height: windowHeight * 0.06,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabTextInactive: {
    color: '#ffffff',
    textAlign: 'center',
  },
  tabTextActive: {
    color: '#000000',
    textAlign: 'center',
  },
  tabActive: {
    backgroundColor: '#ffffff',
    height: windowHeight * 0.04,
    width: windowWidth * 0.44,
    paddingTop: windowHeight * 0.005,
    borderRadius: 5,
  },
  tabInactive: {
    backgroundColor: '#000000',
    height: windowHeight * 0.04,
    width: windowWidth * 0.44,
    paddingTop: windowHeight * 0.005,
    borderRadius: 5,
  },
  pondDetailsimage: {
    backgroundColor: whiteColor,
    height: windowHeight * 0.12,
    width: windowWidth * 0.27,
    borderColor: '#BDBDBD',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  button: {
    height: windowHeight * 0.04,
    width: windowWidth * 0.4,
    borderRadius: 10,
    backgroundColor: successColor,
    paddingHorizontal: windowWidth * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
