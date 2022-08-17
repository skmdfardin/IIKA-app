import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { windowHeight, windowWidth } from '../../media/css/common';

interface Props {
  onPress: any | undefined;
  pondName: string;
  pondImage: string;
  pondType: string;
}

const PondCard: FC<Props> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Card style={Styles.container}>
        <Card.Cover style={Styles.image} source={{ uri: `${props.pondImage}` }} />
        <Card.Content>
          <Title style={Styles.title}>{props.pondName}</Title>
          <Paragraph style={Styles.subtitle}>{props.pondType}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};
export default PondCard;

const Styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: 5,
    borderRadius: 10,
    height: windowHeight * 0.16,
    width: windowWidth * 0.3,
  },
  image: {
    borderRadius: 10,
    borderTopEndRadius: 10,
    borderTopLeftRadius: 10,
    margin: 5,
    marginBottom: -5,
    height: windowHeight * 0.1,
  },
  title: {
    fontSize: 13,
    marginBottom: -10,
  },
  subtitle: {
    fontSize: 11,
  },
});
