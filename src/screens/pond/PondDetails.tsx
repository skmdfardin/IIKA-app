import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AIcons from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
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
import { NavigationParamList } from '../../types/navigation';
import { CallGetApi } from '../../utilites/Util';
import { useSelector } from 'react-redux';

const logo = '../../media/AquaLogo.gif';

type pondDetailsRouteType = RouteProp<NavigationParamList, 'pond_details'>;
type naviType = NativeStackNavigationProp<NavigationParamList, 'splash_screen'>;

//{"description": "description", "id": 12, "pond_images": [{"id": 19, "image": "http://localhost:9000/aqua/pond_images/Screenshot_1.png", "image_name": "Screenshot (1).png", "images": 12}, {"id": 20, "image": "http://localhost:9000/aqua/pond_images/Screenshot_6.png", "image_name": "Screenshot (6).png", "images": 12}], "pond_name": "pond2Dev2", "pond_type": 1}

export interface ImageCarouselItem {
  id: number;
  uri: string;
  title: string;
}

export type responseItem = {
  id: number;
  image: string;
  image_name: string;
};

const PondDetails: FC = () => {
  const navigation = useNavigation<naviType>();

  const {
    params: { pondID },
  } = useRoute<pondDetailsRouteType>();

  const store = useSelector((state: any) => state.userStore);
  const farmStore = useSelector((state: any) => state.farmStore);
  const token = store.email;
  const farmName = farmStore.farmName;

  const [pondStatus, setPondStatus] = useState('inactive');
  const [currentTab, setCurrentTab] = useState('Details');
  const [pondDetailsDropStatus, setPondDetailsDropStatus] = useState(false);
  const [pondDescrition, setPondDescription] = useState<string>('');
  const [pondName, setPondName] = useState<string>('');
  const [pondType, setPondType] = useState<string>('');
  const [pondImages, setPondImages] = useState<ImageCarouselItem[]>([]);
  const [pondIdImage, setPondIdImage] = useState<string>('');

  const pondTypeString = (pondTypeNo: number) => {
    if (pondTypeNo === 1) {
      return 'Nursery';
    }
    if (pondTypeNo === 2) {
      return 'ETS';
    }
    if (pondTypeNo === 3) {
      return 'Reservoir Pond';
    }
    return 'unknown';
  };

  useEffect(() => {
    const fetchData = async () => {
      const pondUrl = 'http://103.127.146.20:4000/api/v1/ponds/pondregist/' + pondID.toString() + '/get-pond-summary/';
      try {
        const pondData: any = await CallGetApi(pondUrl, token);
        if (pondData !== null) {
          const detail = pondData.data.result;
          const tempData: ImageCarouselItem[] = detail.pond_images.map((item: responseItem) => {
            return {
              id: item.id,
              uri: item.image.replace('localhost', '103.127.146.20'),
              title: item.image_name,
            };
          });
          const temp: string = pondTypeString(detail.pond_type);
          setPondImages(tempData);
          setPondDescription(detail.description);
          setPondName(detail.pond_name);
          setPondType(temp);
          setPondIdImage(tempData[0].uri);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token, pondID]);

  const toggleTab = (selectedTab: string) => {
    console.log('POND ID in pond details', pondID);
    setCurrentTab(selectedTab);
  };
  const pondEdit = () => {
    console.log('Navigate to pond edit page');
    setPondStatus('active');
  };

  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={Styles.backButton}>BACK</Text>
        </TouchableOpacity>
        <Image style={Styles.logo} source={require(logo)} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {pondStatus === 'inactive' ? (
          <>
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
                <Text style={{ color: whiteColor }}>#{pondID.toString()}</Text>
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
                  source={{
                    uri:
                      pondIdImage !== '' ? pondIdImage : 'https://images.unsplash.com/photo-1501577316686-a5cbf6c1df7e',
                  }}
                  style={{
                    height: windowHeight * 0.09,
                    width: windowWidth * 0.18,
                    borderRadius: 10,
                  }}
                />
                <View style={{ marginLeft: windowWidth * 0.02 }}>
                  <Text>{farmName}</Text>
                  <Text>{pondName}</Text>
                  <Text>{pondType}</Text>
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
            <View style={{ marginTop: 25, flexDirection: 'row', flex: 1, alignSelf: 'center' }}>
              <View style={Styles.infoCard}>
                <View style={{ flexDirection: 'column', paddingTop: 10, padding: 13 }}>
                  <Text style={{ fontSize: windowHeight * 0.013, fontWeight: '900', color: 'white' }}>
                    Total Cycles
                  </Text>
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
              <ImageCarousel1
                imageItem={pondImages}
                callBackIndex={(index: number) => {
                  console.log(index);
                }}
              />
            </View>
            <View style={{ marginTop: 25, margin: 7, alignSelf: 'center' }}>
              <Text style={{ fontSize: windowHeight * 0.018, fontWeight: '400', color: '#000000' }}>
                {pondDescrition}
              </Text>
            </View>
            <View style={[Styles.graph, Styles.shadowProp]}>
              <Text>GRAPH</Text>
            </View>
            <View style={[Styles.graph, Styles.shadowProp]}>
              <Text>GRAPH</Text>
            </View>
          </>
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
              <Text style={{ color: whiteColor }}>#{pondID.toString()}</Text>
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
                source={{
                  uri:
                    pondIdImage !== '' ? pondIdImage : 'https://images.unsplash.com/photo-1501577316686-a5cbf6c1df7e',
                }}
                style={{
                  height: windowHeight * 0.09,
                  width: windowWidth * 0.18,
                  borderRadius: 10,
                }}
              />
              <View style={{ marginLeft: windowWidth * 0.02 }}>
                <Text>{farmName}</Text>
                <Text>{pondName}</Text>
                <Text>{pondType}</Text>
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
          <>
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
                      {pondDescrition}
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
            <View style={{ marginTop: 25, flexDirection: 'row', flex: 1, alignSelf: 'center' }}>
              <View style={Styles.infoCard}>
                <View style={{ flexDirection: 'column', paddingTop: 10, padding: 13 }}>
                  <Text style={{ fontSize: windowHeight * 0.013, fontWeight: '900', color: 'white' }}>
                    Total Cycles
                  </Text>
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
              <ImageCarousel1
                imageItem={pondImages}
                callBackIndex={(index: number) => {
                  console.log(index);
                }}
              />
            </View>
            <View style={{ marginTop: 25, margin: 7, alignSelf: 'center' }}>
              <Text style={{ fontSize: windowHeight * 0.018, fontWeight: '400', color: '#000000' }}>
                {pondDescrition}
              </Text>
            </View>
            <View style={[Styles.graph, Styles.shadowProp]}>
              <Text>GRAPH</Text>
            </View>
            <View style={[Styles.graph, Styles.shadowProp]}>
              <Text>GRAPH</Text>
            </View>
          </>
        ) : currentTab === 'Records' && pondStatus === 'active' ? (
          <View>
            <Text>Records Place Holder</Text>
          </View>
        ) : null}
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
