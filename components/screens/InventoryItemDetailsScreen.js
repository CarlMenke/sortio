import { View, Button, Text} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setNavState } from '../../redux/actions';
import { deleteInventoryItem } from "../../firebaseFunctions"
import { showBusiness } from '../../navFunctions'
import styles from '../style/styles';

export default function InventoryItemDetailsScreen(props) {
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)
    const { name, currentValue, currentUnit } =  navState.business.inventoryItems[navState.payload]

    const hadleRemoveItem = async () => {

    }

    const handleAddItem = async () => {

    }

    const handleDeleteItem = async () => {
        const response = await deleteInventoryItem(name, navState.business.businessName)
        showBusiness(navState, setNavStateAction, {}, navState.business.businessName)
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
            <Button
                onPress={handleDeleteItem}
                title="Delete"/>
        </View>
    )
}
