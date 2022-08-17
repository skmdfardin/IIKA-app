import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Text, View } from 'react-native';
import PondCard from './PondCard';
import { CallGetApi } from '../../utilites/Util';

const pondURL = ' http://103.127.146.20:4000/api/v1/ponds/pondregist/';

const PondCardArray: FC = () => {
  const store = useSelector((state: any) => state.userStore);
  const farmStore = useSelector((state: any) => state.farmStore);
  let validPonds: any[] = [];

  useEffect(() => {
    console.log('executed only once!');
    fetchData();
  }, []);

  const fetchData = async () => {
    const pondApiCall = await CallGetApi(pondURL, store.email);
    const pondData = pondApiCall.data;
    console.log('POND DATA', pondData[0].pond_images[0].image);
    validPonds = pondData.filter((pond: { farm: any }) => {
      return pond.farm === farmStore.farmID;
    });
    ponds();
  };

  const ponds = async () => {
    console.log('CHECK');
    const temp = await validPonds.map((pond) => {
      const image = pond.pond_images[0].image.replace('localhost', '103.127.146.20');

      return (
        <PondCard
          pondName={pond.pond_name}
          pondType={pond.pond_type}
          pondImage={image}
          onPress={() => {
            console.log('TEST');
          }}
        />
      );
    });
    console.log(temp);
    return temp;
  };

  return (
    <View>
      {ponds()}
      <Text>PLACE HOLDER</Text>
    </View>
  );
};

export default PondCardArray;
