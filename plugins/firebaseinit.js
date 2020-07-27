import firebase from 'firebase'
import 'firebase/firestore'
import firebaseConfig from './firebase'
// const firebaseApp = firebase.initializeApp(firebaseConfig)
// export default firebaseApp.firestore()

export default !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig).firestore()
  : firebase.app().firestore();