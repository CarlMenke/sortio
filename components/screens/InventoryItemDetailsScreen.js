import { View, Button, Text} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setNavState } from '../../redux/actions';
import styles from '../style/styles';

export default function InventoryItemDetailsScreen(props) {
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)
    const { name, currentValue, currentUnit } =  navState.business.inventoryItems[navState.payload]

    const hadleRemoveItem = () => {

    }

    const handleAddItem = () => {

    }

    return(
         <View style={styles.container}>
            <Text>{name} details:</Text>
            <Text>{currentValue}</Text>
            <Text>{currentUnit}</Text>
            <Button
                onPress={hadleRemoveItem}
                title="Remove Items"/>
            <Button 
                onPress={handleAddItem}
                title="Add Items"/>
        </View>
    )
}
