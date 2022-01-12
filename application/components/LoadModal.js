import React, { useState } from 'react';
import Modal from 'react-native-modal';
import { TouchableOpacity } from 'react-native';


/**
 * Takes in WrappedComponent as a prop. This is what you want to display in the modal.
 * The button to press and show the modal is passed as a child element.
 * @param {*} props 
 */
export default function LoadModal(props) {

    const { WrappedComponent, children } = props;
    const [visible, setVisible] = useState(false);


    const handlePress = (item) => {
        const wrappedProps = WrappedComponent.props;
        if (!!wrappedProps && !!wrappedProps.setSelected) {
            wrappedProps.setSelected(item);
        }
        setVisible(false);
    }

    return (
        <>
            <TouchableOpacity activeOpacity={1}>
                {React.cloneElement(children, { onPress: () => setVisible(true) })}
            </TouchableOpacity>
            <Modal
                isVisible={visible}
                onBackdropPress={() => setVisible(false)}
                style={{ maxHeight: 650, borderColor: '#hsl(44, 65%, 51%)', borderWidth: 2, marginTop: 100 }}
            >
                {/* For ListAndSearch__ screens we have a setSelected property.
                    Overwrite it to add changing modal visibility. */}
                {React.cloneElement(WrappedComponent, { setSelected: handlePress })}
            </Modal>
        </>
    )
}