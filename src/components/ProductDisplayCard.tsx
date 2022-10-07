import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { FC } from 'react'
import { View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux';
import { windowWidth, whiteColor, windowHeight, blackColor, styles, successColor } from '../media/css/common';
import { NavigationParamList } from '../types/navigation';
import ActivityCard from './userComponents/ActivityCard';

// type Props = {}
type naviType = NativeStackNavigationProp<NavigationParamList, 'splash_screen'>;


const navigation = useNavigation<naviType>();
const productStore = useSelector((state: any) => state.productStore);
const validProducts = productStore.productDataArray;
const ProductDisplayCard: FC = () => {

    const onSelect = (productID: number, status: boolean) => {
        if (status) {
            navigation.navigate('product_details_active', { productID });
            console.log('Product details active called');
        } else {
            navigation.navigate('product_details_inactive', { productID });
            console.log('Product details inactive called');
        }
    };

    const goToAddToCart = (): void => {
        navigation.navigate('add_to_cart', { productID });
        console.log('add_to_cart called');
    };


    validProducts.map((product: any, index: number) => {
        const image = product.product_images[0].image.replace('localhost', '103.127.146.20');
    });
    return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>

            <View style={[Styles.container, styles.shadow]} key={index}>
                <TouchableOpacity
                    onPress={() => {
                        console.log('PRODUCT', product);
                        onSelect(product.id, product.is_active_product);
                    }}
                >
                    <ImageBackground
                        style={Styles.image}
                        source={{
                            uri: image,
                        }}
                        imageStyle={{ borderRadius: 5 }}
                    >
                        {product.is_active_product && (
                            <>
                                <View
                                    style={{
                                        width: windowWidth * 0.08,
                                        height: windowHeight * 0.04,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: '#3A95FF',
                                        borderRadius: 50,
                                        position: 'absolute',
                                        top: windowHeight * -0.02,
                                        right: windowWidth * -0.02,
                                    }}
                                >
                                    <Text style={{ color: whiteColor, fontSize: windowHeight * 0.01 }}>DOC:</Text>
                                    <Text style={{ color: whiteColor, fontSize: windowHeight * 0.01 }}>{product.doc}</Text>
                                </View>

                                <View
                                    style={{
                                        backgroundColor: blackColor,
                                        borderRadius: 20,
                                        width: windowWidth * 0.18,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        alignSelf: 'flex-end',
                                        position: 'absolute',
                                        top: windowHeight * 0.065,
                                        right: windowWidth * -0.01,
                                    }}
                                >
                                    <Text style={{ color: whiteColor, fontSize: windowHeight * 0.015 }}>Active</Text>
                                    <View
                                        style={{
                                            height: windowHeight * 0.01,
                                            width: windowWidth * 0.02,
                                            backgroundColor: successColor,
                                            marginLeft: windowWidth * 0.01,
                                            borderRadius: 10,
                                        }}
                                    />
                                </View>
                            </>
                        )}
                    </ImageBackground>
                    <Text style={Styles.title}>{product.product_name}</Text>
                    {/* <Text style={Styles.subtitle}>{productType(product.product_type)}</Text> */}
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default ProductDisplayCard

const Styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5,
        borderRadius: 5,
        width: windowWidth * 0.3,
        backgroundColor: whiteColor,
    },
    image: {
        margin: 7,
        marginBottom: 1,
        height: windowHeight * 0.08,
        width: windowWidth * 0.26,
    },
    title: {
        fontSize: 13,
        marginBottom: 0,
        marginLeft: 7,
        fontFamily: 'Poppins-SemiBold',
        color: '#000000',
    },
    subtitle: {
        fontSize: 12,
        marginLeft: 7,
        marginTop: -3,
        color: '#000000',
        fontFamily: 'Poppins-Regular',
    },
    shadowProp: {
        shadowColor: '#000000',
        shadowOffset: {
            width: 5,
            height: 3,
        },
        shadowOpacity: 1,
        shadowRadius: 3,
        elevation: 3,
    },
});