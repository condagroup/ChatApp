import React, { useEffect } from "react";
import { Heading, Stack, Input, Button, Center, Box, Text } from "native-base";
import { useWindowDimensions } from "react-native";

import RoomHeader from "../../components/RoomHeader";
import RoomInput from "../../components/RoomInput";
import RoomMessages from "../../components/RoomMessages";

const ChatRoomScreen = ({ navigation, route }) => {
    const dimension = useWindowDimensions();
    
    return (
        <Box flex="1" mt="6" w={dimension.width} h={dimension.height}>
            <RoomHeader username={route.params?.username} />
            <RoomMessages />
            <RoomInput />
        </Box>
    );
};

export default ChatRoomScreen;