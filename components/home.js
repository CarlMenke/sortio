import { StyleSheet, View, Button, Text} from 'react-native';
import { getCurrentUsersBusinesses, getBusinessDetails } from '../firebaseFunctions'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNavState } from '../redux/actions';

export default function Home() {
    const [businesses, setBusinesses] = useState([])
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

    const helper = async () =>{
        const response  = await getCurrentUsersBusinesses()
        setBusinesses(response.data)
    }

    useEffect(()=> {
        if(navState.screen === 'home'){
            helper()
        }
    },[navState])

    const showBusiness = async (businessName) => {
        const response  = await getBusinessDetails(businessName)
        setNavStateAction({
            screen: 'business',
            payload: response.data
        })
    }

    const showBusinessForm = () => {
        setNavStateAction({
            screen: "businessForm",
            payload: null
        })
    }

    return(
        <View style={styles.container}>
            <Button
            onPress={showBusinessForm}
            title="Create / Join Business"/> 
            {businesses.map((businessName, index)=>{
                return(
                    <View key={index}>
                        <Text>
                            {businessName}
                        </Text>
                        <Button
                            onPress = {()=>{showBusiness(businessName)}}
                            title = "Details"/>
                    </View>
                )
            })}
        </View>
    )
}
