const functions = require('firebase-functions');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const admin = require('firebase-admin');


//initSdk
admin.initializeApp();

const db = admin.firestore();
const vacCollection1 = db.collection("vac1");
const vacCollection2 = db.collection("vac2");
const vacCollection3 = db.collection("vac3");
const vacCollection4 = db.collection("vac4");
const vacCollection5 = db.collection("vac5");
const vacCollection6 = db.collection("vac6");
const vacCollection7 = db.collection("vac7");
const vacCollection8 = db.collection("vac8");
const vacCollection9 = db.collection("vac9");
const vacCollection10 = db.collection("vac10");
const vacCollection11 = db.collection("vac11");
const vacCollection12 = db.collection("vac12");
const vacCollection13 = db.collection("vac13");
const vacCollection14 = db.collection("vac14");
const vacCollection15 = db.collection("vac15");
const vacCollection16 = db.collection("vac16");
const vacCollection17 = db.collection("vac17");


// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// build multiple CRUD interfaces:
app.get('/', (req, res) => {
    res.send('Hello GET by noomerZx')
});

app.get('/vac', (req, res,) => {
    let allVac = [];
    vacCollection1.get().then(snapshot => {
        snapshot.forEach(doc => {
            allVac.push({
                "vacId" : doc.id,
                "dataVac" : doc.data()
            })
        })
        return res.json({
            "statuscode" : "200",
            "message" : "All Vac",
            "data" : allVac
        })
    })
    .catch(err => {
        console.log('error',err);
    })
});

app.post('/add', (req, res) => {
    
        let newVac = {
            "vacid": req.body.vacid,
            "type": req.body.type,
            "detail": req.body.detail,
            "time": req.body.time,
        }
        let setNewVac = vacCollection1.add(newVac);
        res.json({
            "message" : "added"
        })
    
});

app.post('/add2', (req, res) => {
    
    let data = [];
    data = req.body;

    if(data.length !== 0){
        data.forEach(element => {
            let newVac = {

                "no": element.no,
                "type": element.type,
                "age": element.age,
                "name": element.name,
                "detail": element.detail,
                "protect": element.protect,
                "amount": element.amount,
                "effect": element.effect,
                "care": element.care,
                "tips": element.tips,
                "price": element.price,
                "times": element.times,
            }
            let setNewVac = vacCollection1.add(newVac);
        });
    }
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



// [
// 	{
// 		"no": 1,
// 		"type": "A",
// 		"age": "0-3 ปี",
// 		"name": "วัคซีนป้องกันวัณโรค (BCG)",
// 		"detail": "วัณโรคเกิดจากเชื้อแบคทีเรีย สามารถติดเชื้อได้ผ่านการไอ จามหรือการพูดคุย โดยจะมีอาการไอเรื้อรัง มีเสมหะ มีไข้ต่ำๆ อ่อนเพลีย เบื่ออาหาร น้ำหนักลด และแน่นหน้าอก และอาจรุนแรงจนถึงขั้นเสียชีวิต",
// 		"protect": "เมื่อได้รับวัคซีนครบตามกำหนด ภูมิคุ้มกันจะอยู่นานถึง10 ปี",
// 		"amount": "ฉีดเพียง 1 ครั้ง ตอนแรกเกิด",
// 		"effect": "อาจเป็นแผลหนองและต่อมน้ำเหลืองบริเวณที่ฉีด",
// 		"care": "ควรดูเเลรักษาความสะอาดบริเวณผิวหนังที่ฉีด โดยใช้สําลีสะอาดชุบน้ำเช็ดให้สะอาด ถ้าต่อมน้ำเหลืองโตและเป็นฝี ควรพบแพทย์เพื่อทำการดูดหนองออก และรับยาต้านวัณโรคในบางกรณี",
// 		"tips": "-",
// 		"price": "โรงพยาบาลรัฐบาล ฟรี",
// 		"times": [
// 			{
// 				"time": 1,
// 				"period": 0
// 			}
// 			]
// 	},
// 	{
// 		"no": 2,
// 		"type": "A",
// 		"age": "0-3 ปี",
// 		"name": "วัคซีนไวรัสตับอักเสบบี (HB)",
// 		"detail": "ไวรัสตับอักเสบบีเกิดจากเชื้อไวรัสที่อยู่ภายในเลือด สามารถติดเชื้อผ่านทางเลือด โดยจะมีอาการอ่อนเพลีย เบื่ออาหาร มีไข้ต่ำ ปวดท้อง ตัวเหลือง ตาเหลือง และอาจเป็นโรคตับแข็งและมะเร็งตับได้งขั้นเสียชีวิต",
// 		"protect": "เมื่อได้รับวัคซีนครบตามกำหนด ภูมิคุ้มกันจะอยู่ได้มากกว่า 20 ปี",
// 		"amount": "ฉีดทั้งหมด 3 ครั้ง เมื่อตอนแรกเกิด, 2 และ 6 เดือน",
// 		"effect": "อาจมีอาการปวด บวม บริเวณที่ฉีด หรือมีไข้ต่ำประมาณ 1-2วัน",
// 		"care": "ควรให้ทานยาลดไข้ และเช็ดตัวด้วยน้ำอุณหภูมิห้อง ส่วนบริเวณที่บวมให้ใช้ธีประคบเย็น",
// 		"tips": "-",
// 		"price": "โรงพยาบาลรัฐบาล ราคาเข็มละ 300-500 บาท โรงพยาบาลเอกชน ราคาเข็มละ 600-1200 บาท",
// 		"times": [
// 			{
// 				"time": 1,
// 				"period": 30
// 			},
// 			{
// 				"time": 2,
// 				"period": 180
// 			},
// 			{
// 				"time": 3,
// 				"period": 0
// 			}
// 			]
// 	},
// 	{
// 		"no": 3,
// 		"type": "A",
// 		"age": "0-3 ปี",
// 		"name": "วัคซีนรวมป้องกันโรคคอตีบ-บาดทะยัก-ไอกรน (DTP)",
// 		"detail": "โรคคอตีบ เกิดจากเชื้อแบคทีเรียที่อยู่ภายในเยื่อบุคอ สามารถติดเชื้อผ่านทางน้ำลาย เสมหะ น้ำมูก การหายใจ ไอ หรือ จาม โดยจะมีอาการคออักเสบอย่างรุนแรง อาจทำให้เสียชีวิตจากทางเดินหายใจอุดกั้นได้ หรือจากพิษของเชื้อทำให้กล้ามเนื้อหัวใจอักเสบ หรือปลายประสาทอักเสบได้ โรคไอกรน เกิดจากเชื้อเเบคทีเรียที่อยู่ในลำคอ สามารถติดเชื้อผ่านทางละอองที่เกิดจากการไอ หรือจาม โดยจะมีอาการไอรุนแรง หายใจเข้ามีเสียงดัง หรือการอาเจียนจากการไอ ตัวเขียว จนหยุดหายใจได้ โรคบาดทะยัก เกิดจากเชื้อเเบคทีเรียที่อยู่ในดิน ฝุ่นละออง ผิวหนัง และอุจจาระของคน สามารถติดเชื้อผ่านทางบาดแผลโดยเฉพาะบาดแผลที่ลึกเข้าไปในผิวหนัง โดยจะมีอาการกล้ามเนื้อทำงานผิดปกติ ขากรรไกรแข็ง อ้าปากไม่ค่อยได้ เกร็ง ชักกระตุก หรือหยุดหายใจได้",
// 		"protect": "เมื่อได้รับวัคซีนครบตามกำหนด ภูมิคุ้มกันจะอยู่นานถึง10 ปี",
// 		"amount": "ฉีดทั้งหมด 5 ครั้ง เมื่อตอนอายุ 2, 4, 6, 18 เดือน และ 4-6 ปี",
// 		"effect": "อาจมีไข้ ปวด บวม แดงบริเวณที่ฉีด",
// 		"care": "ควรให้ทานยาลดไข้ และเช็ดตัวด้วยน้ำอุณหภูมิห้อง ส่วนบริเวณที่บวมให้ใช้ธีประคบเย็น",
// 		"tips": "-",
// 		"price": "โรงพยาบาลรัฐบาล ราคาเข็มละ 350-700 บาท โรงพยาบาลเอกชน ราคาเข็มละ 1,000-1,500 บาท",
// 		"times": [
// 			{
// 				"time": 1,
// 				"period": 60
// 			},
// 			{
// 				"time": 2,
// 				"period": 60
// 			},
// 			{
// 				"time": 3,
// 				"period": 60
// 			},
// 			{
// 				"time": 4,
// 				"period": 360
// 			}
// 			]
// 	}
// ]
