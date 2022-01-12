import { Text } from "native-base";
import React, { useEffect, useState } from 'react';
import { Image, ScrollView, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import PageHeader from '../../components/PageHeader';
var styles = require('../../../assets/files/Styles');

export default function ProgressPictures(props) {
    const tmpSvg = () => (
        <Svg
            viewBox="0 0 640 512"
            height={24}
            width={24}
            fill='#7b8794'
        >
            <Path d="M632 240h-24v-96c0-26.5-21.5-48-48-48h-32c-5.6 0-11 1.2-16 2.9V80c0-26.5-21.5-48-48-48h-32c-26.5 0-48 21.5-48
                        48v160H256V80c0-26.5-21.5-48-48-48h-32c-26.5 0-48 21.5-48 48v18.9c-5-1.8-10.4-2.9-16-2.9H80c-26.5 0-48 21.5-48 48v96H8c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8h24v96c0 26.5 21.5 48 48 48h32c5.6 0 11-1.2 16-2.9V432c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V272h128v160c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48v-18.9c5 1.8 10.4 2.9 16 2.9h32c26.5 0 48-21.5 48-48v-96h24c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zM112 384H80c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v224c0 8.8-7.2 16-16 16zm112 48c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v352zm256 0c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v352zm96-64c0 8.8-7.2 16-16 16h-32c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v224z" />
        </Svg >
    )
    
    const [frontImage, setFrontImage] = useState();
    const [backImage, setBackImage] = useState();
    const [backDate, setBackDate] = useState();
    console.log({props})

    const navigate = (route) => {
        props.navigation.navigate(route)
    }
    // const { navigate } = useNavigation();

    // const user = firebase.auth().currentUser.uid;

    const getFrontImage = async () => {
        // const imageRefs = await firebase.storage().ref().child(user + '/FrontPic/').listAll();
        // const results = await Promise.all(imageRefs.items.map(async (ref) => {
        //     return {
        //         downloadUrl: await ref.getDownloadURL(),
        //         metadata: await ref.getMetadata()
        //     }
        // }));
        // const sortedResults = results.sort((a, b) => {
        //     return (new Date(a.metadata.timeCreated) - new Date(b.metadata.timeCreated))
        // })

        // const urls = sortedResults.map(result => {
        //     return result.downloadUrl;
        // })
        // setFrontImage(urls);
    }

    const getBackImage = async () => {
        // const imageRefs = await firebase.storage().ref().child(user + '/BackPic/').listAll();
        // const results = await Promise.all(imageRefs.items.map(async (ref) => {
        //     return {
        //         downloadUrl: await ref.getDownloadURL(),
        //         metadata: await ref.getMetadata()
        //     }
        // }));
        // const sortedResults = results.sort((a, b) => {
        //     return (new Date(a.metadata.timeCreated) - new Date(b.metadata.timeCreated))
        // })

        // const urls = sortedResults.map(result => {
        //     return result.downloadUrl;
        // })

        // setBackImage(urls);
    }

    useEffect(() => {
        getFrontImage();
        getBackImage();
    }, []);

    return (
        <ScrollView>
            <View>
                <PageHeader
                    NavigationProp="IntervalTimer"
                    SVG={tmpSvg}
                    Title='Checkin Pictures'
                    LeftSideIcon={navigate('Home')}
                >
                </PageHeader>

                <View style={[styles.SideBySide, { paddingVertical: 5 }]}>

                    <View style={styles.DisplayImageWith}>
                        {frontImage && frontImage.map((url, index) => (
                            <View style={{ flexDirection: 'row', padding: 1 }}>
                                <Text style={{ paddingRight: 5, alignSelf: 'center', fontSize: 20, color: '#B1B1B1', maxWidth: 25 }}>{index + 1}</Text>
                                {/* {console.log(url)} */}
                                <View style={{ justifyContent: 'center' }} key={url}>
                                    <Image source={{ uri: url }} style={{ width: 150, height: 150 }} />
                                </View>
                            </View>
                        ))}
                    </View>

                    <View style={styles.DisplayImageWith}>
                        {backImage && backImage.map((url, index) => (
                            <View style={{ flexDirection: 'row', padding: 1 }}>

                                <View style={{ justifyContent: 'center' }} key={url}>
                                    <Image source={{ uri: url }} style={{ width: 150, height: 150 }} />
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView>

    );
}

