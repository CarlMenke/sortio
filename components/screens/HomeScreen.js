import { View, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BusinessCard from '../cards/BusinessCard';
import { showBusinessForm } from '../../navFunctions'
import { setNavState } from '../../redux/actions';
import styles from '../style/styles';


//NEXT TASKS
//DYNAMICALLY ADD IN STYLES
    //figure out how you can add all the styles to one document and then use variables and such for colors and fonts used across multiple
//add a check for navigation functoins
//refactor how inventory items are stores in menu items, you use object.keys so you get [key, value] and that messed everything up
    // go to where you change thre format and prevent it, then go and refactor the rest to make it flow
export default function HomeScreen() {
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)
    
    return(
        <View style={styles.container}>
            <Button
            onPress={()=>{showBusinessForm(navState, setNavStateAction, {})}}
            title="Create / Join Business"/> 
            {navState.payload.map((businessName, index)=>{
                return(
                    <BusinessCard businessName={businessName} key={index}/>
                )
            })}
        </View>
    )
}
