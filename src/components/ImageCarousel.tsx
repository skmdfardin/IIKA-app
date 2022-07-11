import React, { FunctionComponent, useRef, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Text } from 'react-native-paper';
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { greyColor, lightBlueColor, windowHeight, windowWidth } from '../media/css/common';
import { ImageItems } from '../screens/static/SliderScreen';

interface ImageCarouselProps {
  imageItem: ImageItems[];
  callBackIndex: Function;
}

const renderItems: FunctionComponent<{ item: ImageItems }> = ({ item }) => (
  <TouchableOpacity
    onPress={() => {
      console.log('clicked');
    }}
    activeOpacity={1}
  >
    <Image source={item.filepath} style={styles.image} />
  </TouchableOpacity>
);

const ImageCarousel: FunctionComponent<ImageCarouselProps> = (props: ImageCarouselProps) => {
  let flatListRef = useRef<FlatList<ImageItems> | null>();
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
    <View>
      <View style={{ alignItems: 'flex-end', marginTop: windowWidth * 0.04, marginEnd: windowWidth * 0.03 }}>
        {currentIndex !== 2 && (
          <MIcon
            name="arrow-right"
            size={windowWidth * 0.05}
            color={greyColor}
            onPress={() => scrollToIndex(currentIndex + 1)}
          />
        )}
      </View>
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
      <View style={styles.dotview}>
        {refreshItem &&
          props.imageItem.map(({}, index: number) => (
            <TouchableOpacity
              style={[styles.circle, { backgroundColor: currentIndex === index ? lightBlueColor : greyColor }]}
              key={index.toString()}
              onPress={() => {
                scrollToIndex(index);
              }}
            />
          ))}
      </View>
      <View style={styles.footer}>
        <Text numberOfLines={2} style={[styles.footerText, { textAlign: 'center' }]}>
          {props.imageItem[currentIndex].title}
        </Text>
        <Text
          numberOfLines={2}
          style={{
            marginTop: windowWidth * 0.06,
            alignSelf: 'center',
            textAlign: 'center',
            color: 'black',
            fontWeight: 'bold',
            marginStart: windowWidth * 0.07,
            marginEnd: windowWidth * 0.07,
            fontSize: windowWidth * 0.05,
          }}
        >
          {props.imageItem[currentIndex].descriptionText}
        </Text>
      </View>
    </View>
  );
};

export default ImageCarousel;

const styles = StyleSheet.create({
  image: {
    width: windowWidth,
    height: windowHeight * 0.24,
    resizeMode: 'contain',
  },
  dotview: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  footer: {
    alignContent: 'center',
  },
  footerText: {
    marginStart: windowWidth * 0.2,
    marginEnd: windowWidth * 0.2,
  },
  carousel: {
    maxHeight: windowWidth * 0.6,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 50,
    marginHorizontal: 5,
  },
});
