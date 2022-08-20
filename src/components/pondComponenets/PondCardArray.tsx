import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Text, View } from 'react-native';
import PondCard from './PondCard';
import { CallGetApi } from '../../utilites/Util';

//' http://103.127.146.20:4000/api/v1/farms/farmregist/27/get-related-ponds/';

const PondCardArray: FC = () => {
  const store = useSelector((state: any) => state.userStore);
  const farmStore = useSelector((state: any) => state.farmStore);
  const pondURL = 'http://103.127.146.20:4000/api/v1/farms/farmregist/' + farmStore.farmID + '/get-related-ponds/';

  let validPonds: any[] = [];

  useEffect(() => {
    console.log('executed only once!');
    fetchData();
  });

  const fetchData = async () => {
    const pondApiCall = await CallGetApi(pondURL, store.email);
    const pondData = pondApiCall.data.result.ponds;
    validPonds = pondData;
    const temp = await ponds();
    console.log('TEMP', temp);
  };

  const ponds = async () => {
    const temp = await validPonds.map((pond) => {
      const image = pond.pond_images[0].image.replace('localhost', '103.127.146.20');
      return <PondCard pondName={pond.pond_name} pondType={pond.pond_type} pondImage={image} onPress={() => {}} />;
    });
    console.log(temp);
    return temp;
  };

  return (
    <View>
      <Text>Place</Text>
      <>{ponds}</>
    </View>
  );
};

export default PondCardArray;
