import React, { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CallGetApi } from '../../utilites/Util';
import { whiteColor, windowHeight, windowWidth, styles } from '../../media/css/common';

//    { label: 'Nursery', value: 1 },
// { label: 'Effluent Treatment Pond (ETS)', value: 2 },
// { label: 'Reservoir Pond', value: 3 },

const PondCardArray: FC = () => {
  const store = useSelector((state: any) => state.userStore);
  const farmStore = useSelector((state: any) => state.farmStore);
  const pondURL = 'http://103.127.146.20:4000/api/v1/farms/farmregist/' + farmStore.farmID + '/get-related-ponds/';
  const [validPonds, setValidPonds] = useState([]);
  const token = store.email;

  useEffect(() => {
    console.log('executed only once!');

    const fetchData = async () => {
      try {
        const pondApiCall = await CallGetApi(pondURL, token);
        if (pondApiCall.status === 200) {
          const pondData = pondApiCall.data.result.ponds;
          console.log('POND DATA', pondData);
          setValidPonds(pondData);
        } else {
          throw new Error(pondApiCall);
        }
      } catch (err) {
        console.log('ERROR IN POND ARRAY', err);
      }
    };
    fetchData();
  }, [pondURL, token]);

  const onSelect = (pondID: string) => {
    console.log('pondID', pondID);
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
      {validPonds !== null
        ? validPonds.map((pond, index) => {
            const image = pond.pond_images[0].image.replace('localhost', '103.127.146.20');
            return (
              <View style={[Styles.container, styles.shadow]} key={index}>
                <TouchableOpacity
                  onPress={() => {
                    onSelect(pond.id);
                  }}
                >
                  <Image
                    style={Styles.image}
                    source={{
                      uri: image,
                    }}
                  />
                  <Text style={Styles.title}>{pond.pond_name}</Text>
                  <Text style={Styles.subtitle}>{pondType(pond.pond_type)}</Text>
                </TouchableOpacity>
              </View>
            );
          })
        : null}
    </View>
  );
};

export default PondCardArray;

const Styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    borderRadius: 10,
    width: windowWidth * 0.3,
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
