import React, { Component } from "react";
import firebase from "./firebaseConfig"; // Careful to not import from "firebase"
 
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
 
export default App