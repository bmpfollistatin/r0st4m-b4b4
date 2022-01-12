//DONE!

import React from "react";
import {  StyleSheet, View, Linking} from 'react-native';
import { Container, Text, Button } from "native-base";
import PageHeader from '../components/PageHeader';
import Svg, { Path } from "react-native-svg"



export default function Feedback(props) {
   


    return (
        <Container style={styles.background_general}>
            <PageHeader
                SVG='rightSideSVG'
                // rightSideSVG={info}
                Title='Send Feedback'
            >
            </PageHeader>

            

                <View style={{ alignItems: 'center' }}>
                    

                    {/* <Text style={styles.PageText}> Thank you for taking the time to give me your feedback. You have no idea how much it means to me!{"\n"}</Text> */}
                    <Text style={[styles.PageText, {fontFamily: 'ssb_Bold', paddingTop: 30}]}> All feedbacks are welcomed!{"\n"}</Text>
                    
                    <View style={ [ {justifyContent: 'center'}, styles.instructionBox1 ] }>

                        {/* <Text style={styles.PageText}> {'\u2022'} You can use Messenger or Email to reachout.</Text> */}
                        <Text style={styles.PageText}> {'\u2022'} Messenger is easier and more organized.</Text>
                        <Text style={styles.PageText}> {'\u2022'} If you have any visual feedback please include a screenshot.</Text>
                        
                    </View>
                </View>

            <View style={styles.SideBySide}>
                <Button
                        style={{
                            backgroundColor: '#006AFF', paddingLeft: 10 }}
                        onPress={() => Linking.openURL('https://m.me/SculpApp') }
                >
                    <Svg
                        aria-hidden="true"
                        data-prefix="fab"
                        data-icon="facebook-messenger"
                        viewBox="0 0 512 512"
                        height={24}
                        width={24}
                        
                    >
                        <Path
                            fill="white"
                            d="M256.55 8C116.52 8 8 110.34 8 248.57c0 72.3 29.71 134.78 78.07 177.94 8.35 7.51 6.63 11.86 8.05 58.23A19.92 19.92 0 00122 502.31c52.91-23.3 53.59-25.14 62.56-22.7C337.85 521.8 504 423.7 504 248.57 504 110.34 396.59 8 256.55 8zm149.24 185.13l-73 115.57a37.37 37.37 0 01-53.91 9.93l-58.08-43.47a15 15 0 00-18 0l-78.37 59.44c-10.46 7.93-24.16-4.6-17.11-15.67l73-115.57a37.36 37.36 0 0153.91-9.93l58.06 43.46a15 15 0 0018 0l78.41-59.38c10.44-7.98 24.14 4.54 17.09 15.62z"
                        />
                    </Svg>
                    <Text style={{ color: 'white' }}>Messenger</Text>
                </Button>



                <Button
                        style={{ backgroundColor: '#DE911D', paddingLeft: 20 }}
                        onPress={() => Linking.openURL('mailto: info@skulpt.ai')}
                >
                    <Svg
                        aria-hidden="true"
                        data-prefix="far"
                        data-icon="envelope"
                        className="prefix__svg-inline--fa prefix__fa-envelope prefix__fa-w-16"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        height={24}
                        width={24}
                    >
                        <Path
                            fill="white"
                            d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"
                        />
                    </Svg>
                    <Text style={{ color: 'white' }}>Email     </Text>
                    </Button>
                    
                    

                {/* </View> */}
                

                
            </View>

            

        </Container >
    )
}

const styles = StyleSheet.create({
    background: {
        backgroundColor: '#fbfcfc'
    },
    PageText: {
        paddingLeft: 3,
        // width: 350,
        marginHorizontal: 10,
        marginRight: 30,
        fontSize: 16,
        lineHeight: (16*1.3)
    },
    SideBySide: {
        flexDirection: 'row',
        padding: 20,
        justifyContent: 'space-between'
    },
    instructionBox1: {
        // width: 303,
        height: 75,
        borderColor: '#FF0000',
        // borderWidth: 1,
        justifyContent: 'center',
        borderStyle: 'solid',
        marginTop: 30,
        marginBottom: 20,
        borderLeftWidth: 3,
      }
})
