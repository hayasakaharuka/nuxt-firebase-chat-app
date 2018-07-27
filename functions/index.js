const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const text = req.query.text ? req.query.text : '無言';
  const name = req.query.name ? req.query.name : '名無し';
  // Push the new message into the Realtime Database using the Firebase Admin SDK.
  return admin.firestore().collection('messages').add({
    message: text,
    name: name,
    image: 'https://graph.facebook.com/2617699091787742/picture',
    created_at: new Date()
  }).then(snapshot => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    return res.redirect(303, snapshot.ref.toString());
  });
});
