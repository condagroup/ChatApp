import { Box, Text, Icon, Input, IconButton } from "native-base";
import React, { useState, useContext } from "react";
import Firebase from "../../config/firebase";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from "../../context/AuthContext";
import firebase from "firebase/compat";
import { collection, addDoc,FieldValue, serverTimestamp, Timestamp } from "@firebase/firestore";

const RoomInput = () => {
    const [typeMessage, setTypeMessage] = useState("");
    const { receiveUser, currentUser } = useContext(AuthContext);
    const onSendMessage = () => {
        if(typeMessage != "") {
            console.log(serverTimestamp());
            try {
                Firebase.firestore().collection("messages").add({sender: currentUser.uuid, receiver: receiveUser.uuid, messageContent: typeMessage, createAt: FieldValue.serverTimestamp()}).then(setTypeMessage(""));
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <Box flexDirection="row" justifyContent="space-between" w="100%" bg="light.700" position="relative" bottom="0">
            <Input type="text" placeholder="Write a message..." value={typeMessage} onChangeText={setTypeMessage} borderWidth="0" color="#fff" w="100%" InputRightElement={<IconButton color="info.800" variant="ghost" _icon={{ as: MaterialIcons, name: "send" }} onPress={onSendMessage} />} _light={{ bg: "light.700", _hover: { bg: "light.700" }, _focus: { bg: "light.700" } }} />
        </Box>
    );
};

export default RoomInput;