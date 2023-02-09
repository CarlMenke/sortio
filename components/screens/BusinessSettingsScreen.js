import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react'
import { updateBusinessNameAndCode, deleteBusiness } from '../../firebaseFunctions'
import { auth } from '../../firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { setNavState } from '../../redux/actions';
import { showBusiness } from "../../navFunctions"


//NEXT TASKS
//DYNAMICALLY ADD IN STYLES
    //figure out how you can add all the styles to one document and then use variables and such for colors and fonts used across multiple
//add a check for navigation functoins
//refactor how inventory items are stores in menu items, you use object.keys so you get [key, value] and that messed everything up
    // go to where you change thre format and prevent it, then go and refactor the rest to make it flow
export default function BusinessSettingsScreen() {
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)
    const [businessName, setBusinessName] = useState(navState.business.businessName)
    const [businessCode, setBusinessCode] = useState(navState.business.businessCode)
    const [isOwner, setIsOwner] = useState(false)

    useEffect(()=>{
        if(auth.currentUser.uid === navState.business.ownerId){
            setIsOwner(true)
        }
    },[])

    const handleSubmit = async () => {
        const data = {
            businessCode: businessCode === "" ? navState.business.businessCode : businessCode ,
            businessName: businessName === "" ? navState.business.businessName : businessName 
        }
        const response = await updateBusinessNameAndCode(navState.business.businessName, navState.business.businessCode, data)
        showBusiness(navState, setNavStateAction, {}, response.data)
    }

    const handlePropmtBusinessCode = () => {
        //HAVE THIS FUNCTION PROMPT THE BUSINESS CODE AND THEN WHEN THEY CLICK ENTER RUN THE handleDeleteBusiness
        //making another component may be the best way to do this
    }
    const handleDeleteBusiness = async () => {
        const response = await deleteBusiness(navState.business.businessName, businessCode)
    }

    const styles = StyleSheet.create({
        container: {
          flex: 1,
          flexDirection: "column",
          backgroundColor: '#544D57',
          alignItems: 'center',
          justifyContent: 'center',
        },
    });
    
    if(isOwner){
        return(
            <View style={styles.container}>
                <View>
                    <Text>Update Business Name: </Text>
                    <TextInput 
                        style = {styles.input}
                        onChangeText = {setBusinessName}
                        value = {businessName}/>
                </View>
                <View>
                    <Text>Update Business Code: </Text>
                    <TextInput 
                        style = {styles.input}
                        onChangeText = {setBusinessCode}
                        value = {businessCode}/>
                </View>
                <TouchableOpacity
                    onPress={handleSubmit}>
                        <Text>Enter</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handlePropmtBusinessCode}>
                        <Text>Delete {navState.business.businessName}</Text>
                </TouchableOpacity>
            </View>
        )
    }else{
        return(
            <View style={styles.container}>
                <Text>Must Be Business Owner to Update</Text>
            </View>
        )
    }
}
