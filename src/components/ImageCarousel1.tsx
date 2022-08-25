import React, { FunctionComponent, useRef, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { blackColor, windowHeight, windowWidth } from '../media/css/common';
import { ImageCarouselItem } from '../screens/farm/FarmDetails';

interface ImageCarouselProps {
  imageItem: ImageCarouselItem[];
  callBackIndex: Function;
}

const renderItems: FunctionComponent<{ item: ImageCarouselItem }> = ({ item }) => (
  <TouchableOpacity
    onPress={() => {
      console.log('clicked');
    }}
    activeOpacity={1}
  >
    <Image source={{ uri: item.uri }} style={styles.image} />
  </TouchableOpacity>
);

const ImageCarousel: FunctionComponent<ImageCarouselProps> = (props: ImageCarouselProps) => {
  let flatListRef = useRef<FlatList<ImageCarouselItem> | null>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const onViewRef = React.useRef((viewableItems: any) => {
    // Use viewable items in state or as intended
    if (viewableItems.changed[0].isViewable) {
      setCurrentIndex(viewableItems.changed[0].index);
      props.callBackIndex(viewableItems.changed[0].index);
    }
  });
  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({ animated: true, index: index });
  };
  let refreshItem: boolean = true;
  return (
    <View style={{ marginBottom: 50 }}>
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          ref={(ref) => {
            flatListRef.current = ref;
          }}
          data={props.imageItem}
          renderItem={renderItems}
          keyExtractor={(_item, index) => index.toString()}
          style={styles.carousel}
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          onViewableItemsChanged={onViewRef.current}
        />
      </View>
      <View style={styles.dotview}>
        {refreshItem &&
          props.imageItem.map(({}, index: number) => (
            <TouchableOpacity
              style={[styles.circle, { backgroundColor: currentIndex === index ? '#e0e1e0' : blackColor }]}
              key={index.toString()}
              onPress={() => {
                scrollToIndex(index);
              }}
            />
          ))}
      </View>
    </View>
  );
};

export default ImageCarousel;

const styles = StyleSheet.create({
  image: {
    width: windowWidth,
    height: windowHeight * 0.25,
    resizeMode: 'contain',
  
  },
  dotview: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignSelf: 'center',
    marginVertical: 180,
    position: 'absolute',
  },
  carousel: {
    maxHeight: windowWidth * 0.6,
  },
  circle: {
    width: 8,
    height: 8,
    borderRadius: 50,
    marginHorizontal: 2.5,
  },
});
