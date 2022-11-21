import React, { useState, useContext, useEffect } from "react";
import Firebase from "../../config/firebase";
const auth = Firebase.auth();
import { Heading, Stack, Input, Button, Center, Box, Text } from "native-base";
import { useWindowDimensions } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { collection, addDoc } from "@firebase/firestore";

import { AuthContext } from "../../context/AuthContext";
import { onCreateUser } from "../../services/FirebaseServices";
import ErrorMessage from "../../components/ErrorMessage";

const SignUpScreen = ({ navigation }) => {
    const dimension = useWindowDimensions();

    const safeAreaInsets = useSafeAreaInsets();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const { signUpError, setSignUpError } = useContext(AuthContext);

    const onSignUp = async () => {
        if(name == "") setSignUpError("Enter username.")
        else if(password !== confirm) setSignUpError("Password is not matched.");
        else {
            try {
                if (email !== '' && password !== '') {
                    await auth.createUserWithEmailAndPassword(email, password).then((credential) => {
                        Firebase.firestore().collection("users").add({uuid:credential.user.uid, name: name}).then(
                            navigation.navigate("LogIn")
                        );
                    });
                }
            } catch (error) {
                setSignUpError(error.message);
            }
        }
    };

    useEffect(() => {
        setSignUpError("");
    }, []);

    return (
            <KeyboardAwareScrollView extraScrollHeight={safeAreaInsets.top}>
                <Stack space={3} w="100%" maxW="400" position="absolute" top="6">
                    { signUpError ? <ErrorMessage errorText={signUpError} /> : null }
                </Stack>
                <Box flex="1" justifyContent="center" pt="8" px="4" w={dimension.width} h={dimension.height} alignItems="center">    
                    <Heading mb="3">
                        <Text color="dark.50"> Sign Up </Text>
                    </Heading>
                    <Center>
                        <Stack mb="5" direction="column" space={3}>
                            <Input mx="3" placeholder="Name" w="100%" value={name} onChangeText={setName} />
                            <Input mx="3" placeholder="Email" w="100%" value={email} onChangeText={setEmail} />
                            <Input type="password" mx="3" placeholder="Password" w="100%" value={password} onChangeText={setPassword} />
                            <Input type="password" mx="3" placeholder="Confirm" w="100%" value={confirm} onChangeText={setConfirm} />
                        </Stack>
                    </Center>
                    <Box w="100%">
                        <Button w="100%" onPress={onSignUp} py="3">Create new account</Button>
                        <Box mt="3" flexDirection="row" justifyContent="center" alignItems="center">
                            <Text fontSize="xs">Already have an account? </Text>
                            <Button variant="link" _text={{color: "warning.400"}} onPress={() => { navigation.navigate('LogIn') }}>
                                Log In
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </KeyboardAwareScrollView>
    );
};

export default SignUpScreen;