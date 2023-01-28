import { StyleSheet, View, Button, Text} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setNavState } from '../redux/actions';
import { showMenuItemDetails } from '../navFunctions'

export default function MenuItemCard(props) {
    const menuItem = props.menuItem
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)

    const styles = StyleSheet.create({
        container: {
            flex:.2,
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
//you will need a add item to menuItem function here for after the list

    return(
        <View style={styles.container}>
            <Text>{menuItem.name}</Text>
            <Text>IMAGE HERE</Text>
            <Text>{menuItem.price}</Text>
            <Button
            onPress={()=>showMenuItemDetails(navState, setNavStateAction, {}, menuItem)}
            title="Add Items"/>
        </View>
    )
}

/*
make sure that the inventoryItemDetails has a button on it to add that inventoryItem 
to a menuItem.
*/