import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { response } from 'express';
import { _objectWithOptions } from 'firebase-functions/lib/providers/storage';
// import * as bcrypt from 'bcrypt';

const bcrypt = require('bcrypt');


const bodyParser = require('body-parser');
// const jsonparser =bodyParser.json();

const express =  require('express');
const cors = require('cors');

admin.initializeApp();
const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true}));


app.post('cliente/register/',async(req: { body: any; },res: { send: (arg0: FirebaseFirestore.WriteResult) => void; }) =>{

    try{
        const obj = req.body;
        const exists = await admin.firestore().doc(`Clientes/${obj.email}`).get();
        
        if(exists){
            response.status(500).send('Ya se encuentra registrado');
        }else {
            let hashres;
            bcrypt.hash(obj.clave, 10, function(_err: any,hash: any){
                hashres = hash;
            })

            admin.auth().createUser({
                displayName: obj.nombre+' '+obj.apellido,
                phoneNumber: obj.telefono,
                email: obj.email,
                password:hashres,
                disabled:false
            }).then(function(userRecord){
                console.log("User new: ", userRecord);
            }).catch(function(err){
                console.log(err);
            })
    
            const clientes = await admin.firestore().doc(`Clientes/${obj.email}`).set({
                nombre: obj.nombre,
                apellido: obj.apellido,
                clave: hashres,
                telefono: obj.telefono,
                direccion: obj.direccion,
                email: obj.email
            },{merge:true});
    
            res.send(clientes);
        }
    } catch(e){
        console.log(e);
        response.status(500).send(e);
        }
});


app.post('/cliente/login/:object',async(req: { param: { object: any; }; },res: { send: (arg0: FirebaseFirestore.WriteResult) => void; }) =>{
    try{
        const obj = req.param.object;
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

