import { Box, HStack, VStack, Text, ScrollView } from "native-base";
import React, { useEffect, useContext } from "react";
import Firebase from "../../config/firebase";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AuthContext } from "../../context/AuthContext";

import ReceiveBox from "../ReceiveBox";
import SendBox from "../SendBox";

const RoomMessages = () => {
    const safeAreaInsets = useSafeAreaInsets();

    const { receiveUser, currentUser, messages, setMessages } = useContext(AuthContext)

    let datas = [
        {
            message: "Hello! Let me introduce you myself.",
            isSend: true,
            receiveTime: "2022.11.1 12:22:23"
        },
        {
            message: "I am from China, and web developer",
            isSend: true,
            receiveTime: "2022.11.1 12:23:23"
        },
        {
            message: "Hi",
            isSend: false,
            receiveTime: "2022.11.1 12:23:24"
        },
        {
            message: "How are you?",
            isSend: true,
            receiveTime: "2022.11.1 12:23:26"
        }
    ];

    useEffect(() => {
        let getMessagesByReceiver;
        if (!currentUser || !receiveUser) return;
        getMessagesByReceiver = Firebase.firestore().collection("messages").onSnapshot((querySnapshot) => {
            const newMessage = [];
            querySnapshot.forEach((doc) => {
                const message = doc.data();
                if((message.receiver == currentUser.uuid && message.sender == receiveUser.uuid) || (message.sender == currentUser.uuid && message.receiver == receiveUser.uuid)){
                    if(message.sender == currentUser.uuid) newMessage.push({...message,  isSend: true});
                    else newMessage.push({...message,  isSend: false});
                }
            });
            newMessage.sort((a, b) => {
                if(a.createAt > b.createAt) return 1;
                if(a.createAt < b.createAt) return -1;
                return 0;
            });
            newMessage.forEach((msg) => console.log(msg.messageContent,msg.createAt));
            setMessages(newMessage);
        });
        return () => {
            getMessagesByReceiver && getMessagesByReceiver();
        }

    }, [currentUser, receiveUser]);

    return (
        <ScrollView bg="#000000">
            <VStack w="100%" h="100%" p="2" space="3">
                {
                    messages.map((data, index) => (
                        data.isSend?<SendBox key={index} message={data.messageContent} />:<ReceiveBox message={data.messageContent} key={index} />
                    ))
                }
            </VStack>
        </ScrollView>
    );
};

export default RoomMessages;