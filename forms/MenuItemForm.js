import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useState  } from 'react';
import { useDispatch, useSelector } from 'react-redux';
const convert = require('convert-units')
import { setNavState } from '../redux/actions';
import { showMenuItems } from '../navFunctions'

export default function MenuItemForm() {
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)

    const styles = StyleSheet.create({
        container: {
            flex:.3,
            flexDirection: "column",
            backgroundColor: '#353535',
            alignItems: 'center',
            justifyContent: 'space-around',
            paddingTop: 50
        }
    });

    return (
        <View style={styles.container}>

        </View>
    )
}
