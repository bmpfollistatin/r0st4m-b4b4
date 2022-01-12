import React, { Component, useState } from 'react';
import { Text, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Button, Card, CardItem } from "native-base";
import Modal from 'react-native-modal';

var styles = require('../../assets/files/Styles');
// import {fromBouncinessAndSpeed} from "react-native-web/dist/vendor/react-native/Animated/SpringConfig";
import Timer from "./Timer";

function CustomModal(props) {
    const { modelContents } = props;
    const [isModalVisible, setIsModalVisible] = useState(false);
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const modelContentLists = modelContents.map(modelContent => {
        return (
            <View key={modelContent.id}>
                <Text>{modelContent.modaltitle}</Text>
                <Text>{modelContent.Message}</Text>
                <Text>{modelContent.ButtonOptionOne}</Text>
                <Text>{modelContent.ButtonOptionTwo}</Text>
            </View>
        )
    })

    return (
        <View>
            <Button transparent onPress={this.toggleModal}>
                <Text>Show Modal</Text>
            </Button>
            <Modal
                isVisible={isModalVisible}
                customBackdrop={

                    <TouchableWithoutFeedback onPress={this.toggleModal}>
                        <View style={{ flex: 1, backgroundColor: 'black', opacity: 0.85 }} />
                    </TouchableWithoutFeedback>
                }
            >
                <Card style={styles.modalBorder}>
                    <CardItem header border>
                        <Text>{modelContentLists.modaltitle}</Text>
                        <Text>*** test</Text>
                    </CardItem>

                    <CardItem body>
                        <Text>
                                    //Your text here
                        </Text>
                    </CardItem>

                    <CardItem footer>
                        <Button onPress={this.toggleModal}>
                            {modelContentLists.ButtonOptionOne}
                        </Button>
                        <Button onPress={this.toggleModal}>
                            <Text>click to *** me</Text>
                        </Button>
                    </CardItem>
                </Card>
            </Modal>
        </View>
    )
}

export default CustomModal

// export default class customModal extends Component {
//     state = {
//         isModalVisible: false,
//     };

//     toggleModal = () => {
//         this.setState({ isModalVisible: !this.state.isModalVisible });
//     };

//     render() {
//         const { modelContents } = this.props;
//         const modelContentLists = modelContents.map(modelContent => {
//             return (
//                 <View key={modelContent.id}>
//                     <Text>{modelContent.modaltitle}</Text>
//                     <Text>{modelContent.Message}</Text>
//                     <Text>{modelContent.ButtonOptionOne}</Text>
//                     <Text>{modelContent.ButtonOptionTwo}</Text>
//                 </View>
//             )
//         })
//         return (
//             <View>
//                 <Button transparent onPress={this.toggleModal}>
//                     <Text>Show Modal</Text>
//                 </Button>
//                 <Modal
//                     isVisible={this.state.isModalVisible}
//                     customBackdrop={

//                         <TouchableWithoutFeedback onPress={this.toggleModal}>
//                             <View style={{ flex: 1, backgroundColor: 'black', opacity: 0.85 }} />
//                         </TouchableWithoutFeedback>
//                     }
//                 >
//                     <Card style={styles.modalBorder}>
//                         <CardItem header border>
//                             <Text>{modelContentLists.modaltitle}</Text>
//                             <Text>*** test</Text>
//                         </CardItem>

//                         <CardItem body>
//                             <Text>
//                                     //Your text here
//                             </Text>
//                         </CardItem>

//                         <CardItem footer>
//                             <Button onPress={this.toggleModal}>
//                                 {modelContentLists.ButtonOptionOne}
//                             </Button>
//                             <Button onPress={this.toggleModal}>
//                                 <Text>click to *** me</Text>
//                             </Button>
//                         </CardItem>
//                     </Card>

//                     {/*THIS IS THE OLD WORKING MODAL*/}

//                     {/*<View style={styles.modalBorder}>*/}
//                     {/*    <View style={styles.modalContent}>*/}
//                     {/*        {modelContentLists}*/}
//                     {/*    </View>*/}
//                     {/*    <View style={styles.modalBottom}>*/}
//                     {/*        <TouchableOpacity onPress={this.toggleModal}>*/}
//                     {/*            <CustomButton>*/}
//                     {/*                <Text>{modelContentLists.ButtonOptionOne}</Text>*/}
//                     {/*            </CustomButton>*/}
//                     {/*        </TouchableOpacity>*/}
//                     {/*        <TouchableOpacity onPress={this.toggleModal}>*/}
//                     {/*            <CustomButton>*/}
//                     {/*                <Text>{modelContentLists.ButtonOptionTwo}</Text>*/}
//                     {/*            </CustomButton>*/}
//                     {/*        </TouchableOpacity>*/}
//                     {/*        <Button mode="contained" onPress={this.toggleModal}>*/}
//                     {/*           {modelContentLists.ButtonOptionOne}*/}
//                     {/*        </Button>*/}
//                     {/*    </View>*/}
//                     {/*</View>*/}
//                 </Modal>
//             </View>
//         );
//     }
// }
