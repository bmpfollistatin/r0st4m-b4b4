import { Timer } from 'interval-timer';
import { Button, Container, Content, Text } from "native-base";
import React, { useEffect } from 'react';
var styles = require('../../assets/files/Styles');

export default function TimerOnFunction (props) {
    const [minutesInput, setMinutesInput] = React.useState('00');
    const [secondsInput, setSecondsInput] = React.useState('00');
    const [numberOfSets, setNumberOfSets] = React.useState('00');
    const [restMinuteInput, setRestMinuteInput] = React.useState('00');
    const [restSecondsInput, setRestSecondsInput] = React.useState('00');


    useEffect( () => {
        startClickTimer()

        const optionsActive = {
            startTime: parseInt(minutesInput) * 60 * 1000 + parseInt(secondsInput) * 1000, //how long the timer will be set to
            updateFrequency: 100,
            selfAdjust: true,
            countdown: true,
        };
        const optionsRest = {
            startTime: parseInt(restMinuteInput) * 60 * 1000 + parseInt(restSecondsInput) * 1000, //how long the timer will be set to
            updateFrequency: 100,
            selfAdjust: true,
            countdown: true,
        };

        const timer = new Timer(optionsActive);

        timer.reset(active ? optionsRest : optionsActive);

        timer.start()

    })


    // React.useEffect(() => {
    //     localStorage.setItem('minutesInputStored', minutesInput);
    // }, [minutesInput]);
    //
    // React.useEffect(() => {
    //     localStorage.setItem('secondsInputStored', secondsInput);
    // }, [secondsInput]);
    //
    // React.useEffect(() => {
    //     localStorage.setItem('numberOfSetsStored', numberOfSets);
    // }, [numberOfSets]);
    //
    // React.useEffect(() => {
    //     localStorage.setItem('restMinuteInputStored', restMinuteInput);
    // }, [restMinuteInput]);
    //
    // React.useEffect(() => {
    //     localStorage.setItem('restSecondsInputStored', restSecondsInput);
    // }, [restSecondsInput]);

    // This is the plus and minus button
    const handleAddMinutes = () => {
        if (minutesInput > 0)
            setMinutesInput(minutesInput + 1)
    }

// const options = {
//     startTime: 10,
//     endTime: 0,
//     updateFrequency: 100,
//     selfAdjust: true,
//     countdown: false,
//     animationFrame: false,
// }
//
// const timer = new Timer(options)


return (

    <Container>
        <Content>
            <Text>{Timer}</Text>
            <Button onPress={timer}></Button>

            {/*play button*/}

            <TouchableOpacity
                style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                }}
                onPress={() => {
                    startClickTimer();
                }}
            >
                <FontAwesome
                    name="play-circle"
                    style={{color: "#45B68D", fontSize: 85}}
                />
            </TouchableOpacity>



        </Content>
    </Container>
)
}
