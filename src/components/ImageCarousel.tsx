import React, { FunctionComponent, useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import { windowHeight, windowWidth } from '../media/css/common';

interface ImageCarouselProps {}

interface ImageItems {
  title: string;
  filepath: string;
}

const imageItem: Array<ImageItems> = [
  {
    title: 'FirstImage',
    filepath: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
  },
  {
    title: 'SecondImage',
    filepath: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
  },
  {
    title: 'ThirdImage',
    filepath: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
  },
];

const renderItems: FunctionComponent<{ item: ImageItems }> = ({ item }) => (
  <TouchableOpacity
    onPress={() => {
      console.log('clicked');
    }}
    activeOpacity={1}
  >
    <Image source={{ uri: item.filepath }} style={styles.image} />
    <View style={styles.footer}>
      <Text style={styles.footerText}>{item.title}</Text>
    </View>
  </TouchableOpacity>
);
const ImageCarousel: FunctionComponent<ImageCarouselProps> = () => {
  let flatListRef = useRef<FlatList<ImageItems> | null>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const onViewRef = useRef(({ changed }: { changed: any }) => {
    if (changed[0].isViewabale) {
      setCurrentIndex(changed[0].index);
    }
  });

  const scrollToIndex = (index: number) => {
    flatListRef.current?.scrollToIndex({ animated: true, index: index });
  };
  useEffect(() => {
    return () => {
      console.log('103');
    };
  }, []);
  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        ref={(ref) => {
          flatListRef.current = ref;
        }}
        data={imageItem}
        renderItem={renderItems}
        keyExtractor={(item, index) => index.toString()}
        style={styles.carousel}
        onViewableItemsChanged={onViewRef.current}
      />
      <View style={styles.dotview}>
        {imageItem.map(({}, index: number) => (
          <TouchableOpacity
            // eslint-disable-next-line
            style={[styles.circle, { backgroundColor: index === currentIndex ? 'black' : 'gray' }]}
            key={index.toString()}
            onPress={() => {
              scrollToIndex(index);
              console.log('index', index, '     current', currentIndex);
              console.log('add', index === currentIndex);
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
    height: windowHeight * 0.29,
    resizeMode: 'contain',
  },
  dotview: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  footer: {},
  footerText: {},
  carousel: {
    maxHeight: windowWidth * 0.8,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 50,
    marginHorizontal: 5,
  },
});
