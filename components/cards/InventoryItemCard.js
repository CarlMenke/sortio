import { View, Text, TouchableOpacity} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { showInventoryItemDetails } from '../../navFunctions'
import { setNavState } from '../../redux/actions';
import styles from '../style/styles';

export default function InventoryItemCard(props) {

    const { name, amountUsed, amountUnit, currentUnit, currentValue } = props.inventoryItem
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)

    return(
        <TouchableOpacity 
        style={styles.inventoryItemCard}
        onPress={()=>{
            props.onPressHandler?
            props.onPressHandler(props.inventoryItem):
            showInventoryItemDetails(navState, setNavStateAction, {}, name)
        }}>
            <Text style={styles.cardName}>{name}</Text>
            <View style={{flexDirection: "row"}}>
                <Text style={styles.cardAmount}>{currentValue ? currentValue : amountUsed}</Text>
                <Text style={styles.cardUnit}>  {currentUnit ? currentUnit : amountUnit}</Text>
            </View>
        </TouchableOpacity>
    )
}
