import React from "react";
import { Box } from "native-base";

const ReceiveBox = ({ message }) => {
    return (
        <Box alignItems="flex-start">
            <Box maxW="70%" _text={{fontSize:"md", color:"light.50"}} bg="muted.400" p="2" borderRadius="8">
                { message }
            </Box>
        </Box>
    );
};

export default ReceiveBox;