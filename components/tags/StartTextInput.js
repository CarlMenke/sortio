import { StyleSheet, Text, TextInput, View, Button, Animated } from 'react-native';
import { useEffect, useState, useRef  } from 'react';
import { showInventory , showUpdateBusiness, showMenuItems } from '../../navFunctions'
import { useDispatch, useSelector } from 'react-redux';
import { setNavState } from '../../redux/actions';


export default function StartTextInput(props) {
    const { navState } = useSelector(state => state.reducer)
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { onChangeText, value, placeholder, onFocus, onBlur, focused, animation } = props

    const styles = StyleSheet.create({
        secondBorder: {
            borderWidth:1,
            borderColor:"white",
            width:"100%",
            borderRadius: 3,
          },
        thirdBorder:{
            marginTop:.5,
            opacity: focused ? 1 : 0,
            borderWidth : 1,
            borderColor:"#FFC600",
            width:"100%",
            borderRadius: 3
          },
        input:{
            color:"white",
            fontSize:20,
            fontFamily: "Arial Rounded MT Bold",
            paddingBottom: 6.5
        },
        item : {
            width:"98%",
            marginTop: 20,
            marginBottom:20
        },
    });

    return (
        <View style={styles.item}>
            <TextInput 
            style = {styles.input}
            onChangeText = {onChangeText}
            value = {value}
            placeholder = {placeholder}
            onFocus={()=>onFocus(true)}
            onBlur={()=>onBlur(false)}/>
            <View style={styles.secondBorder}/>
            <Animated.View style={[styles.thirdBorder,
            {width:animation.interpolate({inputRange: [0,1], outputRange: ["0%", "100%"]}) }] }/>
        </View>
    )
}
