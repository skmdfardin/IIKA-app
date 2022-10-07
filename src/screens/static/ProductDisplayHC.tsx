import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { windowWidth } from '../../media/css/common'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackNavigationParamList } from '../../types/navigation';
import { useNavigation } from '@react-navigation/native';

// type Props = {}
const logo = '../../media/logo.png';
const productA = '../../media/productA.png';
const productB = '../../media/productB.png';
const productC = '../../media/productC.png';
const productD = '../../media/productD.png';

// type naviType = NativeStackNavigationProp<StackNavigationParamList, 'product_display_screen'>;

// const navigation = useNavigation<naviType>();

const navigation = useNavigation();
const ProductDisplayHC: FC = () => {


    return (
        <SafeAreaView style={styles.container}>
            <View style={{ backgroundColor: 'black', flexDirection: 'row-reverse', justifyContent: 'space-between', height: windowWidth * 0.15 }}>
                <Image source={require(logo)} style={{ resizeMode: 'contain', width: windowWidth * 0.15, height: windowWidth * 0.15 }} />
                <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => {
                    console.log('Pressable');
                    // navigation.toggleDrawer();

                }}>
                    <Icon name="menu-outline" size={windowWidth * 0.15} color={'white'} />
                </TouchableOpacity>
                {/* <Text style={{ fontFamily: 'Poppins', fontWeight: '400', color: 'gold', fontSize: windowWidth * 0.1, marginRight: windowWidth * 0.025, marginTop: windowWidth * 0.005 }}>IIKA</Text> */}
            </View>
            <ScrollView style={styles.scrollable}>
                <View>
                    <Text style={{ alignSelf: 'center', fontSize: windowWidth * 0.1 }}>Products</Text>
                </View>
                <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                    <TouchableOpacity style={styles.productCard} onPress={() => {
                        console.log('Product Card Clicked');
                    }}>
                        <Image source={require(productA)} style={[styles.productImage, styles.shadowProp]} />
                        <Text style={styles.productTitle}>Product A</Text>
                        <Text style={styles.productText}>Price</Text>
                        <Text style={styles.productText}>₹79000/-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.productCard} onPress={() => {
                        console.log('Product Card Clicked');
                    }}>
                        <Image source={require(productB)} style={styles.productImage} />
                        <Text style={styles.productTitle}>Product B</Text>
                        <Text style={styles.productText}>Price</Text>
                        <Text style={styles.productText}>₹79000/-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.productCard} onPress={() => {
                        console.log('Product Card Clicked');
                    }}>
                        <Image source={require(productC)} style={styles.productImage} />
                        <Text style={styles.productTitle}>Product C</Text>
                        <Text style={styles.productText}>Price</Text>
                        <Text style={styles.productText}>₹79000/-</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.productCard} onPress={() => {
                        console.log('Product Card Clicked');
                    }}>
                        <Image source={require(productD)} style={styles.productImage} />
                        <Text style={styles.productTitle}>Product D</Text>
                        <Text style={styles.productText}>Price</Text>
                        <Text style={styles.productText}>₹79000/-</Text>
                    </TouchableOpacity>
                    <Text style={styles.productText}>End of List</Text>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

export default ProductDisplayHC

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    scrollable: {
        flex: 1,
    },
    productCard: {
        backgroundColor: '#D3D3D3',
        width: windowWidth * 0.75,
        height: windowWidth * 0.75,
        borderRadius: windowWidth * 0.05,
        margin: windowWidth * 0.05,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 7,
            height: 5,
        },
        shadowOpacity: 0.75,
        shadowRadius: 6.68,
        elevation: 5,
    },
    productImage: {
        margin: windowWidth * 0.03,
        backgroundColor: 'white',
        resizeMode: 'contain',
        width: windowWidth * 0.4,
        height: windowWidth * 0.4,
        alignSelf: 'center',
        borderRadius: windowWidth * 0.25
    },
    productTitle: {
        alignSelf: 'center',
        fontSize: windowWidth * 0.1
    },
    productText: {
        alignSelf: 'center',
        fontSize: windowWidth * 0.05
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
})