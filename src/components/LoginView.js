import React, { Component } from "react";
import firebase from "./firebaseConfig"; // Careful to not import from "firebase"
import withFirebaseAuth from "react-auth-firebase";
 
class App extends Component {
  render() {
    // user object will have signed in user details if auth state changed
    // user will be null if not logged in
 
    // Use only the required methods.
    // If a property called 'google' not given in authConfig, signInWithGoogle and googleAccessToken will not be available for use.
    // Similar for others.
 
    const {
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      signInWithFacebook,
      signInWithGithub,
      signInWithTwitter,
      googleAccessToken,
      facebookAccessToken,
      githubAccessToken,
      twitterAccessToken,
      twitterSecret,
      signOut,
      user,
      error 
    } = this.props;
 
    const { email, password } = this.state;
 
    return (
      <div>
        // For Sign In
        <form onSubmit={e => e.preventDefault()}>
          ...form input to take email and password for sign in
          <button
            type="submit"
            onClick={() => signInWithEmail(email, password)}
          >
            SignIn
          </button>
        </form>
        // For Sign Up
        <form onSubmit={e => e.preventDefault()}>
          ...form input to take email and password for sign up
          <button
            type="submit"
            onClick={() => signUpWithEmail(email, password)}
          >
            SignUp
          </button>
        </form>
        <button onClick={signInWithGoogle}>Signin with Google</button>
        <button onClick={signInWithFacebook}>Signin with Facebook</button>
        <button onClick={signInWithGithub}>Signin with Github</button>
        <button onClick={signInWithTwitter}>Signin with Twitter</button>
      </div>
    );
  }
}
 
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
 
export default withFirebaseAuth(App, firebase, authConfig);