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
        <View style={styles.container}>
            <Text>{name}</Text>
            <Text>IMAGE HERE</Text>
            <Text>Price: {price}</Text>
            <Button
            onPress={()=>showMenuItemDetails(navState, setNavStateAction, {}, name)}
            title="Details"/>
        </View>
    )
}

/*
make sure that the inventoryItemDetails has a button on it to add that inventoryItem 
to a menuItem.
*/