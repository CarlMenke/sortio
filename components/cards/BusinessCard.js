import { StyleSheet, View, Button, Text} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setNavState } from '../../redux/actions';
import { showBusiness } from '../../navFunctions'

export default function BusinessCard(props) {
    const { businessName } = props
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
        <View style={styles.container}>
            <Text>{businessName}</Text>
            <Button
                onPress = {()=>{showBusiness(navState, setNavStateAction,{}, businessName)}}
                title = "Details"/>
        </View>
    )
}
