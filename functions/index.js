const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const admin = require('firebase-admin');


//initSdk
admin.initializeApp();

const db = admin.firestore();
const vacCollection = db.collection("vac");

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// build multiple CRUD interfaces:
app.get('/', (req, res) => {
    res.send('Hello GET by noomerZx')
});

app.post('/add', (req, res) => {
    
        let docId = Math.floor(Math.random() * (99999 - 0));
        let newVac = {
            "vacid": req.body.vacid,
            "type": req.body.type,
            "detail": req.body.detail,
            "time": req.body.time,
        }
        let setNewVac = vacCollection.add(newVac);
        res.json({
            "message" : "added"
        })
    
});

  // Expose Express API as a single Cloud Function:
exports.hello = functions.https.onRequest(app);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
