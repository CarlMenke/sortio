import { StyleSheet } from "react-native"
const YELLOW = "#FDEDCB"
const GREY = "#D7DDE9"
const BLUE = "#8CBBF1"
const PINK = "#F9CEDF"

const styles = new StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around",
    },
    column: {
        flex: 1,
        flexDirectrion: "column"
    },
    item: {
        flex: 1,
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
    scrollView: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-around"
    },
    inputArea: {
    },
    inputField: {
        borderRadius: 7,
        padding: 15,
        margin: 10,
        shadowOffset: {width:.5, height:.5},
    },
    inputFieldContainer: {
        flexDirection: "column",
        alignContent: "space-around",
        justifyContent:"center"
    },
    textInput:{
    },
    inputFieldText:{
        color: "grey"
    },
    inputFieldMove:{
        position:"absolute",
        zIndex:-1,
    },
    inputFieldUsed: {
        position: "absolute",
        top: -20,
        left: 5
    }
})

export default styles


