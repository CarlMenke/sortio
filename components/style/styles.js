import { StyleSheet } from "react-native"

const YELLOW = "#FDEDCB"
const GREY = "#D7DDE9"
const BLUE = "#8CBBF1"
const PINK = "#F9CEDF"

const styles = new StyleSheet.create({
    container: {
        flex: .7,
        flexDirection: "column",
        justifyContent: "space-around"
    },
    column: {
        flex: 1,
        flexDirectrion: "column"
    },
    item: {
        flex: 1,
        backgroundColor: "#FDEDCB"
    },
    secondBorder: {
        borderWidth:1,
        borderColor:"white",
        width:"100%",
        borderRadius: 3,
      },
    thirdBorderFocused:{
        marginTop:.5,
        opacity: 1,
        borderWidth : 1,
        borderColor:"#FFC600",
        width:"100%",
        borderRadius: 3
      },
    thirdBorderNotFocused: {
        marginTop: .5,
        opacity: 1,
        borderWidth : 0,
        borderColor:"#FFC600",
        width:"100%",
        borderRadius: 3
    },
    input:{
        color:"black",
        fontSize:20,
        fontFamily: "Arial Rounded MT Bold",
        paddingBottom: 6.5
    },
    item : {
        width:"98%",
        marginTop: 20,
        marginBottom:20,
        flex: .2
    },
    user: {
        backgroundColor:"grey "
    },
    bottomTab:{
        marginBottom: 10
    },
    
    
})

export default styles


