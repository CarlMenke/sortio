import { StyleSheet, View, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BusinessCard from '../cards/BusinessCard';
import { showBusinessForm } from '../../navFunctions'
import { setNavState } from '../../redux/actions';

export default function HomeScreen() {
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          flexDirection: "column",
          backgroundColor: '#544D57',
          alignItems: 'center',
          justifyContent: 'center',
        },
    });
    console.log(navState)
    return(
        <View style={styles.container}>
            <Button
            onPress={()=>{showBusinessForm(navState, setNavStateAction)}}
            title="Create / Join Business"/> 
            {navState.payload.map((businessName, index)=>{
                return(
                    <BusinessCard businessName={businessName} key={index}/>
                )
            })}
        </View>
    )
}
