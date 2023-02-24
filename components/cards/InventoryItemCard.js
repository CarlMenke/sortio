import { View, Text, TouchableWithoutFeedback} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { showInventoryItemDetails } from '../../navFunctions'
import { setNavState } from '../../redux/actions';
import styles from '../style/styles';

export default function InventoryItemCard(props) {

    const { name, amountUsed, amountUnit, currentUnit, currentValue } = props.inventoryItem
    console.log(name, amountUsed, amountUnit, currentUnit, currentValue, "inMenuItem" in props)
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)

    if("inMenuItem" in props){
        return(
            <TouchableWithoutFeedback 
            onPress={()=>{
                props.onPressHandler?
                props.onPressHandler(props.inventoryItem):
                showInventoryItemDetails(navState, setNavStateAction, {}, name)
            }}>
                <View style={styles.container}>
                    <Text>{name}</Text>
                    <Text>{amountUsed}</Text>
                    <Text>{amountUnit}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }else{
        return(
            <TouchableWithoutFeedback onPress={()=>{
                props.onPressHandler?
                props.onPressHandler(props.inventoryItem):
                showInventoryItemDetails(navState, setNavStateAction, {}, name)
            }}>
                <View style={styles.container}>
                    <Text>{name}</Text>
                    <Text>{currentValue}</Text>
                    <Text>{currentUnit}</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }
}
