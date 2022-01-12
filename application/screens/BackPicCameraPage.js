// DONE!!

// commenting this page out so Google store submission (since it's asking for camera and audio permission) 11/7/2020


import React, { useState, useRef, useEffect } from "react";
import { StyleSheet, Dimensions, View, Text, TouchableOpacity, SafeAreaView, Image, Alert } from "react-native";
import { Camera } from "expo-camera";
// import { Video } from "expo-av";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';
// import * as FaceDetector from 'expo-face-detector';
import uuid from '../utils/uuid';
import Svg, { Path } from 'react-native-svg';
import * as ImageManipulator from 'expo-image-manipulator';

import { useNavigation } from 'react-navigation-hooks';

// import CameraScreen from '../components/Camera';

// import * as tf from '@tensorflow/tfjs';

// import * as mobilenet from '@tensorflow-models/mobilenet';
// import { fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';





const WINDOW_HEIGHT = Dimensions.get("window").height;
const closeButtonSize = Math.floor(WINDOW_HEIGHT * 0.032);
const captureSize = Math.floor(WINDOW_HEIGHT * 0.09);


export default function BackPicCameraPage() {
    const { navigate } = useNavigation();


    const NavigateToScreen = () => {
        navigate("HomeScreen");
    };


    const CompleteAlert = () =>
        Alert.alert(
            "Completed!",
            "Go to \"Progress Pics\" from Side Menu to view your pictures",
            [
                {
                    text: "OK",
                    onPress: () => NavigateToScreen()
                }
            ],
            { cancelable: false }
        );


    const [hasPermission, setHasPermission] = useState(null);
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const [isPreview, setIsPreview] = useState(false);
    const [isCameraReady, setIsCameraReady] = useState(false);
    // const [isVideoRecording, setIsVideoRecording] = useState(false);
    // const [videoSource, setVideoSource] = useState(null);
    const [focusType, setFocusType] = useState(Camera.Constants.AutoFocus.on);
    const [faceDetect, setFaceDetect] = useState()
    const [rollPermision, setRollPermission] = useState(null);
    const cameraRef = useRef();

    const [imageResult, setImageResult] = useState(null);
    const [compressedImage, setCompressedImage] = useState(null);
    const [uncompressedImage, setUncompressedImage] = useState(null);
    const [image, setImage] = useState(null);
    const [wasPressed, setWasPressed] = useState(false);


    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === "granted");
            // camera roll
            const { cam_roll } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            setRollPermission(cam_roll === "granted");
            setRollPermission(true);

            setImage(image);
        }
        )();
    }, []);

    const onCameraReady = () => {
        setIsCameraReady(true);
    };

    const takePicture = async () => {
        if (cameraRef.current) {
            const options = { quality: 1, base64: true, skipProcessing: true };
            const result = await cameraRef.current.takePictureAsync(options);

            // compress image
            const manipResult = await ImageManipulator.manipulateAsync(
                result.uri,
                [],
                { compress: 0.3, format: ImageManipulator.SaveFormat.JPEG }
            );
            setCompressedImage(manipResult.uri);

            // for the image preview
            await cameraRef.current.pausePreview();
            setIsPreview(true);
        }
    };

    //compression image
    // const compressimagestuff = async () => {
    //   // let compressedImageUrl = await takePicture(compressedImage);
    //   const manipResult = ImageManipulator.manipulateAsync(
    //     imageResult.uri,
    //     [],
    //     { compress: 0.3, format: ImageManipulator.SaveFormat.JPEG }
    //     );
    //     setCompressedImage(manipResult.uri);
    //     // return manipResult.url;
    //   };


    // uploading it to firebase
    const uploadImageAsync = async (ToTheCloud) => {
        // let compressedImageUrl = await compressimagestuff(compressedImage);
        var user = firebase.auth().currentUser.uid;

        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', ToTheCloud, true);
            xhr.send(null);

        });

        const ref = firebase
            .storage()
            // the file that it will get saved to
            // .ref('Front/')
            .ref(user + '/BackPic/')

            // giving it a unique name
            .child(await uuid.v4())
        
        const snapshot = await ref.put(blob);
        blob.close();
        return await snapshot.ref.getDownloadURL();
    };

    const switchCamera = () => {
        if (isPreview) {
            return;
        }
        setCameraType((prevCameraType) =>
            prevCameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
        );
    };
    const cancelPreview = async () => {
        await cameraRef.current.resumePreview();
        setIsPreview(false);
        // setVideoSource(null);
    };



    const renderCancelPreviewButton = () => (
        <TouchableOpacity onPress={cancelPreview} style={styles.closeButton}>
            <Svg
                viewBox="0 0 512 512"
                height={50}
                width={50}
                fill='red'
            >
                <Path d="M464 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h416c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm16 400c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h416c8.8 0 16 7.2 16 16v352zM348.6 188.3L280.9 256l67.7 67.7c4.6 4.6 4.6 12 0 16.6l-8.3 8.3c-4.6 4.6-12 4.6-16.6 0L256 280.9l-67.7 67.7c-4.6 4.6-12 4.6-16.6 0l-8.3-8.3c-4.6-4.6-4.6-12 0-16.6l67.7-67.7-67.7-67.7c-4.6-4.6-4.6-12 0-16.6l8.3-8.3c4.6-4.6 12-4.6 16.6 0l67.7 67.7 67.7-67.7c4.6-4.6 12-4.6 16.6 0l8.3 8.3c4.5 4.6 4.5 12 0 16.6z" />
            </Svg>
            <Text>Retake</Text>
        </TouchableOpacity>
    );

    // upload button 
    const uploadPreviewButton = () => (
        //set setWasPressed back to TRUE
        <TouchableOpacity disabled={wasPressed} onPress={() => { uploadImageAsync(compressedImage); CompleteAlert(); setWasPressed(true); }} style={[styles.uploadButton, wasPressed ? { opacity: 0 } : {}]}>
            <Svg
                viewBox="0 0 512 512"
                height={60}
                width={60}
                fill='green'
            // style={wasPressed ? { fill: 'red' } : {} }
            >
                <Path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z" />
            </Svg>
        </TouchableOpacity>
    );

    // const renderVideoPlayer = () => (
    //   <Video
    //     source={{ uri: videoSource }}
    //     shouldPlay={true}
    //     style={styles.media}
    //   />
    // );
    // const renderVideoRecordIndicator = () => (
    //   <View style={styles.recordIndicatorContainer}>
    //     <View style={styles.recordDot} />
    //     <Text style={styles.recordTitle}>{"Recording..."}</Text>
    //   </View>
    // );
    const renderCaptureControl = () => (
        <View style={styles.control}>
            <TouchableOpacity disabled={!isCameraReady} onPress={switchCamera}>
                <Text style={styles.text}>{"Flip"}</Text>
                <MaterialCommunityIcons
                    name="camera-switch"
                    style={{ color: "#fff", fontSize: 40 }}
                />
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={0.7}
                disabled={!isCameraReady}
                // onLongPress={recordVideo}
                // onPressOut={stopVideoRecording}
                onPress={takePicture}
                style={styles.capture}
            />
        </View>
    );

    if (hasPermission === null || rollPermision === null) {
        return <View />;
    }
    if (hasPermission === false || rollPermision === false) {
        return <Text style={styles.text}>No access to camera</Text>;
    }


    return (
        <SafeAreaView style={styles.container}>
            <Camera
                ref={cameraRef}
                style={styles.container}
                type={cameraType}
                // flashMode={Camera.Constants.FlashMode.on}
                useCamera2Api={true}
                ratio={"16:9"}
                onCameraReady={onCameraReady}
                autoFocus={focusType}
                // onFacesDetected={this.handleFacesDetected}
                // faceDetectorSettings={{
                //     mode: FaceDetector.Constants.Mode.accurate,
                //     detectLandmarks: FaceDetector.Constants.Landmarks.all,
                //     runClassifications: FaceDetector.Constants.Classifications.all,
                //     minDetectionInterval: 100,
                //     tracking: true,
                // }}


                onMountError={(error) => {
                    console.log("cammera error", error);
                }}
            />

            <Image
                style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
                source={require('../../assets/images/back-double-bi.png')}
            />


            <View style={styles.container}>
                {/* {isVideoRecording && renderVideoRecordIndicator()} */}
                {/* {videoSource && renderVideoPlayer()} */}
                {isPreview && renderCancelPreviewButton()}
                {isPreview && uploadPreviewButton()}
                {!isPreview && renderCaptureControl()}
                {/* {!videoSource && !isPreview && renderCaptureControl()} */}
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
    },
    closeButton: {
        position: "absolute",
        top: 35,
        left: 35,
        height: closeButtonSize,
        width: closeButtonSize,
        borderRadius: Math.floor(closeButtonSize / 2),
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#c4c5c4",
        // backgroundColor: "#c4c5c4",
        opacity: 0.7,
        zIndex: 2,
    },
    media: {
        ...StyleSheet.absoluteFillObject,
    },
    closeCross: {
        width: "68%",
        height: 1,
        backgroundColor: "black",
    },
    // upload stuff
    uploadButton: {
        position: "absolute",
        flexDirection: "row",
        bottom: 50,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-around",
        // paddingLeft: 100,
    },
    cancelButton: {
        position: "absolute",
        flexDirection: "row",
        bottom: 38,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-around",
        paddingRight: 100,
    },
    // end of the upload
    control: {
        position: "absolute",
        flexDirection: "row",
        bottom: 38,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    capture: {
        backgroundColor: "#f5f6f5",
        borderRadius: 5,
        height: captureSize,
        width: captureSize,
        borderRadius: Math.floor(captureSize / 2),
        marginHorizontal: 31,
    },
    recordIndicatorContainer: {
        flexDirection: "row",
        position: "absolute",
        top: 25,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        opacity: 0.7,
    },
    recordTitle: {
        fontSize: 14,
        color: "#ffffff",
        textAlign: "center",
    },
    recordDot: {
        borderRadius: 3,
        height: 6,
        width: 6,
        backgroundColor: "#ff0000",
        marginHorizontal: 5,
    },
    text: {
        color: "#fff",
    },
});
