import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { response } from 'express';

admin.initializeApp();

const express =  require('express');
const cors = require('cors');

const app = express();


app.use(cors({ origin: true}));

app.post('/register/:object',async(req: { param: { object: any; }; },res: { send: (arg0: FirebaseFirestore.WriteResult) => void; }) =>{

    try{
        let obj = req.param.object;
        const clientes = await admin.firestore().doc(`Clientes/${obj.email}`).set({

        });
        res.send(clientes);
    } catch(e){
        console.log(e);
        response.status(500).send(e);
    }
});


app.get('/login/:email', async (req: { params: { email: any; }; }, res: { send: (arg0: FirebaseFirestore.DocumentData | undefined) => void; }) => {
    try{
        const clientes = await admin.firestore().doc(`Clientes/${req.params.email}`).get();
        res.send(clientes.data())
    } catch(e){
        console.log(e);
        response.status(500).send(e);
    }

});

exports.widgets = functions.https.onRequest(app);

