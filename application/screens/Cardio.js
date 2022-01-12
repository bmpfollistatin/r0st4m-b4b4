import { Container, Tab, Tabs, Text } from "native-base";
import React from "react";
import { ScrollView, TouchableOpacity } from 'react-native';
import Svg, { Path } from "react-native-svg";
import CardioListingLogging from "../components/CardioListingLogging";
import HistoryOfCardio from '../components/HistoryOfCardio';
import PageHeader from '../components/PageHeader';
var styles = require('../../assets/files/Styles');

export default function Cardio(props) {
    // const { navigate } = useNavigation();
    const navigate = (route) => {
        props.navigation.navigate(route)
    }

    const info =
        <TouchableOpacity onPress={() => navigate("CreateCardio")}>
            <Svg
                viewBox="0 0 384 512"
                height={17}
                width={17}
                fill='#7b8794'
                style={{ alignSelf: 'center' }}

            >
                <Path d="M376 232H216V72c0-4.42-3.58-8-8-8h-32c-4.42 0-8 3.58-8 8v160H8c-4.42 0-8 3.58-8 8v32c0 4.42 3.58 8 8 8h160v160c0 4.42 3.58 8 8 8h32c4.42 0 8-3.58 8-8V280h160c4.42 0 8-3.58 8-8v-32c0-4.42-3.58-8-8-8z" />
            </Svg >
            <Text style={{ fontSize: 10, color: '#7b8794' }}>Create Cardio</Text>
        </TouchableOpacity >

    return (
        <Container style={styles.background_general}>
            <PageHeader
                SVG='rightSideSVG'
                rightSideSVG={info}
                Title=''
            >
            </PageHeader>

            <ScrollView>
                <Tabs tabBarUnderlineStyle={{ backgroundColor: '#DE911D', height: 2 }}
                    locked={true}
                >
                    <Tab heading="Cardio"
                        tabStyle={[{ backgroundColor: '#f8f8f8' }]}
                        textStyle={{ color: '#7E7E7E' }}
                        activeTextStyle={{ color: '#DE911D' }}
                    >
                        <CardioListingLogging />
                    </Tab>

                    <Tab heading="Cardio History"
                        tabStyle={[{ backgroundColor: '#f8f8f8' }]}
                        textStyle={{ color: '#7E7E7E' }}
                        activeTextStyle={{ color: '#DE911D' }}
                    >
                        <HistoryOfCardio />
                    </Tab>

                </Tabs>
            </ScrollView>
        </Container >
    )
}
