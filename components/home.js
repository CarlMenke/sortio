import { StyleSheet, View, Button, Text} from 'react-native';
import { getCurrentUsersBusinesses } from '../firebaseFunctions'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNavState } from '../redux/actions';

export default function Home() {

    const [businesses, setBusinesses] = useState([])

    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))

    const { navState } = useSelector(state => state.reducer)


    //ideally you use a firebaseFunction to retrive an array of all the businesses that the current user is in
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
        const businessesArray  = await getCurrentUsersBusinesses()
        console.log('businessArray:', businessesArray)
        setBusinesses(businessesArray)
    }

    useEffect(()=> {
        console.log("useEffectRan", navState.screen)
        if(navState.screen === 'home'){
            helper()
        }
    },[navState])

    useEffect(()=>{
        console.log(businesses)
    },[businesses])

    const showBusiness = (businessName) => {
        setNavStateAction({
            screen: 'business',
            payload: businessName
        })
    }

    const showBusinessForm = () => {
        setNavStateAction({
            screen: "businessForm",
            payload: null
        })
    }

    //BusinessForm Component Below should be changed to a button that loads a new business form and says "create or join a business"
    return(
        <View style={styles.container}>
            <Button
            onPress={showBusinessForm}
            title="Create / Join Business"/> 
            {businesses.map((businessName)=>{
                return(
                    <View>
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
