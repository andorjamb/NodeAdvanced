'use strict';

import * as path from 'path';

import fetch from 'node-fetch'; //npm install node-fetch
// import  {fetch} from './fetchlib.js';

//define require
import {createRequire} from 'module';
const require = createRequire(import.meta.url);
//define __dirname
import { fileURLToPath } from 'url';
const __dirname = fileURLToPath(new URL('.', import.meta.url));

const express = require('express');
const app = express();
const {port,host}=require('./config.json');

app.use(express.json());
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res)=>res.sendFile(path.join(__dirname,'menu.html')));

app.get('/getAll', (req,res)=>{
    fetch('http://localhost:4000/api/computers')
        .then(data=>data.json())
        .then(result=>res.json(result))
        .catch(err=>res.json(err));
});

app.get('/getOne/:id',(req,res)=>{
    fetch(`http://localhost:4000/api/computers/${req.params.id}`)
        .then(data => data.json())
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.post('/add',(req,res)=>{
    const computer=req.body;
    const options={
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(computer)
    };
    fetch('http://localhost:4000/api/computers',options)
        .then(data => data.json())
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.post('/update', (req,res)=>{
    const computer=req.body;
    const options={
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(computer)
    };
    fetch(`http://localhost:4000/api/computers/${computer.id}`,options)
        .then(data => data.json())
        .then(result => res.json(result))
        .catch(err => res.json(err));
});

app.post('/remove',(req,res)=>{
    const computerId=req.body.id;
    const options={
        method:'DELETE'
    };
    if(computerId && computerId.length>0){
        fetch(`http://localhost:4000/api/computers/${computerId}`, options)
            .then(data => data.json())
            .then(result => res.json(result))
            .catch(err => res.json(err));
    }
    else{
        res.json({message:'empty id', type:'error'});
    }
});


app.all('*', (req,res)=> res.json('not supported'));

app.listen(port,host,()=>console.log(`${host}:${port} serving...`));