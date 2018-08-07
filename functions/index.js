const functions = require('firebase-functions')
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true })

admin.initializeApp();

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.addMessage = functions.https.onRequest((req, res) => {
  const message = req.body['text'] ? req.body['text'] : '無言'
  const userName = req.body['name'] ? req.body['name'] : '名無し'
  const userPhoto = req.body['image']
  cors(req, res, () => {
    return admin.firestore().collection('messages').add({
      message: message,
      name: userName,
      image: userPhoto,
      created_at: new Date()
    }).then(snapshot => {
      console.log(snapshot);
    }).catch(error => {
      console.log(error);
    })
  })
});

