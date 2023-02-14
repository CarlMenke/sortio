import { TextInput, View, Animated } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setNavState } from '../../redux/actions';
import styles from '../style/styles';

export default function StartTextInput(props) {
    const { navState } = useSelector(state => state.reducer)
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { onChangeText, value, placeholder, onFocus, onBlur, focused, animation } = props

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
            <Animated.View style={[focused ? styles.thirdBorderFocused : styles.thirdBorderNotFocused,
            {width:animation.interpolate({inputRange: [0,1], outputRange: ["0%", "100%"]}) }] }/>
        </View>
    )
}
