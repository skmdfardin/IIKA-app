import React, { FC } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

interface Props {
  onPress: any;
  pondName: string;
  pondImage: string;
  pondType : string;
};

const PondCard : FC<Props> = (props) => {
  return (
    <TouchableOpacity onPress= {props.onPress()}>
    <Card style={Styles.container}>
      <Card.Cover style = {Styles.image} source={{ uri: `${props.pondImage}`}} />
      <Card.Content>
        <Title>{props.pondName}</Title>
        <Paragraph>{props.pondType}</Paragraph>
      </Card.Content>
    </Card>
    </TouchableOpacity>
  );
};
export default PondCard;

const Styles = StyleSheet.create({
  container: {
    alignContent: 'center',
    margin: 37,
    borderRadius : 10
  },
  image: {
    borderRadius : 15,
    borderTopEndRadius : 15,
    borderTopLeftRadius : 15,
    margin : 15
  },
});
