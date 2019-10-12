import * as firebase from 'firebase/app';
import 'firebase/auth';
import FirebaseDataProvider from '../DataProviders/FirebaseDataProvider'

const firebaseInitialized = FirebaseDataProvider.firebaseInitialized
const firebaseAuth = firebaseInitialized.auth();
const firebaseConfig = FirebaseDataProvider.firebaseConfig
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

// Important
 
// See authConfig api for all available options
// Add only the required auth types.
// Only their related props will be added
// For ex: signInWithGoogle will be added only when there is google object in authConfig
// At least an empty object required to enable that method
 
const authConfig = {
  email: {
    verifyOnSignup: false, // Sends verification email to user upon sign up
    saveUserInDatabase: true // Saves user in database at /users ref
  },
  google: {
    // redirect: true, // Opens a pop up by default
    returnAccessToken: true, // Returns an access token as googleAccessToken prop
    saveUserInDatabase: true // Saves user in database at /users ref
  },
  facebook: {
    // redirect: true, // Opens a pop up by default
    returnAccessToken: true, // Returns an access token as googleAccessToken prop
    saveUserInDatabase: true // Saves user in database at /users ref
  },
  github: {
    // redirect: true,
    returnAccessToken: true,
    saveUserInDatabase: true
  },
  twitter: {
    // redirect: true,
    returnAccessToken: true,
    returnSecret: true,
    saveUserInDatabase: true
  }
};
export default { firebaseAuth, providers, firebaseConfig, authConfig };