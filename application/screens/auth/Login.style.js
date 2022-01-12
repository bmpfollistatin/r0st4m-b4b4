import { StyleSheet , Dimensions} from "react-native";
const w = Dimensions.get('screen').width
export const Lstyle = StyleSheet.create({
    emailAuth_email: { width: '100%', fontSize: 20, backgroundColor: '#fff', height: 49, borderRadius: 10, borderWidth: 1, borderColor: '#F5F7F675', paddingLeft: 10, paddingRight: 10 },
    emailAuth_password: { width: '100%', fontSize: 20, backgroundColor: '#fff', height: 49, borderRadius: 10, borderWidth: 1, borderColor: '#F5F7F675', paddingLeft: 10, paddingRight: 10  },
    emailAuth_password_container: { width: '100%', fontSize: 20, marginTop: 10 },
    step_container: { height: 400, display: 'flex', alignItems: 'center', borderTopRightRadius: 15, borderTopLeftRadius: 15 },
    step1_subcontainer: { width: 0.8 * w, display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'transparent', marginTop: 20, marginLeft: 20, marginRight: 20 },
    imageBackground: { width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }
})