import { StyleSheet } from "react-native"

const colors = {
    blue: "#8CBBF1",
    yellow: "#FDEDCB",
    pink: "#F9CEDF",
    lightGrey: "#e6e6e6",
    grey: "#999999",
    darkGrey: "#6e6e6e",
    background: {
        dark: "grey",
        light: "white"
    },
    input:{
        dark: ""
    }
}

const fonts = {
    medium: "Quicksand-Medium",
    bold: "Quicksand-Bold",
    extraBold: "Quicksand-Bold",
    regular: "Quicksand-Regular",
    semiBold: "Quicksand-Semibold",
    light: "Quicksand-Light",
    extraLight: "Quicksand-Light"
}

const shadow = {
    shadowColor:"grey",
    shadowOffset:{width: .7, height: .7},
    shadowOpacity:.9,
    shadowRadius:.6
}

const styles = new StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        width: "100%"
    },
    title:{
        fontFamily:fonts.extraBold,
        color: colors.darkGrey,
        fontSize: 30,
        margin: 10
    },
    businessCardHeader:{
        fontFamily: fonts.semiBold,
        fontSize: 15,
        color: colors.darkGrey
    },
    businessScreen:{
        flex: 1,
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    businessOptions: {
        marginTop: 30,
        flex: .9,
        width:"100%",
        flexDirection: "column",
        justifyContent:"space-around",
        alignItems: "center"
    },
    businessOption:{
        padding: 20,
        margin: 40, 
        backgroundColor: colors.lightGrey,
        width: "80%",
        borderRadius: 10
    },
    businessOptionsTitle:{
        color: colors.darkGrey,
        fontFamily: fonts.semiBold,
        fontSize: 22
    },
    businessOptionsDetails:{
        marginTop: 10,
        color: colors.grey,
        fontFamily: fonts.regular,
        fontSize: 12
    },
    homeScreen: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start"
    },
    homeScreenBusinesses: {
        flexDirection: "column",
        marginLeft: 5,
        marginRight: 15,
        borderRadius: 10,
    },
    homeScreenBusinessesArea:{
        flex: .3,
        width: "90%",
        marginLeft: 30,
        marginRight: 20,
    },
    businessCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"flex-start",
        width:"100%",
        backgroundColor: colors.lightGrey,
        marginTop: 10,
        padding: 15,
        borderRadius: 10
    },
    menuItemCard: {
        
    },
    scrollView: {
        justifyContent: "flex-start",
        alignItems: "center"
    },
    inventoryItemCard: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "80%",
        margin: 10,
        padding: 10,
        backgroundColor: colors.lightGrey,
        borderRadius: 10
    },
    cardName: {
        fontFamily: fonts.semiBold,
        color: colors.darkGrey
    },
    cardAmount: {
        fontFamily: fonts.regular,
        color: colors.darkGrey
    },
    cardUnit: {
        fontFamily: fonts.light,
        color: colors.darkGrey
    },
    startScreen: {
        flex: 1,
        flexDirection: "column",
        alignItems: "center",
        width: "100%"
    },
    startScreenLogo: {
        marginTop: 20,
        width: 150,
        height: 100,
        objectFit: "fill"
    },
    menuItemsList: {
        flex: .9
    },
    inventortyItemsList: {
        flex: .9
    },
    header:{
        width: "80%",
        marginLeft: 40,
        marginTop: 35,
    },
    header1:{
        fontFamily:fonts.extraBold,
        color: colors.blue,
        fontSize: 40,
    },
    header2: {
        fontFamily:fonts.regular,
        color: colors.blue,
        fontSize: 15,
    },
    item: {
        width:"98%",
        marginTop: 20,
        marginBottom: 20,
        flex: .2
    },
    user: {
        backgroundColor: colors.lightGrey
    },
    bottomTab: {
        marginTop: 20,
    },
    bottomTabText: {
        fontFamily: fonts.semiBold,
        fontSize: 18,
        color: "white"
    },
    bottomBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-start",
        backgroundColor: colors.blue,
        flex: 1,
        shadowColor: colors.grey,
        shadowOffset: { height: -.75},
        shadowOpacity: .4,
        shadowRadius: 3
    },
    navigationView: {
        flex: 1
    },
    scrollViewContainer:{
        flexDirection: "column",
        justifyContent: "flex-end"
    },
    scrollViewContent: {
        flex:  1
    },
    inputArea: {
        width: "80%",
        flex: .8,
        margin: 30,
        justifyContent: "center"
    },
    inputField: {
        borderRadius: 7,
        padding: 15,
        margin: 27.5,
        shadowOffset: {width:.5, height:.5},
    },
    inputFieldContainer: {
        flexDirection: "column",
        alignContent: "space-around",
        justifyContent:"center",
    },
    inputFieldText:{
        color: colors.darkGrey,
        fontFamily: fonts.light,
    },
    inputFieldMove:{
        position:"absolute",
        zIndex:-1,
    },
    inputFieldUsed: {
        position: "absolute",
        top: -20,
        left: 5,
    },
    buttonsArea: {
        flex:.15,
        alignItems: "center",
        justifyContent: "space-between"
    },
    resetPassword: {
        fontFamily: fonts.extraLight,
        color: colors.darkGrey,
        textAlign: "center"
    },
    switchButton: {

    },
    switchButtonText: {
        fontFamily: fonts.regular,
        fontSize: 15,
        color: colors.blue,
        paddingTop: 50
    },
    submitButton: {
        borderRadius: 10,
        backgroundColor: colors.lightGrey,
    },
    submitButtontext: {
        fontFamily: fonts.extraBold,
        fontWeight: "bold",
        fontSize: 15,
        padding: 17.5,
        color: colors.blue
    },
    formButton: {
        padding: 10,
        margin: 10,
        borderRadius: 10
    },
    formButtonText: {
        textAlign: "center",
        fontFamily: fonts.semiBold,
        color: colors.blue,
        fontSize:14
    },
    inventoryScreen: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column"
    },
    menuItemsScreen: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
    }
})

//NEXT TRY AND FIGURE OUT THE CUSTOM FONTS

export default styles


