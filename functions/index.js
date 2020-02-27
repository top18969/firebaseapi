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


// build multiple CRUD interfaces:
app.get('/', (req, res) => {
    let data = [
        {
            "vactotal": "ฉีดทั้งหมด 5 ครั้ง เมื่อตอนอายุ 2, 4, 6, 18 เดือน และ 4-6 ปี",
            "vacnameen": "DTP",
            "vacage": "0-3 ปี",
            "vactype": "A",
            "period": 60,
            "time": 2,
            "vaccode": "A003",
            "vacnameth": "วัคซีนรวมป้องกันโรคคอตีบ-บาดทะยัก-ไอกรน"
        },
        {
            "vactotal": "ฉีดทั้งหมด 5 ครั้ง เมื่อตอนอายุ 2, 4, 6, 18 เดือน และ 4-6 ปี",
            "vacnameen": "DTP",
            "vacage": "0-3 ปี",
            "vactype": "A",
            "period": 60,
            "time": 3,
            "vaccode": "A003",
            "vacnameth": "วัคซีนรวมป้องกันโรคคอตีบ-บาดทะยัก-ไอกรน"
        },
        {
            "vactotal": "ฉีดทั้งหมด 5 ครั้ง เมื่อตอนอายุ 2, 4, 6, 18 เดือน และ 4-6 ปี",
            "vacnameen": "DTP",
            "vacage": "0-3 ปี",
            "vactype": "A",
            "period": 360,
            "time": 4,
            "vaccode": "A003",
            "vacnameth": "วัคซีนรวมป้องกันโรคคอตีบ-บาดทะยัก-ไอกรน"
        },
        {
            "vactotal": "ฉีดทั้งหมด 5 ครั้ง เมื่อตอนอายุ 2, 4, 6, 18 เดือน และ 4-6 ปี",
            "vacnameen": "DTwP",
            "vacage": "4-12 ปี",
            "vactype": "B",
            "period": 920,
            "time": 5,
            "vaccode": "B001",
            "vacnameth": "วัคซีนรวมป้องกันโรคคอตีบ-บาดทะยัก-ไอกรน"
        },
        {
            "vactotal": "วัคซีนป้องกันโรคโปลิโอสามารถเลือกได้ว่าจะฉีดชนิดใด โดยมีทั้งหมด 2  ชนิด คือ /n วัคซีนโรคโปลิโอชนิดรับประทานจะรับทั้งหมด 5 ครั้ง เมื่ออายุ 2,4,6 และ 18 เดือน และให้วัคซีนกระตุ้นอีกครั้ง เมื่ออายุ 4-6 ปี /n /n วัคซีนโปลิโอชนิดฉีด ฉีดทั้งหมด 5 ครั้ง เมื่ออายุ 2,4, 6,18 เดือน และกระตุ้นอีกครั้ง เมื่ออายุ 4-6 ปี",
            "vacnameen": "OPV, IPV",
            "vacage": "4-12 ปี",
            "vactype": "B",
            "period": 0,
            "time": 5,
            "vaccode": "B002",
            "vacnameth": "วัคซีนป้องกันโรคโปลิโอ"
        },
    ]
    let dt;
    // admin.auth().listUsers(100).then(user => {
    //      user.users.forEach(use2 => {
    //          console.log(use2)
    //          dt = use2.uid;
    //          admin.auth().deleteUser(use2.uid)
    //      })
    //      return res.json({
    //         "statuscode": 200,
    //         "message": "All Vac",
    //         "data": dt,
    //     })
    // })
    // .catch(err => {
    //     console.log('error', err);
    // })

    //admin.auth().deleteUser()

    // data.forEach(dt => {
    //     vacCollection.add(dt)
    // })
    //res.send('Hello GET ')
});

app.get('/vaclist', (req, res, ) => {
    let allVac = [];
    vacCollection.where("time", "==", 1).orderBy("vaccode", "asc").get().then(async snapshot => {
        await snapshot.forEach(doc => {
            allVac.push(doc.data())
        })

        return res.json({
            "statuscode": 200,
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
    vacCollection.orderBy("vaccode", "asc").get().then(async snapshot => {
        await snapshot.forEach(doc => {
            allVac.push(doc.data())
        })

        return res.json({
            "statuscode": 200,
            "message": "All Vac",
            "data": allVac,
        })
    })
        .catch(err => {
            console.log('error', err);
        })
});

app.get('/getvacforsave', (req, res, ) => {
    let allVac = [];
    vacCollection.orderBy("time", "asc").get().then(async snapshot => {
        await snapshot.forEach(doc => {
            allVac.push(doc.data())
        })

        return res.json({
            "statuscode": 200,
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

    vacCollection.where("vaccode", "==", Vcode).orderBy("time", "asc").get().then(async snapshot => {
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

app.get('/getvacbytype/:id', (req, res, ) => {
    let allVac = [];
    let checkItem = [];

    let Vtype = req.params.id;

    vacCollection.where("vactype", "==", Vtype).orderBy("vaccode", "asc").orderBy("time","asc").get().then(async snapshot => {
        await snapshot.forEach(doc => {
            let chks = checkItem.indexOf(doc.data().vaccode)
            if(chks < 0){
                checkItem.push(doc.data().vaccode)
                allVac.push(doc.data())
            }
            //allVac.push(doc.data())
        })

        return res.json({
            "statuscode": 200,
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
    let dataV =[];

    dataV = req.body.vacdata;

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

    let uvac = "";

    vacUserCollection.where("email","==",req.body.email).where("vaccode","==",req.body.vaccode).get().then(async snapshot => {
        await snapshot.forEach(doc => {
            uvac = doc.id
        })

        if(uvac !== null && uvac !== "" && uvac !== undefined){
            let newVacs = {
                "email": req.body.email,
                "vaccode": req.body.vaccode,
                "vacnameth": req.body.vacnameth,
                "vacnameen": req.body.vacnameen,
                "start_from": req.body.start_from,
                "start_date": req.body.start_date,
                "hospital": req.body.hospital,
                "vactimes": timeS,
            }
        
            setNewVac = vacUserCollection.doc(uvac).update(newVacs)
            ms = "updated"
        }
        else{
            let newVacs = {
                "email": req.body.email,
                "vaccode": req.body.vaccode,
                "vacnameth": req.body.vacnameth,
                "vacnameen": req.body.vacnameen,
                "start_from": req.body.start_from,
                "start_date": req.body.start_date,
                "hospital": req.body.hospital,
                "vactimes": timeS,
            }
        
            setNewVac = vacUserCollection.add(newVacs);
            ms = "added"
            
        }

        return res.json({
            "statuscode":200,
            "message": ms,
            "data": allVac,
            "test" : uvac
        })
    })
        .catch(err => {
            console.log('error', err);
            res.json({
                "message": "error" + err,
            })
        })





    //     let newVacs = {
    //         "username": req.body.username,
    //         "vaccode": req.body.vaccode,
    //         "vacnameth": req.body.vacnameth,
    //         "vacnameen": req.body.vacnameen,
    //         "start_from": req.body.start_from,
    //         "start_date": req.body.start_date,
    //         "hospital": req.body.hospital,
    //         "vactimes": timeS,
    //     }

    //     setNewVac = vacUserCollection.add(newVacs);
    //     ms = "added"
    }

    // res.json({
    //     "statuscode": 200,
    //     "message": ms,
    //     "data": allVac,
    //     "test": setNewVac
    // })

});

app.get('/gethistorybyid/:id', (req, res, ) => {
    let allVac = [];

    let uId = req.params.id;

    vacUserCollection.where("email", "==", uId).get().then(async snapshot => {
        await snapshot.forEach(doc => {
            allVac.push(doc.data())
        })

        return res.json({
            "statuscode": 200,
            "message": "All Vac",
            "data": allVac,
        })
    })
        .catch(err => {
            console.log('error', err);
        })
});

app.post('/gethistorybyuv', (req, res, ) => {
    let alluser = [];
    let checkVal = true;
    let resMes = "";
    userCollection.where("email","==",req.body.email).where("vaccode","==",req.body.vaccode).get().then(async snapshot => {
        await snapshot.forEach(doc => {
            alluser.push(doc.data())
        })

        if(alluser.length !== 0){
            checkVal = true,
            resMes = "login"
        }
        else{
            checkVal = false,
            resMes = "Invalid email or password !"
        }

        return res.json({
            "statuscode": 200,
            "login": checkVal,
            "message": resMes,
            "data" : alluser
        })
    })
        .catch(err => {
            console.log('error', err);
            res.json({
                "message": "error" + err,
            })
        })
});


//user collection
app.get('/getuser', (req, res, ) => {
    let alluser = [];

    userCollection.get().then(async snapshot => {
        await snapshot.forEach(doc => {
            alluser.push({
                "uid" : doc.id,
                //"username" : doc.data().username,
                "password" : doc.data().password,
                "email" : doc.data().email,
                "birth_date" : doc.data().birth_date,
                "age" : doc.data().age,
                "weight" : doc.data().weight,
                "height" : doc.data().height,
            })
        })

        return res.json({
            "statuscode": 200,
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

app.get('/getuserbyemail/:id', (req, res, ) => {
    let alluser = [];
    let uId = req.params.id;
    userCollection.where("email","==",uId).get().then(async snapshot => {
        await snapshot.forEach(doc => {
            alluser.push(doc.data())
        })

        return res.json({
            "statuscode": 200,
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

app.post('/adduser', (req, res) => {

    let ms = null;
    
    if (req !== null && req !== undefined) {

        let newUser = {
            //"username": req.body.username,
            "password": req.body.password,
            "email": req.body.email,
            "birth_date": req.body.birth_date,
            "age": req.body.age,
            "weight": req.body.weight,
            "height": req.body.height,
            "name": req.body.name,
            "surname": req.body.surname,
            "blood_type": req.body.blood_type,
            "drug_al": req.body.drug_al,
            "sick": req.body.sick,
        }

        let setNewVac = userCollection.add(newUser);

        
        userCollection.where("email","==",req.body.email).get().then(async snapshot => {
            await snapshot.forEach(doc => {
                alluser.push(doc.data())
            })
    
            if(alluser.length !== 0){
                checkVal = false,
                resMes = "Email already exists"
            }
            else{
                checkVal = true,
                resMes = "ok"
            }
    
            return res.json({
                "statuscode": 200,
                "checkuser": checkVal,
                "message": resMes,
            })
        })
            .catch(err => {
                console.log('error', err);
                res.json({
                    "message": "error" + err,
                })
            })

        // res.json({
        //     "statuscode": 200,
        //     "message": "user added",
        // })
    }
    else{
        res.json({
            "statuscode": 404,
            "message": "Error input not found",
        })
    }
});

app.post('/adduservalidate', (req, res, ) => {
    let alluser = [];
    let checkVal = true;
    let resMes = "";
    userCollection.where("email","==",req.body.email).get().then(async snapshot => {
        await snapshot.forEach(doc => {
            alluser.push(doc.data())
        })

        if(alluser.length !== 0){
            checkVal = false,
            resMes = "Email already exists"
        }
        else{
            checkVal = true,
            resMes = "ok"
        }

        return res.json({
            "statuscode": 200,
            "checkuser": checkVal,
            "message": resMes,
        })
    })
        .catch(err => {
            console.log('error', err);
            res.json({
                "message": "error" + err,
            })
        })
});

app.post('/userlogin', (req, res, ) => {
    let alluser = [];
    let checkVal = true;
    let resMes = "";
    userCollection.where("email","==",req.body.email).where("password","==",req.body.password).get().then(async snapshot => {
        await snapshot.forEach(doc => {
            alluser.push(doc.data())
        })

        if(alluser.length !== 0){
            checkVal = true,
            resMes = "login"
        }
        else{
            checkVal = false,
            resMes = "Invalid email or password !"
        }

        return res.json({
            "statuscode": 200,
            "login": checkVal,
            "message": resMes,
            "data" : alluser
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



