import React, { FC, useEffect, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ImageCarousel1 from '../../components/ImageCarousel1';
import PondCardArray from '../../components/pondComponenets/PondCardArray';
import { windowHeight, windowWidth, whiteColor } from '../../media/css/common';
import { useSelector } from 'react-redux';

const logo = '../../media/AquaLogo.gif';

export interface ImageCarouselItem {
  id: number;
  uri: string;
  title: string;
}

const FarmDetails: FC = () => {
  const navigation = useNavigation();
  const farmStore = useSelector((state: any) => state.farmStore);
  const tempName = 'farm Image';
  const farmImages = farmStore.farmImages;
  const [carasolImages, setCarasolImages] = useState<ImageCarouselItem[]>([]);

  useEffect(() => {
    const tempData: ImageCarouselItem[] = farmImages.map((image: String, index: Number) => {
      return {
        id: index,
        uri: image,
        title: tempName + index,
      };
    });
    setData(tempData);
  }, [farmImages]);

  const setData = (tempData: ImageCarouselItem[]) => {
    setCarasolImages(tempData);
  };

  const farmEdit = () => {
    console.log('Navigate to farm edit page');
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
        <View style={[Styles.farmCard, Styles.shadowProp]}>
          <Image style={Styles.image} source={{ uri: farmImages[0] }} />
          <View
            style={{
              flexDirection: 'column',
              flex: 1,
              justifyContent: 'space-between',
              marginLeft: windowWidth * 0.01,
            }}
          >
            <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'column', justifyContent: 'space-around' }}>
                <Text style={Styles.farmName}>{farmStore.farmName}</Text>
                <TouchableOpacity
                  style={Styles.EditFarmDetails}
                  onPress={() => {
                    farmEdit();
                  }}
                >
                  <Text style={{ fontSize: windowHeight * 0.015, fontWeight: '900', color: '#479dfb' }}>
                    Edit Farm Details
                  </Text>
                </TouchableOpacity>
                <Text style={{ fontSize: windowHeight * 0.018 }}>Avg FCR: 1.2</Text>
              </View>
              <View style={{ flexDirection: 'column', justifyContent: 'flex-end', marginRight: 10, marginBottom: 8 }}>
                <Text style={{ fontSize: windowHeight * 0.014, fontWeight: '500', color: '#000000' }}>
                  #{farmStore.farmID}
                </Text>
                <Text style={{ fontSize: windowHeight * 0.014, fontWeight: '400', color: '#000000' }}>Location</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ marginTop: windowHeight * 0.05, flexDirection: 'row', flex: 1, alignSelf: 'center' }}>
          <View style={Styles.infoCard}>
            <View style={{ flexDirection: 'column', padding: windowWidth * 0.02 }}>
              <Text style={{ fontSize: windowHeight * 0.017, fontWeight: '900', color: 'white' }}>Total Harvest</Text>
              <View style={{ flexDirection: 'row', marginTop: 2 }}>
                <Text style={{ fontSize: windowHeight * 0.03, fontWeight: '900', color: 'white' }}>235</Text>
                <Text style={{ fontSize: windowHeight * 0.015, fontWeight: '300', color: 'white' }}>tn</Text>
              </View>
            </View>
          </View>
          <View style={Styles.infoCard}>
            <View style={{ flexDirection: 'column', padding: windowWidth * 0.02 }}>
              <Text style={{ fontSize: windowHeight * 0.015, fontWeight: '900', color: 'white' }}>Active Cycles</Text>
              <Text style={{ fontSize: windowHeight * 0.03, fontWeight: '900', color: 'white' }}>10</Text>
            </View>
          </View>
          <View style={Styles.infoCard}>
            <View style={{ flexDirection: 'column', padding: windowWidth * 0.02 }}>
              <Text style={{ fontSize: windowHeight * 0.015, fontWeight: '900', color: 'white' }}>Total Ponds</Text>
              <Text style={{ fontSize: windowHeight * 0.03, fontWeight: '900', color: 'white' }}>235</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            marginVertical: windowHeight * 0.02,
            marginHorizontal: windowWidth * 0.05,
            margin: 7,
            alignSelf: 'center',
          }}
        >
          <Text style={{ fontSize: windowHeight * 0.022, fontWeight: '400', color: '#000000' }}>
            {farmStore.farmDescription}
          </Text>
        </View>
        <View style={[Styles.graph, Styles.shadowProp]}>
          <Text>GRAPH</Text>
        </View>
        <View style={[Styles.graph, Styles.shadowProp]}>
          <Text>GRAPH</Text>
        </View>
        <View style={{ marginVertical: windowHeight * 0.05 }}>
          <Text style={{ alignSelf: 'center', fontSize: 20, fontWeight: '800', color: '#000000' }}>All Ponds</Text>
          <PondCardArray />
        </View>
        <View style={{ marginVertical: windowHeight * 0.01 }}>
          <ImageCarousel1
            imageItem={carasolImages}
            callBackIndex={(index: number) => {
              console.log(index);
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
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
    marginTop: 20,
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
  farmName: {
    fontSize: windowHeight * 0.022,
    marginTop: 5,
    fontWeight: '700',
    color: '#000000',
  },
  EditFarmDetails: {
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
    marginHorizontal: windowWidth * 0.02,
    borderRadius: 10,
  },
  graph: {
    borderRadius: 10,
    padding: windowHeight * 0.01,
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
});
