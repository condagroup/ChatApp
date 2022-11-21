import React, { useState, createContext } from "react";
import { onCreateUser, onJoinRoom } from "../../services/FirebaseServices";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [users, setUsers] = useState(null);
    const [signUpError, setSignUpError] = useState("");
    const [logInError, setLogInError] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const [receiveUser, setReceiveUser] = useState(null);
    const [messages, setMessages] = useState([]);

    return (
        <AuthContext.Provider value={{ users, setUsers, currentUser, setCurrentUser, receiveUser, setReceiveUser, logInError, setLogInError, signUpError, setSignUpError, onCreateUser, onJoinRoom, messages, setMessages }}>
            {children}
        </AuthContext.Provider>
    );
};