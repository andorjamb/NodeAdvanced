'use strict';

const express = require('express');
const app = express();

const path = require('path');
const fetch = require('node-fetch');

const { host, port } = require('./config.json');


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'pages'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => res.render('menu', { title: 'Menu', header: 'Menu' }));


app.get('/all', (req, res) =>
    fetch('http://localhost:4000/api/computers', { mode: 'cors' }))
    .then(data => data.json())
    .then(result => res.render('allPage', {
        title: 'Computers',
        header: 'All Comuters',
        data: result
    }))
    .catch(err => sendError(res, err));


app.get('/add', (req, res) => res.render('form', {
    title: 'Add',
    header: 'Fill in the fields',
    action: '/add',
    fields: [

        { name: 'Id' },
        { name: 'Name' },
        { name: 'Type' },
        { name: 'Processor' },
        { name: 'Amount' },


    ]
}
));

app.post('/add', (req, res) => {
    const computer = req.body;
    const options = {
        method: 'POST',
        mode: 'cors',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(computer)
    };
    fetch('https://localhost:4000/api/coputers', options)
        .then(data => data.json())
        .then(status => sendStatus(res, status))
        .catch(error => sendError(res, error));
});

app.get('/update', (req, res) => res.render('form', {
    title: 'Update',
    header: 'Fill in the data',
    action: '/update',
    fields: [
        { name: 'Id' },
        { name: 'Name', readonly: true },
        { name: 'Type', readonly: true },
        { name: 'Processor', readonly: true },
        { name: 'Amount', readonly: true },

    ]
}
));

app.post('/update', async (req, res) => {
    try {
        const id = req.body.id;
        const data = await fetch('http://localhost:4000/api/computers/${id}', { mode: 'cors' }
        );
        const computer = await data.json();
        if (computer.message) {
            sendStatus(res, computer)
        }
        else {
            res.render('form', {
                title: 'Update',
                header: 'Fill in the data',
                action: '/update',
                fields: [
                    { name: 'Id', readonly: true },
                    { name: 'Name', value: computer.name },
                    { name: 'Type', value: computer.type },
                    { name: 'Processor', value: computer.processor },
                    { name: 'Amount', value: computer.amount },

                ]
            })
        }

    }
    catch (error) {
        sendError(res, error);
    }
});

app.get('/remove', (req, res) => {

})

app.post('/remove', (req, res) => {
    const id = req.body.id;
    fetch(`http://localhost:4000/api/computers/${id}`)

})

app.get('/getone', (req, res) => {
    res.render('idform', {
        title: 'Computer',
        header: 'Get computer',
        action: '/getone',
    })
})

app.post('/getone', (req, res) => {
    const id = req.body.id;
    fetch(`http://localhost:4000/api/computers/${id}`)

})


app.listen(port, host, () => { console.log(`Server is listening on ${host} : ${port}`) });

function sendStatus(res, status, title = "Status", header = "Status") {
    res.render('statusPage', { title, header, status });
};

function sendError(res, error) {
    sendStatus(res, error, 'Error', 'Error');
}

