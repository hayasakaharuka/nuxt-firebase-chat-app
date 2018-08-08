import firebase from 'firebase'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.firebase.APIKEY,
    authDomain: process.env.firebase.AUTHDOMAIN,
    databaseURL: process.env.firebase.DATABASEURL,
    projectId: process.env.firebase.PROJECTID,
    storageBucket: process.env.firebase.STORAGEBUCKET,
    messagingSenderId: process.env.firebase.MESSAGINGSENDERID
  })
}

const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

export { firebase, firestore }
