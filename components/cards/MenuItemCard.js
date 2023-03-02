import { View, Button, Text} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setNavState } from '../../redux/actions';
import { showMenuItemDetails } from '../../navFunctions'
import styles from '../style/styles';

export default function MenuItemCard(props) {
    const {name, price} = props.menuItem
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)

    return(
        <View style={styles.menuItemCard}>
            <Text>{name}</Text>
            <Text>Price: {price}</Text>
            <Button
            onPress={()=>showMenuItemDetails(navState, setNavStateAction, {}, name)}
            title="Details"/>
        </View>
    )
}