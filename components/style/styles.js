import { StyleSheet } from "react-native"

const colors = {
    blue: "#8CBBF1",
    yellow: "#FDEDCB",
    pink: "#F9CEDF",
    lighterGrey: "#e8e8e8",
    lightGrey: "#e3e3e3",
    grey: "#dedede",
    darkGrey: "#6e6e6e",
    darkerGrey: "#4d4d4d",
    darkestGrey: "#404040",
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
        color: colors.darkerGrey,
        fontSize: 30,
        margin: 10,
        marginTop: 20
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
        color: colors.darkerGrey,
        fontFamily: fonts.semiBold,
        fontSize: 22
    },
    businessOptionsDetails:{
        marginTop: 10,
        color: colors.darkGrey,
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
        flex: .95,
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
    scrollView: {
        justifyContent: "flex-start",
        alignItems: "center",
        width: "100%"
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
    menuItemCard: {
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
        fontSize: 19,
        fontFamily: fonts.semiBold,
        color: colors.darkGrey
    },
    cardAmount: {
        fontSize: 17,
        fontFamily: fonts.regular,
        color: colors.darkGrey
    },
    cardUnit: {
        fontSize: 17,
        fontFamily: fonts.light,
        color: colors.darkGrey
    },
    priceAmount: {
        fontSize: 17,
        fontFamily: fonts.regular,
        color: colors.darkGrey
    },
    priceLabel: {
        fontSize: 17,
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
        shadowOpacity: .6,
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
        flex: .70,
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
        width:"100%"
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
        margin: 15,
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
    },
    menuItemDetails:{
        flex:  1,
        justifyContent: "flex-start",
        alignItems: "center"
    },
    menuItemDetailsHeader:{
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        flex: .15
    },
    menuItemIngredients: {
        padding: 10,
        margin: 10,
        width: "80%",
        backgroundColor: colors.lighterGrey,
        justifyContent: "flex-start",
        alignItems: "center",
        flex: .8,
        borderRadius: 10,
    },
    priceAmountHeader: {
        fontSize: 21,
        fontFamily: fonts.regular,
        color: colors.darkGrey
    },
    priceLabelHeader: {
        fontSize: 21,
        fontFamily: fonts.light,
        color: colors.darkGrey
    },
    ingredientCard: {
        width: "90%",
        marginTop: 10,
        marginBottom: 10,
        padding: 10,
        borderRadius: 10,
        flexDirection: "column",
        backgroundColor: colors.grey
    },
    ingredientsTitle:{
        margin: 5,
        fontFamily: fonts.extraBold,
        fontSize: 20,
        color: colors.darkerGrey
    },
    ingredientInfo: {
        margin: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    }, 
    ingredientActions: {
        backgroundColor: colors.grey,
        margin: 10,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    deleteImage: {
        margin: 5,
        width: 20,
        height: 20
    },
    adjustButton: {
        justifyContent: "center",
        alignItems: "center"
    },
    adjustButtontext: {
        fontFamily: fonts.medium,
        color: colors.blue,
        textAlign: "center"
    },
    businessForm: {
        flex: 1
    },
    containerNoFlex:{
        width: "100%",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center"
    },
    inventoryItemForm: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
    },
    dropDownContainer: {
        flex:.5,
        marginLeft: 10, 
        marginRight: 10,
        color: colors.darkGrey,
        fontFamily: fonts.medium
      },
    dropDownStyle: {
        backgroundColor: colors.lightGrey,
        borderColor: colors.lightGrey
,        color: colors.darkGrey,
        fontFamily: fonts.medium
      },
      dropDownLabelStyle: {
        color: colors.darkGrey,
        fontFamily: fonts.medium,
        backgroundColor: colors.lightGrey,
        borderColor: colors.lightGrey
      },
      dropDownItemStyle: {
        justifyContent: 'flex-start',
        color: colors.darkGrey,
        fontFamily: fonts.medium,
        backgroundColor: colors.lightGrey,
        borderColor: colors.lightGrey
      },
      dropDownItemSelectedStyle: {
        backgroundColor: '#ddd',
        color: colors.darkGrey,
        fontFamily: fonts.medium,
        backgroundColor: colors.lightGrey,
        borderColor:"white"
      },
      quantityFormSubmitText: {
        fontFamily: fonts.semiBold,
        color: colors.darkestGrey,
        textAlign: "center"
      },
      quantityFormSubmit: {
        flex: .2
      },
      quantityFormInput: {
        flex: .4,
        backgroundColor: colors.lightGrey,
        borderRadius: 10,
        padding: 5,
        marginLeft: 10,
        marginRight: 10,
      },
      quantityFormInputArea: {
        flex: .6,
        flexDirection: "row",
        justifyContent: "space-between"
      },
      quantityForm: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        margin: 10,
        padding: 10
      },
      quantityFormLabelText: {
        fontFamily: fonts.medium,
        color: colors.darkestGrey,
        textAlign: "center"
      },
      quantityFormLabelView: {
        flex: .2,
        justifyContent: "center",
        alignItems: "center"
      },
      dropDownView: {
        alignItems: "center",
        justifyContent:"center"
      }
})

export default styles


