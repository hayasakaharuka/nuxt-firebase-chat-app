const functions = require('firebase-functions')
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true })

admin.initializeApp();

const firestore = admin.firestore()
firestore.settings({ timestampsInSnapshots: true })

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.addSample = functions.https.onRequest((req, res) => {
  return firestore.collection('messages').add({
    message: "message",
    name: "userName",
    image: "userPhoto",
    created_at: new Date()
  }).then((docRef) => {
    res.status(200).send('Successed post message. ID: ', docRef.id);
  }).catch(error => {
    res.status(500).send(error);
  })
})

exports.addMessage = functions.https.onRequest((req, res) => {
  // if (req.method === 'POST') {
  // res.header('Access-Control-Allow-Origin', '*')
  const message = req.body['text'] ? req.body['text'] : '無言'
  const userName = req.body['name'] ? req.body['name'] : '名無し'
  const userPhoto = req.body['image']
  cors(req, res, () => {
    return firestore.collection('messages').add({
      message: message,
      name: userName,
      image: userPhoto,
      created_at: new Date()
    }).then((docRef) => {
      res.status(200).send('Successed post message. ID: ', docRef.id);
    }).catch(error => {
      res.status(500).send(error);
    })
  })
  res.status(200).end()
  // } else {
  //   res.status(405).end()
  // }
});
