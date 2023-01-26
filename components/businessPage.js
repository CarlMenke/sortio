import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { useState  } from 'react';
import IngredientForm from '../forms/ingredient'


export default function BusinessPage(props) {

    const styles = StyleSheet.create({
        container: {
            height:"100%",
            flexDirection: "column",
            backgroundColor: '#353535',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingTop: 50
        }
    });

    // you will need a get business information firebase function here inside of a use effect 

    return (
        <View style={styles.container}>
            <Text>{props.business}</Text>
            <IngredientForm/>
        </View>
    )
}
