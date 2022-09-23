import { RouteProp, useRoute } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react';
import { Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
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
import BlueCards from '../../components/BlueCards';

const logo = '../../media/AquaLogo.gif';

type pondDetailsRouteType = RouteProp<NavigationParamList, 'pond_details_active'>;
type naviType = NativeStackNavigationProp<NavigationParamList, 'splash_screen'>;

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

const PondDetailsActive: FC = () => {
  const navigation = useNavigation<naviType>();

  const {
    params: { pondID },
  } = useRoute<pondDetailsRouteType>();

  const store = useSelector((state: any) => state.userStore);
  const farmStore = useSelector((state: any) => state.farmStore);
  const token = store.email;
  const farmName = farmStore.farmName;

  const [currentTab, setCurrentTab] = useState('Details');
  const [pondDetailsDropStatus, setPondDetailsDropStatus] = useState(false);
  const [pondDescrition, setPondDescription] = useState<string>('');
  const [pondName, setPondName] = useState('');
  const [pondType, setPondType] = useState('');
  const [pondImages, setPondImages] = useState<ImageCarouselItem[]>([]);
  const [pondIdImage, setPondIdImage] = useState('');

  const [cycleID, setCycleID] = useState(Number);
  const [cycleDescription, setCycleDescription] = useState('');
  const [seedingDate, setSeedingDate] = useState('');
  const [speciesPLStage, setSpeciesPLStage] = useState(Number);
  const [noOfLarve, setNoOfLarve] = useState(Number);
  const [pondPrepCost, setPondPrepCost] = useState(Number);
  const [seedCompany, setSeedCompany] = useState('');
  const [seedCost, setSeedCost] = useState(Number);
  const [seedImages, setSeedImages] = useState(['']);
  const [cyclePondImages, setCyclePondImages] = useState(['']);

  const [modalVisible, setModalVisible] = useState(false);

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

  const getSeedCompany = (companyNo: number) => {
    if (companyNo === 1) {
      return 'Company-ABC';
    }
    if (companyNo === 2) {
      return 'Company-XYZ';
    }
    return 'unknown';
  };

  const getPLStage = (PLstage: number) => {
    if (PLstage === 1) {
      return 'PL-5';
    }
    if (PLstage === 2) {
      return 'PL-10';
    }
    if (PLstage === 3) {
      return 'PL-15';
    }
    return 'unknown';
  };

  useEffect(() => {
    const fetchData = async () => {
      const pondUrl = 'http://103.127.146.20:4000/api/v1/ponds/pondregist/' + pondID.toString();
      try {
        const pondData: any = await CallGetApi(pondUrl, token);
        if (pondData !== null) {
          const detail = pondData.data;
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
          setCycleID(detail.active_cycle_id);
          try {
            const cycleURL = 'http://103.127.146.20:4000/api/v1/cycle/cycleregist/' + detail.active_cycle_id;
            const cycleData: any = await CallGetApi(cycleURL, token);
            const data = cycleData.data;

            setCycleDescription(data.description);
            setSeedingDate(data.seeding_date);
            setSpeciesPLStage(data.species_pl_stage);
            setNoOfLarve(data.numbers_of_larva);
            setPondPrepCost(data.pondPrep_cost);
            setSeedCompany(getSeedCompany(data.seed_company));
            setSeedCost(data.invest_amount);
            const seedTemp = data.seed_images.map((seed: any) => {
              return seed.image.replace('localhost', '103.127.146.20');
            });
            setSeedImages(seedTemp);
            const pondTemp = data.pond_images.map((seed: any) => {
              return seed.image.replace('localhost', '103.127.146.20');
            });
            setCyclePondImages(pondTemp);
            console.log('Seed Temp \n', seedTemp, '\n Pond Temp \n', pondTemp);
          } catch (err) {
            console.log(err);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [token, pondID]);

  const toggleTab = (selectedTab: string) => {
    setCurrentTab(selectedTab);
  };
  const pondEdit = () => {
    console.log('Navigate to pond edit page');
  };

  return (
    <SafeAreaView style={Styles.container}>
      <Modal visible={modalVisible} transparent={true}>
        <TouchableOpacity
          style={{ backgroundColor: '#000000aa', flex: 1, justifyContent: 'flex-end' }}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View
            style={{
              height: windowHeight * 0.2,
              backgroundColor: whiteColor,
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              style={[Styles.button]}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate('harvest_cycle_screen', {
                  pondID: pondID,
                  cycleID: cycleID,
                  harvestType: 0,
                  pondName: pondName,
                });
              }}
            >
              <Text style={[Styles.buttonText]}>Partial Harvest</Text>
            </TouchableOpacity>
            <Text style={{ color: blackColor, fontWeight: '700' }}>or</Text>
            <TouchableOpacity
              style={[Styles.button, { backgroundColor: '#00A25B' }]}
              onPress={() => {
                setModalVisible(!modalVisible);
                navigation.navigate('harvest_cycle_screen', {
                  pondID: pondID,
                  cycleID: cycleID,
                  harvestType: 1,
                  pondName: pondName,
                });
              }}
            >
              <Text style={[Styles.buttonText]}>Full Harvest</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
      <View style={Styles.header}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={Styles.backButton}>Back</Text>
        </TouchableOpacity>
        <Image style={Styles.logo} source={require(logo)} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
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
            <Text style={{ color: whiteColor, fontFamily: 'Poppins-Regular' }}>#{pondID.toString()}</Text>
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
              <Text style={{ fontFamily: 'Poppins-Regular', color: '#000000' }}>Active</Text>
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
                uri: pondIdImage !== '' ? pondIdImage : 'https://images.unsplash.com/photo-1501577316686-a5cbf6c1df7e',
              }}
              style={{
                height: windowHeight * 0.09,
                width: windowWidth * 0.18,
                borderRadius: 10,
              }}
            />
            <View style={{ marginLeft: windowWidth * 0.02 }}>
              <Text style={{ fontFamily: 'Poppins-Regular', color: '#000000' }}>{farmName}</Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  color: '#000000',
                  fontSize: windowWidth * 0.045,
                  marginTop: windowHeight * -0.005,
                }}
              >
                {pondName}
              </Text>
              <Text style={{ fontFamily: 'Poppins-Regular', color: '#000000', marginTop: windowHeight * -0.005 }}>
                {pondType}
              </Text>
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
              style={{
                backgroundColor: pearlGreyColour,
                borderRadius: 10,
                marginVertical: windowHeight * 0.005,
                height: windowHeight * 0.05,
              }}
              onPress={() => {
                pondEdit();
              }}
            >
              <Text style={Styles.blueText}>Edit Pond details</Text>
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
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: '#000000',
                  fontSize: windowWidth * 0.045,
                  marginTop: windowHeight * -0.005,
                }}
              >
                Vannamei
              </Text>
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
              <Text
                style={{
                  fontFamily: 'Poppins-SemiBold',
                  color: '#000000',
                  fontSize: windowWidth * 0.028,
                  marginTop: windowHeight * -0.005,
                  alignSelf: 'flex-end',
                }}
              >
                #{cycleID}
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Regular',
                  color: '#000000',
                  marginTop: windowHeight * -0.005,
                  alignSelf: 'flex-end',
                }}
              >
                2022-02-02
              </Text>
              <TouchableOpacity
                style={[Styles.button]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text style={[Styles.buttonText]}>Harvest Cycle</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={Styles.subTabContainer}>
            <TouchableOpacity
              onPress={() => {
                toggleTab('Details');
              }}
            >
              <View style={currentTab === 'Details' ? Styles.tabActive : Styles.tabInactive}>
                <Text
                  style={[
                    currentTab === 'Details' ? Styles.tabTextActive : Styles.tabTextInactive,
                    { fontFamily: 'Poppins-Regular' },
                  ]}
                >
                  Details
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                toggleTab('Records');
              }}
            >
              <View style={currentTab === 'Records' ? Styles.tabActive : Styles.tabInactive}>
                <Text
                  style={[
                    currentTab === 'Records' ? Styles.tabTextActive : Styles.tabTextInactive,
                    { fontFamily: 'Poppins-Regular' },
                  ]}
                >
                  Records
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {currentTab === 'Details' ? (
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
                  <Text style={{ color: whiteColor, fontFamily: 'Poppins-Bold', fontSize: windowWidth * 0.045 }}>
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
                        <Text style={{ fontSize: windowHeight * 0.015, fontFamily: 'Poppins-Bold', color: blackColor }}>
                          Seed (kg)
                        </Text>
                        <Text style={{ fontSize: windowHeight * 0.024, fontFamily: 'Poppins-Bold', color: blackColor }}>
                          2546Kg
                        </Text>
                      </View>
                    </View>
                    <View style={Styles.infoCard2}>
                      <View style={{ flexDirection: 'column' }}>
                        <Text style={{ fontSize: windowHeight * 0.015, fontFamily: 'Poppins-Bold', color: blackColor }}>
                          Seeding Date
                        </Text>
                        <Text style={{ fontSize: windowHeight * 0.024, fontFamily: 'Poppins-Bold', color: blackColor }}>
                          {seedingDate}
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
                      <Text style={Styles.tableColumn1}>Species:</Text>
                      <Text style={Styles.tableColumn1}>Species PL stage:</Text>
                      <Text style={Styles.tableColumn1}>Total Number Of Larvey:</Text>
                      <Text style={Styles.tableColumn1}>Pond Preperation cost:</Text>
                      <Text style={Styles.tableColumn1}>Seed Company:</Text>
                      <Text style={Styles.tableColumn1}>Seed Cost:</Text>
                    </View>
                    <View
                      style={{
                        alignItems: 'flex-start',
                        width: windowWidth * 0.35,
                        marginLeft: windowWidth * 0.01,
                      }}
                    >
                      <Text style={Styles.tableColumn2}>Vennami</Text>
                      <Text style={Styles.tableColumn2}>{getPLStage(speciesPLStage)}</Text>
                      <Text style={Styles.tableColumn2}>{noOfLarve}</Text>
                      <Text style={Styles.tableColumn2}>₹ {pondPrepCost}</Text>
                      <Text style={Styles.tableColumn2}>{seedCompany}</Text>
                      <Text style={Styles.tableColumn2}>₹ {seedCost}</Text>
                    </View>
                  </View>
                  <View style={{ alignSelf: 'center', marginHorizontal: windowWidth * 0.04 }}>
                    <Text style={{ fontSize: windowHeight * 0.018, fontFamily: 'Poppins-Regular', color: '#000000' }}>
                      {cycleDescription}
                    </Text>
                  </View>
                  <View style={{ marginHorizontal: windowWidth * 0.04, marginVertical: windowHeight * 0.01 }}>
                    <Text style={{ color: blackColor, fontFamily: 'Poppins-SemiBold' }}>Seed Images</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: windowWidth * 0.02 }}>
                      {seedImages.map((seed, index) => {
                        return (
                          <View style={Styles.pondDetailsimage} key={index}>
                            <Image source={{ uri: seed }} style={{ flex: 1 }} />
                          </View>
                        );
                      })}
                    </View>
                  </View>
                  <View style={{ marginHorizontal: windowWidth * 0.04, marginVertical: windowHeight * 0.01 }}>
                    <Text style={{ color: blackColor, fontFamily: 'Poppins-SemiBold' }}>Pond Preperation images</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: windowWidth * 0.02 }}>
                      {cyclePondImages.map((seed, index) => {
                        return (
                          <View style={Styles.pondDetailsimage} key={index}>
                            <Image source={{ uri: seed }} style={{ flex: 1 }} />
                          </View>
                        );
                      })}
                    </View>
                  </View>
                </View>
              )}
            </View>
            <Text
              style={{
                fontFamily: 'Poppins-Bold',
                fontSize: windowWidth * 0.05,
                color: '#000000',
                margin: windowHeight * 0.025,
                marginBottom: windowHeight * -0.035,
              }}
            >
              Pond Details
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
              <BlueCards cardHeading={'Total Cycles'} cardValue={235} weight={'tn'} />
              <BlueCards cardHeading={'Completed Cycles'} cardValue={10} />
              <BlueCards cardHeading={'AVG. FCR'} cardValue={1.234} />
            </View>

            <View style={{ marginTop: 20 }}>
              <ImageCarousel1
                imageItem={pondImages}
                callBackIndex={(index: number) => {
                  console.log(index);
                }}
              />
            </View>
            <View style={{ marginTop: 25, margin: 7, alignSelf: 'center' }}>
              <Text style={{ fontSize: windowHeight * 0.018, fontFamily: 'Poppins-Regular', color: '#000000' }}>
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
        ) : currentTab === 'Records' ? (
          <View>
            <Text>Records Place Holder</Text>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};
export default PondDetailsActive;

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
  tableColumn1: {
    color: blackColor,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 3,
  },
  tableColumn2: {
    color: blackColor,
    fontFamily: 'Poppins-Regular',
    marginBottom: 3,
  },
  backButton: {
    color: '#ffffff',
    fontSize: windowHeight * 0.02,
    paddingLeft: windowWidth * 0.05,
    fontFamily: 'Poppins-Regular',
    marginTop: 5,
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
    fontFamily: 'Poppins-SemiBold',
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
    borderRadius: 10,
    backgroundColor: successColor,
    paddingHorizontal: windowWidth * 0.05,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: windowHeight * 0.01,
  },
  buttonText: {
    color: '#ffffff',
    fontFamily: 'Poppins-Bold',
  },
});
