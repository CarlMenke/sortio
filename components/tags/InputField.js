import { TextInput, View, Animated, Text, Easing } from 'react-native';
import { useRef, useState, useEffect } from 'react';
import styles from '../style/styles';

export default function InputField(props) {
    const { onChangeText, value, label, placeholder} = props

    const animation = useRef(new Animated.Value(0)).current
    const [focused, setFocused ] = useState(false)


    useEffect(()=>{
        Animated.timing(animation, {
          toValue: focused? 1 : 0,
          duration: 200,
          useNativeDriver: false,
          easing: Easing.quad
        }).start()
      },[focused])

    return (
        <View style={styles.inputFieldContainer}>
            <Text>{label}</Text>
            <Animated.View 
                style={[
                    styles.inputField,
                    {
                        backgroundColor:animation.interpolate({inputRange: [0,1], outputRange: ["#f2f2f2", "#ebebeb"]}),
                        borderColor:animation.interpolate({inputRange: [0, 1], outputRange: ["#999999", "#787878"]}),
                        borderWidth:animation.interpolate({inputRange: [0, 1], outputRange: [1.5, 2]}),
                        shadowColor:animation.interpolate({inputRange: [0, 1], outputRange: ["#808080", "#454545"]}),
                        shadowRadius:animation.interpolate({inputRange: [0, 1], outputRange: [1, 1.75]}),
                        shadowOpacity:animation.interpolate({inputRange: [0, 1], outputRange: [.4, .5]}),
                        padding:animation.interpolate({inputRange: [0, 1], outputRange: [15, 14]}),
                    }
                ]}> 
                <Animated.View
                    style={[
                        value === "" ? styles.inputFieldMove : styles.inputFieldUsed,
                        value === "" ? {
                            top:animation.interpolate({inputRange: [0,1], outputRange: [15, -20]}),
                            left:animation.interpolate({inputRange: [0,1], outputRange: [15, 5]}),
                        } : null
                    ]}>
                    <Text style ={styles.inputFieldText}>{placeholder}</Text>
                </Animated.View>
                <TextInput 
                style = {styles.textInput}
                onChangeText = {onChangeText}
                value = {value}
                onFocus={()=>setFocused(true)}
                onBlur={()=>setFocused(false)}/>
            </Animated.View>
        </View>
    )
}
