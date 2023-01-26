import { StyleSheet, View, Button, Text} from 'react-native';
import { getCurrentUsersBusinesses } from '../firebaseFunctions'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNavState } from '../redux/actions';

export default function MenuItemCard() {
    
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          flexDirection: "column",
          backgroundColor: '#544D57',
          alignItems: 'center',
          justifyContent: 'center',
        },
    });

    return(
        <View style={styles.container}>

        </View>
    )
}
