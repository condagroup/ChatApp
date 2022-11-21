import React from "react";
import { Box } from "native-base";

const SendBox = ({ message }) => {
    return (
        <Box alignItems="flex-end">
            <Box maxW="70%" _text={{fontSize:"md", color:"light.50"}} bg="info.400" p="2" borderRadius="8">
                { message }
            </Box>
        </Box>
    );
};

export default SendBox;