import React, { useState, useContext, useEffect } from "react";
import Firebase from "../../config/firebase";
const auth = Firebase.auth();
import { Heading, Stack, Input, Button, Center, Box, Text } from "native-base";
import { useWindowDimensions } from "react-native";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { collection, addDoc } from "@firebase/firestore";

import { AuthContext } from "../../context/AuthContext";
import { onJoinRoom } from "../../services/FirebaseServices";
import ErrorMessage from "../../components/ErrorMessage";


const LogInScreen = ({ navigation }) => {
    const dimension = useWindowDimensions();

    const safeAreaInsets = useSafeAreaInsets();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { logInError, setLogInError, setUsers, setCurrentUser, currentUser } = useContext(AuthContext);
    const onLogIn = async () => {
        if(email == "") setLogInError("Enter email.")
        else {
            try {
                if (email !== '' && password !== '') {
                    await auth.signInWithEmailAndPassword(email, password).then((credential) => {
                        Firebase.firestore().collection("users").onSnapshot(
                            (querySnapshot) => {
                              const newUser = [];
                              querySnapshot.forEach((doc) => {
                                const docuser = doc.data();
                                if(docuser.uuid == credential.user.uid) setCurrentUser(docuser);
                                else newUser.push(docuser);
                              });
                              setUsers(newUser);
                            },
                            (error) => {
                              console.error(error);
                            }
                        );
                    });
                    console.log(currentUser);
                    navigation.navigate("ChatRoom");
                }
            } catch (error) {
                setLogInError(error.message);
            }
        }
    };
    useEffect(() => {
        setLogInError("");
    }, []);

    return (
        <KeyboardAwareScrollView extraScrollHeight={safeAreaInsets.top}>
            <Stack space={3} w="100%" maxW="400" position="absolute" top="6">
                { logInError ? <ErrorMessage errorText={logInError} /> : null }
            </Stack>
            <Box flex="1" justifyContent="center" pt="8" px="4" w={dimension.width} h={dimension.height} alignItems="center">
                <Heading mb="3">
                    <Text color="dark.50"> Log In </Text>
                </Heading>
                <Center>
                    <Stack mb="5" direction="column" space={3}>
                        <Input mx="3" placeholder="Email" w="100%" value={email} onChangeText={setEmail} />
                        <Input type="password" mx="3" placeholder="Password" value={password} w="100%" onChangeText={setPassword} />
                    </Stack>
                </Center>
                <Box flexDirection="row" justifyContent="space-between" w="100%">
                    <Button variant="ghost" colorScheme="secondary" onPress={() => navigation.navigate('SignUp')}>
                        Sign Up
                    </Button>
                    <Button onPress={onLogIn}>Join room</Button>
                </Box>
            </Box>
        </KeyboardAwareScrollView>
    );
};

export default LogInScreen;