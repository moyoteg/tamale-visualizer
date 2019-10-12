import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import FirebaseDataProvider from '../DataProviders/FirebaseDataProvider'

const firebaseApp = FirebaseDataProvider.firebaseInitialized
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default { firebaseAppAuth };