import { StyleSheet, View, Button, Text, TouchableWithoutFeedback} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { showInventoryItemDetails } from '../navFunctions'
import { setNavState } from '../redux/actions';

export default function InventoryItemCard(props) {
    const { name, currentValue, currentUnit } = props.inventoryItem[1]

    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)

    const styles = StyleSheet.create({
        container: {
          flexDirection: "column",
          backgroundColor: '#544D57',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth:1,
          borderColor: "yellow",
          borderRadius: 10,
          padding:10,
          margin: 10
        },
    });

    return(
        <TouchableWithoutFeedback onPress={()=>{
            props.onPressHandler?
            props.onPressHandler(props.inventoryItem[1]):
            showInventoryItemDetails(navState, setNavStateAction, {}, props.inventoryItem[1])}}>
            <View style={styles.container}>
                <Text>{name}</Text>
                <Text>{currentValue}</Text>
                <Text>{currentUnit}</Text>
            </View>
        </TouchableWithoutFeedback>
    )
}
