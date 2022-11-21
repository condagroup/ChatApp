import React from "react";
import {Animated} from 'react-native';
import { NativeBaseProvider } from "native-base";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator   } from "@react-navigation/native-stack";
import { AuthProvider } from "./src/context/AuthContext";

import LogInScreen from "./src/screens/LogIn";
import SignUpScreen from "./src/screens/SignUp";
import ChatRoomScreen from "./src/screens/ChatRoom";
import UserListScreen from "./src/screens/UserList";

const Stack = createNativeStackNavigator();

const forSlide = ({current, next, inverted, layouts: {screen}}) => {
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
      : 0,
  );
  const overlayOpacity = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.7],
    extrapolate: 'clamp',
  });

  return {
    cardStyle: {
      overflow: 'hidden',
      transform: [
        {
          translateX: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [
                screen.width, // Focused, but offscreen in the beginning
                32, // Fully focused
                0, // Fully unfocused
              ],
              extrapolate: 'clamp',
            }),
            inverted,
          ),
        },
      ],
    },
    overlayStyle: {
      opacity: overlayOpacity,
    },
  };
};

export default function App() {

  return (
    <AuthProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Group>
              <Stack.Screen name="LogIn" component={LogInScreen} options={{ headerShown: false }} />
              <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
            </Stack.Group>
            <Stack.Group>
              <Stack.Screen name="ChatRoom" component={ChatRoomScreen} options={{ headerShown: false }} />
              <Stack.Screen name="UserList" component={UserListScreen} options={{
                headerShown: false,
                presentation: 'transparentModal',
                gestureDirection: 'horizontal',
                cardOverlayEnabled: true,
                cardStyleInterpolator: forSlide,
                animation: 'slide_from_right'
              }} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </AuthProvider>
  );
}