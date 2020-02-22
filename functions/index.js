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
const vacUserCollection = db.collection("vac_user");
const userCollection = db.collection("user");

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

let dataV = [];


vacCollection.orderBy("time", "asc").get().then(async snapshot => {
    await Promise.all(snapshot.forEach(doc => {
        dataV.push(doc.data())
    }))

    return dataV;
})
    .catch(err => {
        console.log('error', err);
    });


// build multiple CRUD interfaces:
app.get('/', (req, res) => {
    functions.storage.object().onChange(event => {
        console.log(event)
    })
    res.send('Hello GET ')
});

app.get('/vaclist', (req, res, ) => {
    let allVac = [];
    vacCollection.where("time", "==", 1).orderBy("vaccode", "asc").get().then(async snapshot => {
        await snapshot.forEach(doc => {
            allVac.push(doc.data())
        })

        return res.json({
            "statuscode": "200",
            "message": "All Vac",
            "data": allVac,
        })
    })
        .catch(err => {
            console.log('error', err);
        })
});

app.get('/vaclistall', (req, res, ) => {
    let allVac = [];
    vacCollection.orderBy("vaccode", "asc").get().then(snapshot => {
        snapshot.forEach(doc => {
            allVac.push(doc.data())
        })

        return res.json({
            "statuscode": "200",
            "message": "All Vac",
            "data": allVac,
        })
    })
        .catch(err => {
            console.log('error', err);
        })
});

app.get('/getvacbycode/:id', (req, res, ) => {
    let allVac = [];

    let Vcode = req.params.id;

    vacCollection.where("vaccode", "==", Vcode).orderBy("time", "asc").get().then(snapshot => {
        snapshot.forEach(doc => {
            allVac.push(doc.data())
        })

        return res.json({
            "statuscode": "200",
            "message": "All Vac",
            "data": allVac,
        })
    })
        .catch(err => {
            console.log('error', err);
        })
});

app.get('/getvacbytype/:id', (req, res, ) => {
    let allVac = [];

    let Vtype = req.params.id;

    vacCollection.where("vactype", "==", Vtype).where("time", "==", 1).orderBy("vaccode", "asc").get().then(snapshot => {
        snapshot.forEach(doc => {
            allVac.push(doc.data())
        })

        return res.json({
            "statuscode": "200",
            "message": "All Vac",
            "data": allVac,
        })
    })
        .catch(err => {
            console.log('error', err);
        })
});


//vac_user collection
app.post('/addVacByUser', (req, res) => {

    let ms = null;
    let setNewVac;
    let allVac = dataV.filter(data => {
        return data.vaccode === req.body.vaccode
    });

    if(allVac.length === 0 || allVac === null || allVac === undefined){
        ms = "Error please try again"
        return ms
    }
    else{
        let timeS = [];
        let d = new Date(req.body.start_date);

    allVac.forEach(e => {
        
        if(e.time >= req.body.start_from){
            //d.setDate(d.getDate() + e.period);
            d.setDate(d.getDate() + e.period);
            var dd = d.getDate();
            var mm = d.getMonth() + 1;
            var y = d.getFullYear();

            timeS.push({
                "time" : e.time,
                "date_to": y + '-' + mm + '-' + dd,
                "current_times" : req.body.start_date
            })
            //d = d.setDate(d.getDate() + e.period);
        }
    })

    let newVacs = {
        "username": req.body.username,
        "vaccode": req.body.vaccode,
        "vacnameth": req.body.vacnameth,
        "vacnameen": req.body.vacnameen,
        "start_from": req.body.start_from,
        "start_date": req.body.start_date,
        "hospital": req.body.hospital,
        "vactimes": timeS
    }

    setNewVac = vacUserCollection.add(newVacs);
    ms = "added"
    }

    res.json({
        "message": ms,
        "data": allVac,
        "test" : setNewVac
    })

});

app.get('/gethistorybyid/:id', (req, res, ) => {
    let allVac = [];

    let uId = req.params.id;

    vacUserCollection.where("uid", "==", uId).get().then(snapshot => {
        snapshot.forEach(doc => {
            allVac.push(doc.data())
        })

        return res.json({
            "statuscode": "200",
            "message": "All Vac",
            "data": allVac,
        })
    })
        .catch(err => {
            console.log('error', err);
        })
});


//user collection
app.get('/getuser', (req, res, ) => {
    let alluser = [];

    userCollection.get().then(async snapshot => {
        await snapshot.forEach(doc => {
            alluser.push({
                "uid" : doc.id,
                "username" : doc.data().username,
                "password" : doc.data().password,
                "email" : doc.data().email,
                "birth_date" : doc.data().birth_date,
                "age" : doc.data().age,
                "weight" : doc.data().weight,
                "height" : doc.data().height,
            })
        })

        return res.json({
            "statuscode": "200",
            "message": "All user",
            "data": alluser,
        })
    })
        .catch(err => {
            console.log('error', err);
            res.json({
                "message": "error" + err,
            })
        })
});

// Expose Express API as a single Cloud Function:
exports.vacapi = functions.region("asia-east2").https.onRequest(app);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });



