import { View, Button, Text} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setNavState } from '../../redux/actions';
import MenuItemCard from '../cards/MenuItemCard';
import { showMenuItemForm } from '../../navFunctions'
import styles from '../style/styles';

export default function MenuItemsScreen() {
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)

    return(
        <View style={styles.container}>
            {Object.entries(navState.business.menuItems).map((menuItem, index)=>{
               return(
                <MenuItemCard menuItem={menuItem[1]} key={index}/>
               )
            })}
            <Button
            onPress={()=>showMenuItemForm(navState, setNavStateAction, {}, {})}
            title="Create New Menu Item"/>
        </View>
    )
}
