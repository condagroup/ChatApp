import Firebase from "../config/firebase";
const auth = Firebase.auth();

export const onCreateUser = async(name, email, password) => {
  try {
      if (email !== '' && password !== '') {
        await auth.createUserWithEmailAndPassword(email, password);
      }
    } catch (error) {
      
    }
};

export const onJoinRoom = async(email, password, navigation) => {
  try {
        await auth.signInWithEmailAndPassword(email, password)
          .then(() => {
            navigation.navigate('ChatRoom');
          });
    } catch (error) {
      console.log(error.message);
    }
};
