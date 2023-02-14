import { View, Button, Text} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setNavState } from '../../redux/actions';
import { showBusiness } from '../../navFunctions'
import styles from '../style/styles';

export default function BusinessCard(props) {
    const { businessName } = props
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)
    
    return(
        <View style={styles.container}>
            <Text>{businessName}</Text>
            <Button
                onPress = {()=>{showBusiness(navState, setNavStateAction,{}, businessName)}}
                title = "Details"/>
        </View>
    )
}
