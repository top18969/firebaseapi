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
const vac2Collection = db.collection("vac2");
const vacUserCollection = db.collection("vac_user");
const userCollection = db.collection("user");
const keepdateCollection = db.collection("keepdate");

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


// build multiple CRUD interfaces:
app.get('/', (req, res) => {
    let data = [
        //{ "vactotal": "ฉีดทั้งหมด 5 ครั้ง เมื่อตอนอายุ 2, 4, 6, 18 เดือน และ 4-6 ปี", "vacnameen": "DTP", "vacage": "0-3 ปี", "vactype": "A", "period": 60, "time": 2, "vaccode": "A003", "vacnameth": "วัคซีนรวมป้องกันโรคคอตีบ-บาดทะยัก-ไอกรน"},
        // { "vacnameen": "BCG", "vacage": "0-3 ปี", "vactype": "A", "period": 0, "time": 1, "vaccode": "A001", "vacnameth": "วัคซีนป้องกันวัณโรค (BCG)", "vactotal": "ฉีดเพียง 1 ครั้ง ตอนแรกเกิด" },
        // { "vacnameen": "HB", "vacage": "0-3 ปี", "vactype": "A", "period": 30, "time": 1, "vaccode": "A002", "vacnameth": "วัคซีนไวรัสตับอักเสบบี (HB)", "vactotal": "ฉีดทั้งหมด 3 ครั้ง เมื่อตอนแรกเกิด, 2 และ 6 เดือน" },
        // { "vacnameen": "HB", "vacage": "0-3 ปี", "vactype": "A", "period": 180, "time": 2, "vaccode": "A002", "vacnameth": "วัคซีนไวรัสตับอักเสบบี (HB)", "vactotal": "ฉีดทั้งหมด 3 ครั้ง เมื่อตอนแรกเกิด, 2 และ 6 เดือน" },
        // { "vacnameen": "HB", "vacage": "0-3 ปี", "vactype": "A", "period": 0, "time": 3, "vaccode": "A002", "vacnameth": "วัคซีนไวรัสตับอักเสบบี (HB)", "vactotal": "ฉีดทั้งหมด 3 ครั้ง เมื่อตอนแรกเกิด, 2 และ 6 เดือน" },
        // { "vacnameen": "DTwP", "vacage": "0-3 ปี", "vactype": "A", "period": 60, "time": 1, "vaccode": "A003", "vacnameth": "วัคซีนรวมป้องกันโรคคอตีบ-บาดทะยัก-ไอกรน (DTwP)", "vactotal": "ฉีดทั้งหมด 5 ครั้ง เมื่อตอนอายุ 2, 4, 6, 18 เดือน และ 4-6 ปี" },
        // { "vacnameen": "DTwP", "vacage": "0-3 ปี", "vactype": "A", "period": 60, "time": 2, "vaccode": "A003", "vacnameth": "วัคซีนรวมป้องกันโรคคอตีบ-บาดทะยัก-ไอกรน (DTP)", "vactotal": "ฉีดทั้งหมด 5 ครั้ง เมื่อตอนอายุ 2, 4, 6, 18 เดือน และ 4-6 ปี" },
        // { "vacnameen": "DTwP", "vacage": "0-3 ปี", "vactype": "A", "period": 60, "time": 3, "vaccode": "A003", "vacnameth": "วัคซีนรวมป้องกันโรคคอตีบ-บาดทะยัก-ไอกรน (DTP)", "vactotal": "ฉีดทั้งหมด 5 ครั้ง เมื่อตอนอายุ 2, 4, 6, 18 เดือน และ 4-6 ปี" },
        // { "vacnameen": "DTwP", "vacage": "0-3 ปี", "vactype": "A", "period": 360, "time": 4, "vaccode": "A003", "vacnameth": "วัคซีนรวมป้องกันโรคคอตีบ-บาดทะยัก-ไอกรน (DTP)", "vactotal": "ฉีดทั้งหมด 5 ครั้ง เมื่อตอนอายุ 2, 4, 6, 18 เดือน และ 4-6 ปี" },
        // { "vacnameen": "Hib", "vacage": "0-3 ปี", "vactype": "A", "period": 60, "time": 1, "vaccode": "A004", "vacnameth": "วัคซีนป้องกันโรคติดเชื้อฮิบ (Hib)", "vactotal": "ฉีดทั้งหมด 3 ครั้ง เมื่ออายุ 2, 4 เเละ 6 เดือน" },
        // { "vacnameen": "Hib", "vacage": "0-3 ปี", "vactype": "A", "period": 60, "time": 2, "vaccode": "A004", "vacnameth": "วัคซีนป้องกันโรคติดเชื้อฮิบ (Hib)", "vactotal": "ฉีดทั้งหมด 3 ครั้ง เมื่ออายุ 2, 4 เเละ 6 เดือน" },
        // { "vacnameen": "Hib", "vacage": "0-3 ปี", "vactype": "A", "period": 0, "time": 3, "vaccode": "A004", "vacnameth": "วัคซีนป้องกันโรคติดเชื้อฮิบ (Hib)", "vactotal": "ฉีดทั้งหมด 3 ครั้ง เมื่ออายุ 2, 4 เเละ 6 เดือน" },
        // { "vacnameen": "Rota", "vacage": "0-3 ปี", "vactype": "A", "period": 60, "time": 1, "vaccode": "A005", "vacnameth": "วัคซีนป้องกันโรคติดเชื้อโรต้า (Rota)", "vactotal": "วัคซีนรับประทานทั้งหมด 3 ครั้ง เมื่ออายุ 2, 4 และ 6 เดือน" },
        // { "vacnameen": "Rota", "vacage": "0-3 ปี", "vactype": "A", "period": 60, "time": 2, "vaccode": "A005", "vacnameth": "วัคซีนป้องกันโรคติดเชื้อโรต้า (Rota)", "vactotal": "วัคซีนรับประทานทั้งหมด 3 ครั้ง เมื่ออายุ 2, 4 และ 6 เดือน" },
        // { "vacnameen": "Rota", "vacage": "0-3 ปี", "vactype": "A", "period": 60, "time": 3, "vaccode": "A005", "vacnameth": "วัคซีนป้องกันโรคติดเชื้อโรต้า (Rota)", "vactotal": "วัคซีนรับประทานทั้งหมด 3 ครั้ง เมื่ออายุ 2, 4 และ 6 เดือน" },
        // { "vacnameen": "MMR", "vacage": "0-3 ปี", "vactype": "A", "period": 270, "time": 1, "vaccode": "A006", "vacnameth": "วัคซีนป้องกันโรคหัด-คางทูม- หัดเยอรมัน (MMR)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยเริ่มฉีดเมื่ออายุ 9 เดือน และ 2 ปีครึ่ง" },
        // { "vacnameen": "MMR", "vacage": "0-3 ปี", "vactype": "A", "period": 270, "time": 1, "vaccode": "A006", "vacnameth": "วัคซีนป้องกันโรคหัด-คางทูม- หัดเยอรมัน (MMR)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยเริ่มฉีดเมื่ออายุ 9 เดือน และ 2 ปีครึ่ง" },
        // { "vacnameen": "MMR", "vacage": "0-3 ปี", "vactype": "A", "period": 0, "time": 2, "vaccode": "A006", "vacnameth": "วัคซีนป้องกันโรคหัด-คางทูม- หัดเยอรมัน (MMR)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยเริ่มฉีดเมื่ออายุ 9 เดือน และ 2 ปีครึ่ง" },
        // { "vacnameen": "JE", "vacage": "0-3 ปี", "vactype": "A", "period": 270, "time": 1, "vaccode": "A007", "vacnameth": "วัคซีนป้องกันโรคโรคไข้สมองอักเสบเจอี (JE)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง เมื่ออายุ 9-12 เดือน และ 1-2 ปี" },
        // { "vacnameen": "JE", "vacage": "0-3 ปี", "vactype": "A", "period": 0, "time": 2, "vaccode": "A007", "vacnameth": "วัคซีนป้องกันโรคโรคไข้สมองอักเสบเจอี (JE)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง เมื่ออายุ 9-12 เดือน และ 1-2 ปี" },
        // { "vacnameen": "Flu", "vacage": "0-3 ปี", "vactype": "A", "period": 270, "time": 1, "vaccode": "A008", "vacnameth": "วัคซีนป้องกันโรคไข้หวัดใหญ่ (Flu)", "vactotal": "ฉีดเพียง 1ครั้ง/ปี โดยเริ่มฉีดเมื่ออายุ 6 เดือนขึ้นไป" },
        // { "vacnameen": "OPV,IPV", "vacage": "0-3 ปี", "vactype": "A", "period": 0, "time": 1, "vaccode": "A009", "vacnameth": "วัคซีนป้องกันโรคโปลิโอ (OPV, IPV)", "vactotal": "การรับวัคซีนป้องกันโรคโปลิโอจะรับทั้ง 2 ชนิด เพื่อครอบคลุมการสร้างภูมิคุ้มกันต่อเชื้อทั้ง 3 สายพันธุ์ วัคซีนโรคโปลิโอชนิดรับประทานจะรับทั้งหมด 5 ครั้ง เมื่ออายุ 2,4,6 และ 18 เดือน และให้วัคซีนกระตุ้นอีกครั้ง เมื่ออายุ 4-6 ปี วัคซีนโปลิโอชนิดฉีด ฉีดทั้งหมด 4 ครั้ง เมื่ออายุ 2,4, 6-18 เดือน และกระตุ้นอีกครั้ง เมื่ออายุ 4-6 ปีจะได้ประสิทธิภาพในการคุ้มกันได้ดีที่สุด (ยกเว้นเมื่อฉีดเข็มที่ 3 ตอนอายุประมาณ 4 ปี ไม่จำเป็นต้องฉีดซ้ำ)" },
        // { "vacnameen": "OPV,IPV", "vacage": "0-3 ปี", "vactype": "A", "period": 0, "time": 2, "vaccode": "A009", "vacnameth": "วัคซีนป้องกันโรคโปลิโอ (OPV, IPV)", "vactotal": "การรับวัคซีนป้องกันโรคโปลิโอจะรับทั้ง 2 ชนิด เพื่อครอบคลุมการสร้างภูมิคุ้มกันต่อเชื้อทั้ง 3 สายพันธุ์ วัคซีนโรคโปลิโอชนิดรับประทานจะรับทั้งหมด 5 ครั้ง เมื่ออายุ 2,4,6 และ 18 เดือน และให้วัคซีนกระตุ้นอีกครั้ง เมื่ออายุ 4-6 ปี วัคซีนโปลิโอชนิดฉีด ฉีดทั้งหมด 4 ครั้ง เมื่ออายุ 2,4, 6-18 เดือน และกระตุ้นอีกครั้ง เมื่ออายุ 4-6 ปีจะได้ประสิทธิภาพในการคุ้มกันได้ดีที่สุด (ยกเว้นเมื่อฉีดเข็มที่ 3 ตอนอายุประมาณ 4 ปี ไม่จำเป็นต้องฉีดซ้ำ)" },
        // { "vacnameen": "OPV,IPV", "vacage": "0-3 ปี", "vactype": "A", "period": 0, "time": 3, "vaccode": "A009", "vacnameth": "วัคซีนป้องกันโรคโปลิโอ (OPV, IPV)", "vactotal": "การรับวัคซีนป้องกันโรคโปลิโอจะรับทั้ง 2 ชนิด เพื่อครอบคลุมการสร้างภูมิคุ้มกันต่อเชื้อทั้ง 3 สายพันธุ์ วัคซีนโรคโปลิโอชนิดรับประทานจะรับทั้งหมด 5 ครั้ง เมื่ออายุ 2,4,6 และ 18 เดือน และให้วัคซีนกระตุ้นอีกครั้ง เมื่ออายุ 4-6 ปี วัคซีนโปลิโอชนิดฉีด ฉีดทั้งหมด 4 ครั้ง เมื่ออายุ 2,4, 6-18 เดือน และกระตุ้นอีกครั้ง เมื่ออายุ 4-6 ปีจะได้ประสิทธิภาพในการคุ้มกันได้ดีที่สุด (ยกเว้นเมื่อฉีดเข็มที่ 3 ตอนอายุประมาณ 4 ปี ไม่จำเป็นต้องฉีดซ้ำ)" },
        // { "vacnameen": "OPV,IPV", "vacage": "0-3 ปี", "vactype": "A", "period": 0, "time": 4, "vaccode": "A009", "vacnameth": "วัคซีนป้องกันโรคโปลิโอ (OPV, IPV)", "vactotal": "การรับวัคซีนป้องกันโรคโปลิโอจะรับทั้ง 2 ชนิด เพื่อครอบคลุมการสร้างภูมิคุ้มกันต่อเชื้อทั้ง 3 สายพันธุ์ วัคซีนโรคโปลิโอชนิดรับประทานจะรับทั้งหมด 5 ครั้ง เมื่ออายุ 2,4,6 และ 18 เดือน และให้วัคซีนกระตุ้นอีกครั้ง เมื่ออายุ 4-6 ปี วัคซีนโปลิโอชนิดฉีด ฉีดทั้งหมด 4 ครั้ง เมื่ออายุ 2,4, 6-18 เดือน และกระตุ้นอีกครั้ง เมื่ออายุ 4-6 ปีจะได้ประสิทธิภาพในการคุ้มกันได้ดีที่สุด (ยกเว้นเมื่อฉีดเข็มที่ 3 ตอนอายุประมาณ 4 ปี ไม่จำเป็นต้องฉีดซ้ำ)" },
        // { "vacnameen": "OPV,IPV", "vacage": "0-3 ปี", "vactype": "A", "period": 0, "time": 5, "vaccode": "A009", "vacnameth": "วัคซีนป้องกันโรคโปลิโอ (OPV, IPV)", "vactotal": "การรับวัคซีนป้องกันโรคโปลิโอจะรับทั้ง 2 ชนิด เพื่อครอบคลุมการสร้างภูมิคุ้มกันต่อเชื้อทั้ง 3 สายพันธุ์ วัคซีนโรคโปลิโอชนิดรับประทานจะรับทั้งหมด 5 ครั้ง เมื่ออายุ 2,4,6 และ 18 เดือน และให้วัคซีนกระตุ้นอีกครั้ง เมื่ออายุ 4-6 ปี วัคซีนโปลิโอชนิดฉีด ฉีดทั้งหมด 4 ครั้ง เมื่ออายุ 2,4, 6-18 เดือน และกระตุ้นอีกครั้ง เมื่ออายุ 4-6 ปีจะได้ประสิทธิภาพในการคุ้มกันได้ดีที่สุด (ยกเว้นเมื่อฉีดเข็มที่ 3 ตอนอายุประมาณ 4 ปี ไม่จำเป็นต้องฉีดซ้ำ)" },
        // { "vacnameen": "PCV", "vacage": "0-3 ปี", "vactype": "A", "period": 60, "time": 1, "vaccode": "A010", "vacnameth": "วัคซีนป้องกันโรคปอดอักเสบ นิวโมคอคคัส ชนิดคอนจูเกต (PCV)", "vactotal": "ฉีดทั้งหมด 3 ครั้ง เมื่ออายุ 2, 4 และ 12-15 เดือน" },
        // { "vacnameen": "PCV", "vacage": "0-3 ปี", "vactype": "A", "period": 60, "time": 2, "vaccode": "A010", "vacnameth": "วัคซีนป้องกันโรคปอดอักเสบ นิวโมคอคคัส ชนิดคอนจูเกต (PCV)", "vactotal": "ฉีดทั้งหมด 3 ครั้ง เมื่ออายุ 2, 4 และ 12-15 เดือน" },
        // { "vacnameen": "PCV", "vacage": "0-3 ปี", "vactype": "A", "period": 0, "time": 3, "vaccode": "A010", "vacnameth": "วัคซีนป้องกันโรคปอดอักเสบ นิวโมคอคคัส ชนิดคอนจูเกต (PCV)", "vactotal": "ฉีดทั้งหมด 3 ครั้ง เมื่ออายุ 2, 4 และ 12-15 เดือน" },
        // { "vacnameen": "Rota", "vacage": "0-3 ปี", "vactype": "A", "period": 60, "time": 1, "vaccode": "A011", "vacnameth": "วัคซีนป้องกันโรคติดเชื้อโรต้า (Rota)", "vactotal": "วัคซีนรับประทานทั้งหมด 3 ครั้ง เมื่ออายุ 2, 4 และ 6 เดือน" },
        // { "vacnameen": "Rota", "vacage": "0-3 ปี", "vactype": "A", "period": 60, "time": 1, "vaccode": "A011", "vacnameth": "วัคซีนป้องกันโรคติดเชื้อโรต้า (Rota)", "vactotal": "วัคซีนรับประทานทั้งหมด 3 ครั้ง เมื่ออายุ 2, 4 และ 6 เดือน" },
        // { "vacnameen": "Rota", "vacage": "0-3 ปี", "vactype": "A", "period": 0, "time": 2, "vaccode": "A011", "vacnameth": "วัคซีนป้องกันโรคติดเชื้อโรต้า (Rota)", "vactotal": "วัคซีนรับประทานทั้งหมด 3 ครั้ง เมื่ออายุ 2, 4 และ 6 เดือน" },
        // { "vacnameen": "HA", "vacage": "0-3 ปี", "vactype": "A", "period": 180, "time": 1, "vaccode": "A012", "vacnameth": "วัคซีนป้องกันโรคไวรัสตับอักเสบเอ  (HA)", "vactotal": "วัคซีนป้องกันไวรัสตับอักเสบเอ มี 2 ชนิด คือ -ชนิดเชื้อตาย ฉีดทั้งหมด 2 ครั้ง เมื่ออายุ 6 และ 12 เดือน -ชนิดเชื้อมีชีวิต ฉีดเพียง 1 ครั้ง เมื่ออายุ 18 เดือน" },
        // { "vacnameen": "HA", "vacage": "0-3 ปี", "vactype": "A", "period": 180, "time": 2, "vaccode": "A012", "vacnameth": "วัคซีนป้องกันโรคไวรัสตับอักเสบเอ  (HA)", "vactotal": "วัคซีนป้องกันไวรัสตับอักเสบเอ มี 2 ชนิด คือ -ชนิดเชื้อตาย ฉีดทั้งหมด 2 ครั้ง เมื่ออายุ 6 และ 12 เดือน -ชนิดเชื้อมีชีวิต ฉีดเพียง 1 ครั้ง เมื่ออายุ 18 เดือน" },
        // { "vacnameen": "HA", "vacage": "0-3 ปี", "vactype": "A", "period": 0, "time": 3, "vaccode": "A012", "vacnameth": "วัคซีนป้องกันโรคไวรัสตับอักเสบเอ  (HA)", "vactotal": "วัคซีนป้องกันไวรัสตับอักเสบเอ มี 2 ชนิด คือ -ชนิดเชื้อตาย ฉีดทั้งหมด 2 ครั้ง เมื่ออายุ 6 และ 12 เดือน -ชนิดเชื้อมีชีวิต ฉีดเพียง 1 ครั้ง เมื่ออายุ 18 เดือน" },
        // { "vacnameen": "VAR", "vacage": "0-3 ปี", "vactype": "A", "period": 360, "time": 1, "vaccode": "A013", "vacnameth": "วัคซีนป้องกันโรคอีสุกอีใส (VAR)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยเริ่มฉีดเมื่ออายุ 12 เดือน เเละ 4 ปี " },
        // { "vacnameen": "DTwP", "vacage": "4-12 ปี", "vactype": "B", "period": 920, "time": 5, "vaccode": "B001", "vacnameth": "วัคซีนรวมป้องกันโรคคอตีบ-บาดทะยัก-ไอกรน (DTwP)", "vactotal": "ฉีดทั้งหมด 5 ครั้ง เมื่อตอนอายุ 2, 4, 6, 18 เดือน และ 4-6 ปี" },
        // { "vacnameen": "OPV,IPV", "vacage": "4-12 ปี", "vactype": "B", "period": 0, "time": 5, "vaccode": "B002", "vacnameth": "วัคซีนป้องกันโรคโปลิโอ (OPV, IPV)", "vactotal": "วัคซีนป้องกันโรคโปลิโอสามารถเลือกได้ว่าจะฉีดชนิดใด โดยมีทั้งหมด 2  ชนิด คือ  วัคซีนโรคโปลิโอชนิดรับประทานจะรับทั้งหมด 5 ครั้ง เมื่ออายุ 2,4,6 และ 18 เดือน และให้วัคซีนกระตุ้นอีกครั้ง เมื่ออายุ 4-6 ปี  วัคซีนโปลิโอชนิดฉีด ฉีดทั้งหมด 5 ครั้ง เมื่ออายุ 2,4, 6,18 เดือน และกระตุ้นอีกครั้ง เมื่ออายุ 4-6 ปี" },
        // { "vacnameen": "HPV", "vacage": "4-12 ปี", "vactype": "B", "period": 30, "time": 1, "vaccode": "B003", "vacnameth": "วัคซีนป้องกันโรคมะเร็งปากมดลูก (HPV)", "vactotal": "วัคซีนมีทั้งหมด 2 ชนิดคือ -ชนิด 2 สายพันธุ์ (16,18) -ชนิด 4 สายพันธุ์ (6,11,16,18) ฉีดทั้งหมด 3 เข็ม ในเดือนที่ 0,1-2 เเละ 6" },
        // { "vacnameen": "HPV", "vacage": "4-12 ปี", "vactype": "B", "period": 180, "time": 2, "vaccode": "B003", "vacnameth": "วัคซีนป้องกันโรคมะเร็งปากมดลูก (HPV) ", "vactotal": "วัคซีนมีทั้งหมด 2 ชนิดคือ -ชนิด 2 สายพันธุ์ (16,18) -ชนิด 4 สายพันธุ์ (6,11,16,18) ฉีดทั้งหมด 3 เข็ม ในเดือนที่ 0,1-2 เเละ 6" },
        // { "vacnameen": "HPV", "vacage": "13-18 ปี", "vactype": "C", "period": 180, "time": 2, "vaccode": "C001", "vacnameth": "วัคซีนป้องกันโรคมะเร็งปากมดลูก (HPV) ", "vactotal": "วัคซีนมีทั้งหมด 2 ชนิดคือ -ชนิด 2 สายพันธุ์ (16,18) -ชนิด 4 สายพันธุ์ (6,11,16,18) ฉีดทั้งหมด 3 เข็ม ในเดือนที่ 0,1-2 เเละ 6" },
        // { "vacnameen": "HPV", "vacage": "13-18 ปี", "vactype": "C", "period": 0, "time": 3, "vaccode": "C001", "vacnameth": "วัคซีนป้องกันโรคมะเร็งปากมดลูก (HPV) ", "vactotal": "วัคซีนมีทั้งหมด 2 ชนิดคือ -ชนิด 2 สายพันธุ์ (16,18) -ชนิด 4 สายพันธุ์ (6,11,16,18) ฉีดทั้งหมด 3 เข็ม ในเดือนที่ 0,1-2 เเละ 6" },
        // { "vacnameen": "", "vacage": "13-18 ปี", "vactype": "C", "period": 365, "time": 1, "vaccode": "C002", "vacnameth": "วัคซีนป้องกันโรคไข้หวัดใหญ่ (Flu)", "vactotal": "ฉีดเพียง 1ครั้ง/ปี " },
        // { "vacnameen": "", "vacage": "19-26 ปี", "vactype": "D", "period": 0, "time": 1, "vaccode": "D001", "vacnameth": "วัคซีนรวมป้องกันโรคคอตีบ-บาดทะยัก-ไอกรน (Tdap)", "vactotal": "ฉีดเพียง 1 ครั้ง " },
        // { "vacnameen": "VAR", "vacage": "19-26 ปี", "vactype": "D", "period": 30, "time": 1, "vaccode": "D002", "vacnameth": "วัคซีนป้องกันโรคอีสุกอีใส (VAR)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 4-8 สัปดาห์" },
        // { "vacnameen": "VAR", "vacage": "19-26 ปี", "vactype": "D", "period": 0, "time": 1, "vaccode": "D002", "vacnameth": "วัคซีนป้องกันโรคอีสุกอีใส (VAR)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 4-8 สัปดาห์" },
        // { "vacnameen": "MMR", "vacage": "19-26 ปี", "vactype": "D", "period": 180, "time": 1, "vaccode": "D003", "vacnameth": "วัคซีนป้องกันโรคหัด-คางทูม- หัดเยอรมัน (MMR)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 6 เดือน" },
        // { "vacnameen": "MMR", "vacage": "19-26 ปี", "vactype": "D", "period": 180, "time": 1, "vaccode": "D003", "vacnameth": "วัคซีนป้องกันโรคหัด-คางทูม- หัดเยอรมัน (MMR)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 6 เดือน" },
        // { "vacnameen": "HPV", "vacage": "19-26 ปี", "vactype": "D", "period": 30, "time": 1, "vaccode": "D004", "vacnameth": "วัคซีนป้องกันโรคมะเร็งปากมดลูก (HPV)", "vactotal": "วัคซีนมีทั้งหมด 2 ชนิดคือ -ชนิด 2 สายพันธุ์ (16,18)  -ชนิด 4 สายพันธุ์ (6,11,16,18) ฉีดทั้งหมด 3 เข็ม ในเดือนที่ 0,1-2 เเละ 6" },
        // { "vacnameen": "HPV", "vacage": "19-26 ปี", "vactype": "D", "period": 120, "time": 2, "vaccode": "D004", "vacnameth": "วัคซีนป้องกันโรคมะเร็งปากมดลูก (HPV) ", "vactotal": "วัคซีนมีทั้งหมด 2 ชนิดคือ -ชนิด 2 สายพันธุ์ (16,18)  -ชนิด 4 สายพันธุ์ (6,11,16,18) ฉีดทั้งหมด 3 เข็ม ในเดือนที่ 0,1-2 เเละ 6" },
        // { "vacnameen": "HPV", "vacage": "19-26 ปี", "vactype": "D", "period": 0, "time": 3, "vaccode": "D004", "vacnameth": "วัคซีนป้องกันโรคมะเร็งปากมดลูก (HPV) ", "vactotal": "วัคซีนมีทั้งหมด 2 ชนิดคือ -ชนิด 2 สายพันธุ์ (16,18)  -ชนิด 4 สายพันธุ์ (6,11,16,18) ฉีดทั้งหมด 3 เข็ม ในเดือนที่ 0,1-2 เเละ 6" },
        // { "vacnameen": "Flu", "vacage": "19-26 ปี", "vactype": "D", "period": 365, "time": 1, "vaccode": "D005", "vacnameth": "วัคซีนป้องกันโรคไข้หวัดใหญ่ (Flu)", "vactotal": "ฉีดเพียง 1ครั้ง/ปี โดยเริ่มฉีดเมื่ออายุ 6 เดือนขึ้นไป" },
        // { "vacnameen": "HA", "vacage": "19-26 ปี", "vactype": "D", "period": 60, "time": 1, "vaccode": "D006", "vacnameth": "วัคซีนป้องกันโรคไวรัสตับอักเสบเอ  (HA)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 6 เดือน" },
        // { "vacnameen": "HA", "vacage": "19-26 ปี", "vactype": "D", "period": 0, "time": 2, "vaccode": "D006", "vacnameth": "วัคซีนป้องกันโรคไวรัสตับอักเสบเอ  (HA)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 6 เดือน" },
        // { "vacnameen": "HB", "vacage": "19-26 ปี", "vactype": "D", "period": 30, "time": 1, "vaccode": "D007", "vacnameth": "วัคซีนไวรัสตับอักเสบบี (HB)", "vactotal": "ฉีดทั้งหมด 3 ครั้ง เมื่อตอน 0, 1-2 และ 6 เดือน" },
        // { "vacnameen": "HB", "vacage": "19-26 ปี", "vactype": "D", "period": 180, "time": 2, "vaccode": "D007", "vacnameth": "วัคซีนไวรัสตับอักเสบบี (HB)", "vactotal": "ฉีดทั้งหมด 3 ครั้ง เมื่อตอน 0, 1-2 และ 6 เดือน" },
        // { "vacnameen": "HB", "vacage": "19-26 ปี", "vactype": "D", "period": 0, "time": 3, "vaccode": "D007", "vacnameth": "วัคซีนไวรัสตับอักเสบบี (HB)", "vactotal": "ฉีดทั้งหมด 3 ครั้ง เมื่อตอน 0, 1-2 และ 6 เดือน" },
        // { "vacnameen": "Tdap", "vacage": "27-64 ปี", "vactype": "E", "period": 0, "time": 1, "vaccode": "E001", "vacnameth": "วัคซีนรวมป้องกันโรคคอตีบ-บาดทะยัก-ไอกรน (Tdap)", "vactotal": "ฉีดเพียง 1 ครั้ง " },
        // { "vacnameen": "VAR", "vacage": "27-64 ปี", "vactype": "E", "period": 28, "time": 1, "vaccode": "E002", "vacnameth": "วัคซีนป้องกันโรคอีสุกอีใส (VAR)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 4-8 สัปดาห์" },
        // { "vacnameen": "VAR", "vacage": "27-64 ปี", "vactype": "E", "period": 0, "time": 2, "vaccode": "E002", "vacnameth": "วัคซีนป้องกันโรคอีสุกอีใส (VAR)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 4-8 สัปดาห์" },
        // { "vacnameen": "MMR", "vacage": "27-64 ปี", "vactype": "E", "period": 180, "time": 1, "vaccode": "E003", "vacnameth": "วัคซีนป้องกันโรคหัด-คางทูม- หัดเยอรมัน (MMR)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 6 เดือน" },
        // { "vacnameen": "MMR", "vacage": "27-64 ปี", "vactype": "E", "period": 0, "time": 2, "vaccode": "E003", "vacnameth": "วัคซีนป้องกันโรคหัด-คางทูม- หัดเยอรมัน (MMR)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 6 เดือน" },
        // { "vacnameen": "Flu", "vacage": "27-64 ปี", "vactype": "E", "period": 365, "time": 1, "vaccode": "E004", "vacnameth": "วัคซีนป้องกันโรคไข้หวัดใหญ่ (Flu)", "vactotal": "ฉีดเพียง 1ครั้ง/ปี " },
        // { "vacnameen": "Tdap", "vacage": "65 ปี ขึ้นไป", "vactype": "F", "period": 0, "time": 1, "vaccode": "F001", "vacnameth": "วัคซีนรวมป้องกันโรคคอตีบ-บาดทะยัก-ไอกรน (Tdap)", "vactotal": "ฉีดเพียง 1 ครั้ง " },
        // { "vacnameen": "Zoster", "vacage": "65 ปี ขึ้นไป", "vactype": "F", "period": 28, "time": 1, "vaccode": "F002", "vacnameth": "วัคซีนป้องกันโรคงูสวัด (Zoster)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 4-8 สัปดาห์" },
        // { "vacnameen": "VAR", "vacage": "65 ปี ขึ้นไป", "vactype": "F", "period": 0, "time": 2, "vaccode": "F003", "vacnameth": "วัคซีนป้องกันโรคอีสุกอีใส (VAR)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 4-8 สัปดาห์" },
        // { "vacnameen": "Flu", "vacage": "65 ปี ขึ้นไป", "vactype": "F", "period": 365, "time": 1, "vaccode": "F004", "vacnameth": "วัคซีนป้องกันโรคไข้หวัดใหญ่ (Flu)", "vactotal": "ฉีดเพียง 1ครั้ง/ปี " },
        // { "vacnameen": "Zostavax®", "vacage": "65 ปี ขึ้นไป", "vactype": "F", "period": 0, "time": 1, "vaccode": "F005", "vacnameth": "วัคซีนป้องกันโรคงูสวัด (Zostavax®)", "vactotal": "ฉีดเพียง 1 ครั้ง" },
        // { "vacnameen": "HB", "vacage": "65 ปี ขึ้นไป", "vactype": "F", "period": 30, "time": 1, "vaccode": "F006", "vacnameth": "วัคซีนไวรัสตับอักเสบบี (HB)", "vactotal": "ฉีดทั้งหมด 3 ครั้ง เมื่อตอน 0, 1-2 และ 6 เดือน" },
        // { "vacnameen": "HB", "vacage": "65 ปี ขึ้นไป", "vactype": "F", "period": 180, "time": 2, "vaccode": "F006", "vacnameth": "วัคซีนไวรัสตับอักเสบบี (HB)", "vactotal": "ฉีดทั้งหมด 3 ครั้ง เมื่อตอน 0, 1-2 และ 6 เดือน" },
        // { "vacnameen": "HB", "vacage": "65 ปี ขึ้นไป", "vactype": "F", "period": 0, "time": 3, "vaccode": "F006", "vacnameth": "วัคซีนไวรัสตับอักเสบบี (HB)", "vactotal": "ฉีดทั้งหมด 3 ครั้ง เมื่อตอน 0, 1-2 และ 6 เดือน" },
        // { "vacnameen": "", "vacage": "65 ปี ขึ้นไป", "vactype": "F", "period": 365, "time": 1, "vaccode": "F007", "vacnameth": "วัคซีนป้องกันโรคปอดอักเสบ", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยฉีดชนิด PCV13 ก่อน จากนั้นถึงฉีดPPSV23 ให้ห่างกัน 12 เดือน" },
        // { "vacnameen": "", "vacage": "65 ปี ขึ้นไป", "vactype": "F", "period": 0, "time": 2, "vaccode": "F007", "vacnameth": "วัคซีนป้องกันโรคปอดอักเสบ", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยฉีดชนิด PCV13 ก่อน จากนั้นถึงฉีดPPSV23 ให้ห่างกัน 12 เดือน" },
        { "vacnameen": "HB", "vacage": "บุคคลากรทางการแพทย์", "vactype": "G", "period": 30, "time": 1, "vaccode": "G001", "vacnameth": "วัคซีนไวรัสตับอักเสบบี (HB)", "vactotal": "ฉีดทั้งหมด 3 ครั้ง เมื่อตอน 0, 1-2 และ 6 เดือน" },
        { "vacnameen": "HB", "vacage": "บุคคลากรทางการแพทย์", "vactype": "G", "period": 180, "time": 2, "vaccode": "G001", "vacnameth": "วัคซีนไวรัสตับอักเสบบี (HB)", "vactotal": "ฉีดทั้งหมด 3 ครั้ง เมื่อตอน 0, 1-2 และ 6 เดือน" },
        { "vacnameen": "HB", "vacage": "บุคคลากรทางการแพทย์", "vactype": "G", "period": 0, "time": 3, "vaccode": "G001", "vacnameth": "วัคซีนไวรัสตับอักเสบบี (HB)", "vactotal": "ฉีดทั้งหมด 3 ครั้ง เมื่อตอน 0, 1-2 และ 6 เดือน" },
        { "vacnameen": "Flu", "vacage": "บุคคลากรทางการแพทย์", "vactype": "G", "period": 365, "time": 1, "vaccode": "G002", "vacnameth": "วัคซีนป้องกันโรคไข้หวัดใหญ่ (Flu)", "vactotal": "ฉีดเพียง 1ครั้ง/ปี" },
        { "vacnameen": "MMR", "vacage": "บุคคลากรทางการแพทย์", "vactype": "G", "period": 0, "time": 1, "vaccode": "G003", "vacnameth": "วัคซีนป้องกันโรคหัด-คางทูม- หัดเยอรมัน (MMR)", "vactotal": "ฉีดเพียง 1 ครั้ง" },
        { "vacnameen": "VAR", "vacage": "บุคคลากรทางการแพทย์", "vactype": "G", "period": 28, "time": 1, "vaccode": "G004", "vacnameth": "วัคซีนป้องกันโรคอีสุกอีใส (VAR)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 4-8 สัปดาห์" },
        { "vacnameen": "VAR", "vacage": "บุคคลากรทางการแพทย์", "vactype": "G", "period": 0, "time": 2, "vaccode": "G004", "vacnameth": "วัคซีนป้องกันโรคอีสุกอีใส (VAR)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 4-8 สัปดาห์" },
        { "vacnameen": "Tdap", "vacage": "บุคคลากรทางการแพทย์", "vactype": "G", "period": 0, "time": 1, "vaccode": "G005", "vacnameth": "วัคซีนรวมป้องกันโรคคอตีบ-บาดทะยัก-ไอกรน (Tdap)", "vactotal": "ฉีดทั้งหมด 1 ครั้ง" },
        { "vacnameen": "Flu", "vacage": "ผู้สัมผัสสัตว์", "vactype": "H", "period": 365, "time": 1, "vaccode": "H001", "vacnameth": "วัคซีนป้องกันโรคไข้หวัดใหญ่ (Flu)", "vactotal": "ฉีดเพียง 1ครั้ง/ปี" },
        { "vacnameen": "HRIG", "vacage": "ผู้สัมผัสสัตว์", "vactype": "H", "period": 7, "time": 1, "vaccode": "H002", "vacnameth": "วัคซีนป้องกันโรคพิษสุนัขบ้า (HRIG)", "vactotal": "สำหรับผู้ที่ฉีดก่อนสัมผัสเชื้อ ฉีดทั้งหมด 3 ครั้ง โดยแต่ละเข็มห่างกัน 7 วัน" },
        { "vacnameen": "HRIG", "vacage": "ผู้สัมผัสสัตว์", "vactype": "H", "period": 7, "time": 2, "vaccode": "H002", "vacnameth": "วัคซีนป้องกันโรคพิษสุนัขบ้า (HRIG)", "vactotal": "สำหรับผู้ที่ฉีดก่อนสัมผัสเชื้อ ฉีดทั้งหมด 3 ครั้ง โดยแต่ละเข็มห่างกัน 7 วัน" },
        { "vacnameen": "HRIG", "vacage": "ผู้สัมผัสสัตว์", "vactype": "H", "period": 0, "time": 3, "vaccode": "H002", "vacnameth": "วัคซีนป้องกันโรคพิษสุนัขบ้า (HRIG)", "vactotal": "สำหรับผู้ที่ฉีดก่อนสัมผัสเชื้อ ฉีดทั้งหมด 3 ครั้ง โดยแต่ละเข็มห่างกัน 7 วัน" },
        { "vacnameen": "JE", "vacage": "ผู้สัมผัสสัตว์", "vactype": "H", "period": 0, "time": 1, "vaccode": "H003", "vacnameth": "วัคซีนป้องกันโรคโรคไข้สมองอักเสบเจอี (JE)", "vactotal": "ฉีดเพียง 1 ครั้ง " },
        { "vacnameen": "Tdap", "vacage": "ผู้หญิงตั้งครรภ์", "vactype": "I", "period": 0, "time": 1, "vaccode": "I001", "vacnameth": "วัคซีนรวมป้องกันโรคคอตีบ-บาดทะยัก-ไอกรน (Tdap)", "vactotal": "ฉีดเพียง 1 ครั้ง เมื่อตอนอายุครรภ์ 27-36 สัปดาห์" },
        { "vacnameen": "Flu", "vacage": "ผู้หญิงตั้งครรภ์", "vactype": "I", "period": 0, "time": 1, "vaccode": "I002", "vacnameth": "วัคซีนป้องกันโรคไข้หวัดใหญ่ (Flu)", "vactotal": "ฉีดเพียง 1ครั้ง เมื่ออายุครรภ์ >14สัปดาห์" },
        { "vacnameen": "Tdap", "vacage": "ผู้ใกล้ชิดเด็ก", "vactype": "J", "period": 0, "time": 1, "vaccode": "J001", "vacnameth": "วัคซีนรวมป้องกันโรคคอตีบ-บาดทะยัก-ไอกรน (Tdap)", "vactotal": "ฉีดเพียง 1 ครั้ง " },
        { "vacnameen": "MMR", "vacage": "ผู้ใกล้ชิดเด็ก", "vactype": "J", "period": 30, "time": 1, "vaccode": "J002", "vacnameth": "วัคซีนป้องกันโรคหัด-คางทูม- หัดเยอรมัน (MMR)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 1 เดือน" },
        { "vacnameen": "MMR", "vacage": "ผู้ใกล้ชิดเด็ก", "vactype": "J", "period": 0, "time": 2, "vaccode": "J002", "vacnameth": "วัคซีนป้องกันโรคหัด-คางทูม- หัดเยอรมัน (MMR)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 1 เดือน" },
        { "vacnameen": "Flu", "vacage": "ผู้ใกล้ชิดเด็ก", "vactype": "J", "period": 0, "time": 1, "vaccode": "J003", "vacnameth": "วัคซีนป้องกันโรคไข้หวัดใหญ่ (Flu)", "vactotal": "ฉีดเพียง 1ครั้ง เมื่ออายุครรภ์ >14สัปดาห์" },
        { "vacnameen": "VAR", "vacage": "ผู้ใกล้ชิดเด็ก", "vactype": "J", "period": 30, "time": 1, "vaccode": "J004", "vacnameth": "วัคซีนป้องกันโรคอีสุกอีใส (VAR)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 1 เดือน" },
        { "vacnameen": "VAR", "vacage": "ผู้ใกล้ชิดเด็ก", "vactype": "J", "period": 0, "time": 2, "vaccode": "J004", "vacnameth": "วัคซีนป้องกันโรคอีสุกอีใส (VAR)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 1 เดือน" },
        { "vacnameen": "HA", "vacage": "ผู้ป่วยโรคเรื้อรัง", "vactype": "K", "period": 180, "time": 1, "vaccode": "K001", "vacnameth": "วัคซีนป้องกันโรคไวรัสตับอักเสบเอ  (HA)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 6 เดือน" },
        { "vacnameen": "HA", "vacage": "ผู้ป่วยโรคเรื้อรัง", "vactype": "K", "period": 0, "time": 2, "vaccode": "K001", "vacnameth": "วัคซีนป้องกันโรคไวรัสตับอักเสบเอ  (HA)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 6 เดือน" },
        { "vacnameen": "", "vacage": "ผู้ป่วยโรคเรื้อรัง", "vactype": "K", "period": 365, "time": 1, "vaccode": "K002", "vacnameth": "วัคซีนป้องกันโรคปอดอักเสบ", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยฉีดชนิด PCV13 ก่อน จากนั้นถึงฉีดPPSV23 ให้ห่างกัน 12 เดือน" },
        { "vacnameen": "", "vacage": "ผู้ป่วยโรคเรื้อรัง", "vactype": "K", "period": 0, "time": 2, "vaccode": "K002", "vacnameth": "วัคซีนป้องกันโรคปอดอักเสบ", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยฉีดชนิด PCV13 ก่อน จากนั้นถึงฉีดPPSV23 ให้ห่างกัน 12 เดือน" },
        { "vacnameen": "", "vacage": "Africa", "vactype": "L", "period": 30, "time": 1, "vaccode": "L001", "vacnameth": "วัคซีนป้องกันโรคหัด", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 1 เดือน" },
        { "vacnameen": "", "vacage": "Africa", "vactype": "L", "period": 0, "time": 2, "vaccode": "L001", "vacnameth": "วัคซีนป้องกันโรคหัด", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 1 เดือน" },
        { "vacnameen": "", "vacage": "Africa", "vactype": "L", "period": 0, "time": 1, "vaccode": "L002", "vacnameth": "วัคซีนป้องกันโรคไข้เหลือง ", "vactotal": "ฉีดเพียง 1 ครั้ง" },
        { "vacnameen": "IPV", "vacage": "Africa", "vactype": "L", "period": 60, "time": 1, "vaccode": "L003", "vacnameth": "วัคซีนป้องกันโรคโปลิโอ (IPV)", "vactotal": "ฉีดเพียง 1 ครั้ง ก่อนเดินทาง 4-6 สัดาห์" },
        { "vacnameen": "HA", "vacage": "Africa", "vactype": "L", "period": 180, "time": 1, "vaccode": "L004", "vacnameth": "วัคซีนป้องกันโรคไวรัสตับอักเสบเอ  (HA)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 6 เดือน" },
        { "vacnameen": "HA", "vacage": "Africa", "vactype": "L", "period": 0, "time": 2, "vaccode": "L004", "vacnameth": "วัคซีนป้องกันโรคไวรัสตับอักเสบเอ  (HA)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 6 เดือน" },
        { "vacnameen": "Ty21a", "vacage": "Africa", "vactype": "L", "period": 0, "time": 1, "vaccode": "L005", "vacnameth": "วัคซีนป้องกันโรคทัยฟอยด์ (Ty21a)", "vactotal": "ฉีดทั้งหมด 1 ครั้ง โดยฉีดล่วงหน้า 2 สัปดาห์ ก่อนเดินทางไปในพื้นที่ที่เสี่ยงต่อการติดเชื้อทัยฟอยด์" },
        { "vacnameen": "", "vacage": "North America", "vactype": "M", "period": 30, "time": 1, "vaccode": "M001", "vacnameth": "วัคซีนป้องกันโรคหัด", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 1 เดือน" },
        { "vacnameen": "", "vacage": "North America", "vactype": "M", "period": 30, "time": 2, "vaccode": "M001", "vacnameth": "วัคซีนป้องกันโรคหัด", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 1 เดือน" },
        { "vacnameen": "HA", "vacage": "North America", "vactype": "M", "period": 180, "time": 1, "vaccode": "M002", "vacnameth": "วัคซีนป้องกันโรคไวรัสตับอักเสบเอ  (HA)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 6 เดือน" },
        { "vacnameen": "HA", "vacage": "North America", "vactype": "M", "period": 0, "time": 2, "vaccode": "M002", "vacnameth": "วัคซีนป้องกันโรคไวรัสตับอักเสบเอ  (HA)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 6 เดือน" },
        { "vacnameen": "Ty21a", "vacage": "North America", "vactype": "M", "period": 0, "time": 1, "vaccode": "M003", "vacnameth": "วัคซีนป้องกันโรคทัยฟอยด์ (Ty21a)", "vactotal": "ฉีดทั้งหมด 1 ครั้ง โดยฉีดล่วงหน้า 2 สัปดาห์ ก่อนเดินทางไปในพื้นที่ที่เสี่ยงต่อการติดเชื้อทัยฟอยด์" },
        { "vacnameen": "", "vacage": "Oceania/Australia", "vactype": "N", "period": 30, "time": 1, "vaccode": "N001", "vacnameth": "วัคซีนป้องกันโรคหัด", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 1 เดือน" },
        { "vacnameen": "", "vacage": "Oceania/Australia", "vactype": "N", "period": 0, "time": 2, "vaccode": "N001", "vacnameth": "วัคซีนป้องกันโรคหัด", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 1 เดือน" },
        { "vacnameen": "IPV", "vacage": "Oceania/Australia", "vactype": "N", "period": 60, "time": 1, "vaccode": "N002", "vacnameth": "วัคซีนป้องกันโรคโปลิโอ (IPV)", "vactotal": "ฉีดเพียง 1 ครั้ง ก่อนเดินทาง 4-6 สัดาห์" },
        { "vacnameen": "HA", "vacage": "Oceania/Australia", "vactype": "N", "period": 180, "time": 1, "vaccode": "N003", "vacnameth": "วัคซีนป้องกันโรคไวรัสตับอักเสบเอ  (HA)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 6 เดือน" },
        { "vacnameen": "HA", "vacage": "Oceania/Australia", "vactype": "N", "period": 0, "time": 2, "vaccode": "N003", "vacnameth": "วัคซีนป้องกันโรคไวรัสตับอักเสบเอ  (HA)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 6 เดือน" },
        { "vacnameen": "Ty21a", "vacage": "Oceania/Australia", "vactype": "N", "period": 0, "time": 1, "vaccode": "N004", "vacnameth": "วัคซีนป้องกันโรคทัยฟอยด์ (Ty21a)", "vactotal": "ฉีดทั้งหมด 1 ครั้ง โดยฉีดล่วงหน้า 2 สัปดาห์ ก่อนเดินทางไปในพื้นที่ที่เสี่ยงต่อการติดเชื้อทัยฟอยด์" },
        { "vacnameen": "", "vacage": "South America", "vactype": "O", "period": 30, "time": 1, "vaccode": "O001", "vacnameth": "วัคซีนป้องกันโรคหัด", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 1 เดือน" },
        { "vacnameen": "", "vacage": "South America", "vactype": "O", "period": 0, "time": 2, "vaccode": "O001", "vacnameth": "วัคซีนป้องกันโรคหัด", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 1 เดือน" },
        { "vacnameen": "", "vacage": "South America", "vactype": "O", "period": 0, "time": 1, "vaccode": "O002", "vacnameth": "วัคซีนป้องกันโรคไข้เหลือง ", "vactotal": "ฉีดเพียง 1 ครั้ง" },
        { "vacnameen": "HA", "vacage": "South America", "vactype": "O", "period": 180, "time": 1, "vaccode": "O003", "vacnameth": "วัคซีนป้องกันโรคไวรัสตับอักเสบเอ  (HA)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 6 เดือน" },
        { "vacnameen": "HA", "vacage": "South America", "vactype": "O", "period": 0, "time": 2, "vaccode": "O003", "vacnameth": "วัคซีนป้องกันโรคไวรัสตับอักเสบเอ  (HA)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 6 เดือน" },
        { "vacnameen": "Ty21a", "vacage": "South America", "vactype": "O", "period": 0, "time": 1, "vaccode": "O004", "vacnameth": "วัคซีนป้องกันโรคทัยฟอยด์ (Ty21a)", "vactotal": "ฉีดทั้งหมด 1 ครั้ง โดยฉีดล่วงหน้า 2 สัปดาห์ ก่อนเดินทางไปในพื้นที่ที่เสี่ยงต่อการติดเชื้อทัยฟอยด์" },
        { "vacnameen": "", "vacage": "Asia", "vactype": "P", "period": 30, "time": 1, "vaccode": "P001", "vacnameth": "วัคซีนป้องกันโรคหัด", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 1 เดือน" },
        { "vacnameen": "", "vacage": "Asia", "vactype": "P", "period": 0, "time": 2, "vaccode": "P001", "vacnameth": "วัคซีนป้องกันโรคหัด", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 1 เดือน" },
        { "vacnameen": "HA", "vacage": "Asia", "vactype": "P", "period": 180, "time": 1, "vaccode": "P002", "vacnameth": "วัคซีนป้องกันโรคไวรัสตับอักเสบเอ  (HA)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 6 เดือน" },
        { "vacnameen": "HA", "vacage": "Asia", "vactype": "P", "period": 0, "time": 2, "vaccode": "P002", "vacnameth": "วัคซีนป้องกันโรคไวรัสตับอักเสบเอ  (HA)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 6 เดือน" },
        { "vacnameen": "Ty21a", "vacage": "Asia", "vactype": "P", "period": 0, "time": 1, "vaccode": "P003", "vacnameth": "วัคซีนป้องกันโรคทัยฟอยด์ (Ty21a)", "vactotal": "ฉีดทั้งหมด 1 ครั้ง โดยฉีดล่วงหน้า 2 สัปดาห์ ก่อนเดินทางไปในพื้นที่ที่เสี่ยงต่อการติดเชื้อทัยฟอยด์" },
        { "vacnameen": "IPV", "vacage": "Asia", "vactype": "P", "period": 60, "time": 1, "vaccode": "P004", "vacnameth": "วัคซีนป้องกันโรคโปลิโอ (IPV)", "vactotal": "ฉีดเพียง 1 ครั้ง ก่อนเดินทาง 4-6 สัดาห์" },
        { "vacnameen": "", "vacage": "Europe", "vactype": "Q", "period": 30, "time": 1, "vaccode": "Q001", "vacnameth": "วัคซีนป้องกันโรคหัด", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 1 เดือน" },
        { "vacnameen": "", "vacage": "Europe", "vactype": "Q", "period": 0, "time": 2, "vaccode": "Q001", "vacnameth": "วัคซีนป้องกันโรคหัด", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 1 เดือน" },
        { "vacnameen": "HA", "vacage": "Europe", "vactype": "Q", "period": 180, "time": 1, "vaccode": "Q002", "vacnameth": "วัคซีนป้องกันโรคไวรัสตับอักเสบเอ  (HA)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 6 เดือน" },
        { "vacnameen": "HA", "vacage": "Europe", "vactype": "Q", "period": 0, "time": 2, "vaccode": "Q002", "vacnameth": "วัคซีนป้องกันโรคไวรัสตับอักเสบเอ  (HA)", "vactotal": "ฉีดทั้งหมด 2 ครั้ง โดยห่างกัน 6 เดือน" }
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

    data.forEach(dt => {
        vac2Collection.add(dt)
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
            "data2": allVac.length,
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

app.post('/testadd' , (req, res) => {
    let get = {
        "time" : new Date()
    }
    keepdateCollection.add(get)
    res.json({
        "message" : get
    })
}) 


//vac_user collection
app.post('/addVacByUser', (req, res) => {

    let ms = null;
    let setNewVac;
    let dataV =[];
    let pr = 0;

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
            d.setDate(d.getDate() + pr);
            var dd = d.getDate();
            var mm = d.getMonth() + 1;
            var y = d.getFullYear();

            timeS.push({
                "time" : e.time,
                "date_to": y + '-' + ("0" + mm).slice(-2)  + '-' + ("0" + dd).slice(-2),
                "current_times" : req.body.start_date
            })

            pr += e.period;
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

        //await deleteUser(req.body.email,req.body.vaccode);

        // eslint-disable-next-line promise/no-nesting
        const deleeee = keepdateCollection.where("email","==",req.body.email).where("vaccode","==",req.body.vaccode).get().then(async snapshot => {
             await snapshot.forEach(doc => {
                if(doc.id !== undefined && doc.id !== "" && doc.id !== null){
                    keepdateCollection.doc(doc.id).delete();
                }
            })
            return res.json({
                "statuscode":200,
                "message": "ms",
            })
        })
        .catch(err => {
            console.log('error', err);
            res.json({
                "message": "error" + err,
            })
        })

        await timeS.forEach(dt => {
            let keep = {
                "email": req.body.email,
                "vaccode": req.body.vaccode,
                "vacnameth": req.body.vacnameth,
                "vacnameen": req.body.vacnameen,
                "start_from": req.body.start_from,
                "start_date": req.body.start_date,
                "hospital": req.body.hospital,
                "vacdate": dt.date_to,
                "time" : dt.time,
                "adddate" : new Date()
            }
            
            keepdateCollection.add(keep)
        })


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

function deleteUser(email, vCode) {
    keepdateCollection.where("email","==",req.body.email).where("vaccode","==",req.body.vaccode).get().then(async snapshot => {
        await snapshot.forEach(doc => {
            if(doc.id !== undefined && doc.id !== "" && doc.id !== null){
                keepdateCollection.doc(doc.id).delete();
            }
        })
        return res.json({
            "statuscode":200,
            "message": ms,
        })
    })
    .catch(err => {
        console.log('error', err);
        res.json({
            "message": "error" + err,
        })
    })
}

app.get('/deleteuservac', (req, res, ) => {
    keepdateCollection.where("email","==","ktpskid@gmail.com").where("vaccode","==","A002").get().then(async snapshot => {
        await snapshot.forEach(doc => {
            if(doc.id !== undefined && doc.id !== "" && doc.id !== null){
                keepdateCollection.doc(doc.id).delete();
            }
        })
        return res.json({
            "statuscode":200,
            "message": "ms",
        })
    })
    .catch(err => {
        console.log('error', err);
        res.json({
            "message": "error" + err,
        })
    })
});

app.post('/gethisByDate', (req, res, ) => {
    let allVac = [];
    let finds = [];
    let checkVal = true;
    let resMes;
    keepdateCollection.where("email","==",req.body.email).where("vacdate","==",req.body.vacdate).orderBy("adddate","desc").get().then(async snapshot => {
        await snapshot.forEach(doc => {

            let chks = finds.indexOf(doc.data().vaccode)
            if(chks < 0){
                finds.push(doc.data().vaccode)
                allVac.push(doc.data())
            }
        })

        return res.json({
            "statuscode": 200,
            "login": resMes,
            "message": allVac,
            //"data" : alluser
        })
    })
        .catch(err => {
            console.log('error', err);
            res.json({
                "message": "error" + err,
            })
        })
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

// exports.hello = functions.region("asia-east2").https.onRequest((req, res) => {
    
//     res.send('Hello GET ')
// })
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });



