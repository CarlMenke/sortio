import { Text, View, Animated, TouchableOpacity, Image } from 'react-native';
import { useEffect, useState, useRef  } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setAuthentication, setNavState } from '../../redux/actions'
import { signup, login } from '../../firebaseFunctions'
import { auth }   from '../../firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";
import { getCurrentUsersBusinesses } from '../../firebaseFunctions'
import InputField from '../tags/InputField';
import styles from '../style/styles'
const logo = require('../../assets/images/logo.png')

export default function StartScreen() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [header, setHeader] = useState({
    header1: "Welcome,",
    header2: "create an account below.",
    method: 'signup'
  })

  const dispatch = useDispatch()
  const setAuthenticationAction = (isAuthenticated) => dispatch(setAuthentication(isAuthenticated))
  const setNavStateAction = (navState) => dispatch(setNavState(navState))
  const {navState} = useSelector(state => state.reducer)

  useEffect(()=> {
    onAuthStateChanged(auth, async (user) => {
      if(user){
        const response = await getCurrentUsersBusinesses()
        setNavStateAction({
          screen: "home",
          payload: response.data === null ? [] : response.data,
          bottomBar: "home"
        })
        setAuthenticationAction(true)
      }else{
        setAuthenticationAction(false)
      }
    })
  }, [])

  const toggleMethod = () => {
    setFirstName("")
    setLastName("")
    setEmail("")
    setPassword("")

    if(header.method === "signup"){
      setHeader({
        header1: "Hello,",
        header2: "nice to see you again.",
        method: 'login'
      })
    }else{
      setHeader({
        header1: "Welcome,",
        header2: "create an account below.",
        method: 'signup'
      })
    }
  }
  
  if(header.method === "signup"){
    return (
      <View style={styles.startScreen}>
            <View style={styles.header}>
              <Text style={styles.header1}>{header.header1}</Text>
              <Text style={styles.header2}>{header.header2}</Text>
            </View>
            <View style={styles.inputArea}>
              <InputField
              onChangeText={setFirstName}
              value={firstName}
              placeholder={"First Name"}/>

              <InputField 
              onChangeText = {setLastName}
              value = {lastName}
              placeholder = "Last Name"/>

              <InputField 
              onChangeText = {setEmail}
              value = {email}
              placeholder = "Email"/>

              <InputField
              onChangeText = {setPassword}
              isPassword = {true}
              value = {password}
              placeholder = "Password"/>
            </View>


            <View style={styles.buttonsArea}>
              <TouchableOpacity
              style = {styles.submitButton}
              onPress = {()=>{signup(email, password, firstName, lastName)}}>
                <Text style={styles.submitButtontext}>Submit</Text>
              </TouchableOpacity>

              <TouchableOpacity
              style = {styles.switchButton}
              onPress = {toggleMethod}>
                <Text style={styles.switchButtonText}>I already have an account.</Text>
              </TouchableOpacity>
            </View>

        </View>
      )
    }else{
      return (
        <View style={styles.startScreen}>            
            <View style={styles.header}>
              <Text style={styles.header1}>{header.header1}</Text>
              <Text style={styles.header2}>{header.header2}</Text>
            </View>
            <View style={styles.inputArea}>
              <InputField 
                onChangeText = {setEmail}
                value = {email}
                placeholder = "Email"/>
                <InputField
                onChangeText = {setPassword}
                isPassword = {true}
                value = {password}
                placeholder = "Password"/>
                <Text style={styles.resetPassword}>Forgot password?</Text>
            </View>
            <View style={styles.buttonsArea}>
              <TouchableOpacity
              style = {styles.submitButton}
              onPress = {()=>{login(email, password)}}>
                <Text style={styles.submitButtontext}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
              style = {styles.switchButton}
              onPress = {toggleMethod}>
                <Text  style={styles.switchButtonText}>I wish to create an account.</Text>
              </TouchableOpacity>
            </View>
        </View>
      )
    }
}
