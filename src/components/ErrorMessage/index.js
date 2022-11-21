import { Alert, HStack, VStack, Text, IconButton, CloseIcon } from "native-base";
import React from "react";

const ErrorMessage = ({ errorText }) => {
    return (
        <Alert w="100%" status="error">
            <VStack space={2} flexShrink={1} w="100%">
                <HStack flexShrink={1} space={2} justifyContent="space-between">
                    <HStack space={2} flexShrink={1}>
                        <Text fontSize="md" color="coolGray.800">
                            { errorText }
                        </Text>
                    </HStack>
                </HStack>
            </VStack>
        </Alert>
    );
};

export default ErrorMessage;