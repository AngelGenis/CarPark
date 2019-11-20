"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const express_1 = require("express");
admin.initializeApp();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: true }));
app.post('cliente/register/:object', async (req, res) => {
    try {
        let obj = req.param.object;
        const clientes = await admin.firestore().doc(`Clientes/${obj.body.email}`).set({});
        res.send(clientes);
    }
    catch (e) {
        console.log(e);
        express_1.response.status(500).send(e);
    }
});
app.post('/cliente/login/:object', async (req, res) => {
    try {
        let obj = req.param.object;
        const clientes = await admin.firestore().doc(`Clientes/${obj.email}`).set({});
        res.send(clientes);
    }
    catch (e) {
        console.log(e);
        express_1.response.status(500).send(e);
    }
});
app.get('/login/:email', async (req, res) => {
    try {
        const clientes = await admin.firestore().doc(`Clientes/${req.params.email}`).get();
        res.send(clientes.data());
    }
    catch (e) {
        console.log(e);
        express_1.response.status(500).send(e);
    }
});
exports.widgets = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map