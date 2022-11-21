import React, { useContext,  } from "react";
import { Box, Text, VStack, IconButton, Divider, ScrollView } from "native-base";
import Firebase from "../../config/firebase";
const auth = Firebase.auth();
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from "../../context/AuthContext";

import { Pressable } from "react-native";


const UserListScreen = ({ navigation }) => {
    const {users, currentUser, receiveUser, setReceiveUser, setMessages} = useContext(AuthContext);
    const onSelectReceiver = async (user) => {
        setReceiveUser(user);
        navigation.navigate('ChatRoom', {
            username: user.name,
        });
    };
    return (
        <Box mt="6" w="100%" h="100%" alignItems="flex-end">
            <Box w="70%" h="100%" bg="#fff" p="2">
                <Box alignItems="flex-start">
                    <IconButton p="1" variant="ghost" _icon={{ as: MaterialIcons, name: "close", size: "5", color:"gray.400" }} onPress={() => navigation.goBack()} />
                </Box>
                <VStack space={2.5} w="100%">
                    <Box>
                        {currentUser.name}
                    </Box>
                    <Divider />
                        <ScrollView>
                            <VStack space="3">
                            {
                                users.map((user, index) => (
                                    <Box key={index}>
                                        <Pressable onPress={ ()=>onSelectReceiver(user) }>
                                        <Text>{user.name}</Text>
                                        </Pressable>
                                    </Box>
                                ))
                            }
                            </VStack>
                    </ScrollView>
                </VStack>
            </Box>
        </Box>
    );
};

export default UserListScreen;