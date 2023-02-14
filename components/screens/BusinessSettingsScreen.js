import { View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react'
import { updateBusinessNameAndCode, deleteBusiness, removeBusinessFromUser, makeUserBusinessOwner } from '../../firebaseFunctions'
import { auth } from '../../firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { setNavState } from '../../redux/actions';
import { showBusiness, showHome, showBusinessSettings} from "../../navFunctions"
import styles from '../style/styles';

const EnterBusinessCode = (props) => {
    const {show, setShow, setValue, value, submitType, businessName, email} = props
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)

    const handleSubmitUpdateName = async () => {
        if(value !== navState.business.businessCode) return 
        const data = {
            businessName: businessName === "" ? navState.business.businessName : businessName 
        }
        const response = await updateBusinessNameAndCode(navState.business.businessName, navState.business.businessCode, data)
        showBusinessSettings(navState, setNavStateAction, {})
        setShow(false)
    }

    const handleDeleteBusiness = async () => {
        setShow(false)
        if(value !== navState.business.businessCode) return
        const response = await deleteBusiness(navState.business.businessName, value)
        console.log(response)
        showHome(navState, setNavStateAction, {} )
        setShow(false)
    }

    const handleRemoveFromBusiness = async () => {
        if(value !== navState.business.businessCode) return 
        const response = await removeBusinessFromUser(navState.business.businessName, email)
        showBusinessSettings(navState, setNavStateAction, {})
        setShow(false)
    }

    const handlerMakeUserOwner = async () => {
        if(value !== navState.business.businessCode) return
        const response = await makeUserBusinessOwner(navState.business.businessName, navState.business.businessCode,  email)
        showBusiness(navState, setNavStateAction, {}, navState.business.businessName)
        setShow(false)
    }

    const handleSubmit = () => {
        if(submitType === "update"){
            handleSubmitUpdateName()
        }else if(submitType === 'delete'){
            handleDeleteBusiness()
        }else if(submitType === "removeUser"){
            handleRemoveFromBusiness()
        }else if(submitType === 'makeUserOwner'){
            handlerMakeUserOwner()
        }
    }

    if(show){
        return(
            <View>
                <Text>Please Enter Business Code</Text>
                <TextInput 
                onChangeText={setValue}
                value={value}/>
                <Button
                title="Confirm"
                onPress={handleSubmit}/>
            </View>
        )
    }
}

export default function BusinessSettingsScreen() {
    const dispatch = useDispatch()
    const setNavStateAction = (navState) => dispatch(setNavState(navState))
    const { navState } = useSelector(state => state.reducer)
    const [businessName, setBusinessName] = useState(navState.business.businessName)
    const [businessCode, setBusinessCode] = useState()
    const [currentSubmitAction, setCurrentSubmitAction] = useState('update')
    const [isOwner, setIsOwner] = useState(false)
    const [email, setEmail] = useState(false)
    const [showBusinessCode, setShowBusinessCode] = useState(false)
    useEffect(()=>{
        if(auth.currentUser.email === navState.business.ownerEmail){
            setIsOwner(true)
        }
    },[])

    const promptBusinessCode = async (action, email) => {
        setEmail(email)
        setShowBusinessCode(true)
        setCurrentSubmitAction(action)
    }

    const handleLeaveBusiness = async () => {
        await removeBusinessFromUser(navState.business.businessName, auth.currentUser.email)
        showHome(navState, setNavStateAction, {})
    }
    
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
                <EnterBusinessCode 
                    businessName={businessName} 
                    show = {showBusinessCode} 
                    setShow={setShowBusinessCode} 
                    value={businessCode} 
                    setValue={setBusinessCode} 
                    submitType={currentSubmitAction}
                    email={email}/>
                <TouchableOpacity
                    onPress={()=>promptBusinessCode("update")}>
                    <Text>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={()=>promptBusinessCode("delete")}>
                        <Text>Delete {navState.business.businessName}</Text>
                </TouchableOpacity>
                <View style={styles.user}>
                    <Text>Users: </Text>
                    {navState.business.users.map((email, index)=>{
                        if(email === auth.currentUser.email){
                            return (
                                <View key={index}>
                                    <Text>{email} { "(Owner)"}</Text>
                                </View>
                            )
                        }else{
                            return (
                                <View key={index}>
                                    <Text>{email}</Text>
                                    <Button
                                    title="Remove"
                                    onPress={()=>promptBusinessCode("removeUser", email)}/>
                                    <Button 
                                    title="Make Owner"
                                    onPress={()=>promptBusinessCode('makeUserOwner', email)}/>
                                </View>
                            )
                        }
                    })}
                </View>
            </View>
        )
    }else{
        return(
            <View style={styles.container}>
                <Button
                title="Leave Business"
                onPress={handleLeaveBusiness}/>
            </View>
        )
    }
}
