import * as firebase from 'firebase/app'
// import "firebse/auth"
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCKHZuIqjONbpWcCHgSV8FWnBwiy_o45Wk",
    authDomain: "pragtamale.firebaseapp.com",
    databaseURL: "https://pragtamale.firebaseio.com",
    projectId: "pragtamale",
    storageBucket: "pragtamale.appspot.com",
    messagingSenderId: "227119131601",
    appId: "1:227119131601:web:da155d44b2a34e6a2b8ef0"
  };

firebase.initializeApp(firebaseConfig)
let db = firebase.firestore();
console.log("firestore db: " + db)

async function getCarts() {
    let allCartsSnapshot = await firebase.firestore().collectionGroup('Carts').get()
    return allCartsSnapshot.docs.map((doc) => { 
        let data = doc.data()
        // set the id so it can be looked at
        data["id"] = doc.id
        return data
    })
}

async function getProviders() {
    let allProvidersSnapshot = await firebase.firestore().collectionGroup('Providers').get()
    return allProvidersSnapshot.docs.map((doc) => { 
        let data = doc.data()
        // set the id so it can be looked at
        data["id"] = doc.id
        return data
    })
}

export default { getCarts, getProviders };