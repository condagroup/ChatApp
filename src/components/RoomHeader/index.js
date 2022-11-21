import { useNavigation } from "@react-navigation/core";
import { Box, Text, IconButton } from "native-base";
import React from "react";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const RoomHeader = ({ username }) => {
    const {navigate} = useNavigation();
    return (
        <Box flexDirection="row" justifyContent="space-between" w="100%" p="2" bg="light.700" alignItems="center">
            <Text fontSize="md" color="light.50">{username}</Text>
            <IconButton p="1" variant="ghost" _icon={{ as: MaterialIcons, name: "person", size: "5", color:"gray.400" }} onPress={() => navigate('UserList')} />
        </Box>
    );
};

export default RoomHeader;