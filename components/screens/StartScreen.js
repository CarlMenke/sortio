import { StyleSheet, Text, View, Button, TextInput, Animated, TouchableOpacity } from 'react-native';
import { useEffect, useState, useRef  } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { setAuthentication, setNavState } from '../../redux/actions'
import { signup, login } from '../../firebaseFunctions'
import { auth }   from '../../firebaseConfig';
import { onAuthStateChanged } from "firebase/auth";
import { getCurrentUsersBusinesses } from '../../firebaseFunctions'
import StartTextInput from '../tags/StartTextInput';

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

const [emailFocused, setEmailFocused ] = useState(false)
const [passwordFocused, setPasswordFocused ] = useState(false)
const [firstNameFocused, setFirstNameFocused ] = useState(false)
const [lastNameFocused, setLastNameFocused ] = useState(false)

const emailAnim = useRef(new Animated.Value(0)).current
const passwordAnim = useRef(new Animated.Value(0)).current
const firstNameAnim = useRef(new Animated.Value(0)).current
const lastNameAnim = useRef(new Animated.Value(0)).current

useEffect(()=>{
  Animated.timing(emailAnim, {
    toValue: emailFocused? 1 : 0,
    duration: 225,
    useNativeDriver:false,
  }).start()
},[emailFocused])

useEffect(()=>{
  Animated.timing(passwordAnim, {
    toValue: passwordFocused? 1 : 0,
    duration: 225,
    useNativeDriver:false,
  }).start()
},[passwordFocused])

useEffect(()=>{
  Animated.timing(firstNameAnim, {
    toValue: firstNameFocused? 1 : 0,
    duration: 225,
    useNativeDriver:false,
  }).start()
},[firstNameFocused])

useEffect(()=>{
  Animated.timing(lastNameAnim, {
    toValue: lastNameFocused? 1 : 0,
    duration: 225,
    useNativeDriver:false,
  }).start()
},[lastNameFocused])

  const dispatch = useDispatch()
  const setAuthenticationAction = (isAuthenticated) => dispatch(setAuthentication(isAuthenticated))
  const setNavStateAction = (navState) => dispatch(setNavState(navState))
  const {navState} = useSelector(state => state.reducer)

  useEffect(()=> {
    onAuthStateChanged(auth, async (user) => {
      if(user){
        const response = await getCurrentUsersBusinesses()
        if(response.status){
          setNavStateAction({
            screen: "home",
            payload: response.data
          })
        }
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

  const styles = StyleSheet.create({
      container: {
        height:"100%",
        width:"100%",
        flexDirection: "column",
        backgroundColor: '#232323',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        padding: 30,
        paddingTop: 0
      },
      header:{
        flex:.25
      },
      header1:{
        color:"#FFC600",
        fontSize: 60,
        shadowColor: "black",
        shadowOffset: {width: .7, height: .7},
        shadowOpacity: .8,
        shadowRadius: 1,
        fontFamily: "Arial Rounded MT Bold"
      },
      header2: {
        color:"#FEFEFE",
        fontSize:20,
        shadowColor: "black",
        shadowOffset: {width: .5, height: .5},
        shadowOpacity: .85,
        shadowRadius: 1,
        fontFamily: "Arial Rounded MT Bold",
        paddingLeft: 5
      },
      inputArea: {
        flex:1,
        width:"100%",
        flexDirection: "column",
        alignItems: 'flex-start',
        justifyContent: 'center',
      },
      buttonsArea: {
        flex:.35,
        alignSelf:"center",
        flexDirection:"column",
        justifyContent:"center"
      },
      switchButton: {
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#797979",
        padding: 10,
        borderRadius:5,
        shadowColor: "#0B0B0B",
        shadowOffset: {width: 1, height: 1},
        shadowOpacity : .5,
        shadowRadius:3
      },
      switchButtonText: {
        color:"#FFC600",
        fontSize:12,
        fontFamily: "Arial Rounded MT Bold",
      },
      submitButton: {
        margin: 10,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:"#797979",
        padding: 10,
        borderRadius:5,
        shadowColor: "#0B0B0B",
        shadowOffset: {width: 1, height: 1},
        shadowOpacity : .5,
        shadowRadius:3
      },
      submitButtontext: {
        color:"#FFC600",
        fontSize:20,
        fontFamily: "Arial Rounded MT Bold",
      }
    });

    if(header.method === "signup"){
      return (
        <View style={styles.container}>

            <View style={styles.header}>
              <Text style={styles.header1}>{header.header1}</Text>
              <Text style={styles.header2}>{header.header2}</Text>
            </View>

            <View style={styles.inputArea}>
              <StartTextInput
              onChangeText={setFirstName}
              value={firstName}
              placeholder={"First Name"}
              onFocus={()=>{setFirstNameFocused(true)}}
              onBlur={()=>{setFirstNameFocused(false)}}
              focused={firstNameFocused}
              animation={firstNameAnim}/>

              <StartTextInput 
              onChangeText = {setLastName}
              value = {lastName}
              placeholder = "Last Name"
              onFocus={()=>setLastNameFocused(true)}
              onBlur={()=>setLastNameFocused(false)}
              focused={lastNameFocused}
              animation={lastNameAnim}/>

              <StartTextInput 
              onChangeText = {setEmail}
              value = {email}
              placeholder = "Email"
              onFocus={()=>setEmailFocused(true)}
              onBlur={()=>setEmailFocused(false)}
              focused={emailFocused}
              animation={emailAnim}/>

              <StartTextInput
              onChangeText = {setPassword}
              secureTextEntry={true}
              value = {password}
              placeholder = "Password"
              onFocus={()=>setPasswordFocused(true)}
              onBlur={()=>setPasswordFocused(false)}
              focused={passwordFocused}
              animation={passwordAnim}/>
            </View>

            <View style={styles.buttonsArea}>
              <TouchableOpacity
              style = {styles.submitButton}
              onPress = {()=>{signup(email, password, firstName, lastName)}}>
                <Text style={styles.submitButtontext}>Enter</Text>
              </TouchableOpacity>

              <TouchableOpacity
              style = {styles.switchButton}
              onPress = {toggleMethod}>
                <Text style={styles.switchButtonText}>I Already Have An Account.</Text>
              </TouchableOpacity>
            </View>

        </View>
      )
    }else{
      return (
        <View style={styles.container}>            
            <View style={styles.header}>
              <Text style={styles.header1}>{header.header1}</Text>
              <Text style={styles.header2}>{header.header2}</Text>
            </View>
            
            <View style={styles.inputArea}>
              <StartTextInput 
              onChangeText = {setEmail}
              value = {email}
              placeholder = "Email"
              onFocus={()=>setEmailFocused(true)}
              onBlur={()=>setEmailFocused(false)}
              focused={emailFocused}
              animation={emailAnim}/>

              <StartTextInput
              onChangeText = {setPassword}
              secureTextEntry={true}
              value = {password}
              placeholder = "Password"
              onFocus={()=>setPasswordFocused(true)}
              onBlur={()=>setPasswordFocused(false)}
              focused={passwordFocused}
              animation={passwordAnim}/>
            </View>
            <View style={styles.buttonsArea}>
              <TouchableOpacity
              style = {styles.submitButton}
              onPress = {()=>{login(email, password)}}>
                <Text  style={styles.submitButtontext}>Enter</Text>
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
