const express = require('express')
const app = express()
const port = 3002
const path = require('path');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const inventoryManager = require('../Back-End/InventoryManager');
let db;

app.get('/', async (req, res) => {
   db = await inventoryManager.initializeInventoryManager();
   res.sendFile(path.join(__dirname+'/index.html'));
})

app.get('/create-item', (req, res) => {
    res.sendFile(path.join(__dirname+'/createItem.html'));
})

app.get('/item', async (req, res) => {
    console.log(req.query.id);
    let item = await inventoryManager.getItem(db, req.query.id);
    res.setHeader('Content-Type', 'application/json');
    res.send({ data: item });
})

app.get('/get-all-items', async (req, res) => {
    let items = await inventoryManager.getAllItems(db);
    console.log(items);
    res.setHeader('Content-Type', 'application/json');
    res.send({ data: items });
})

app.post('/create-item', async (req, res) => {
    let body = req.body;
    body.quantity = parseInt(body.quantity);
    await inventoryManager.createItem(db, body);
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.get('/go-to-edit-item', (req, res) => {
    console.log(req.query)
    res.sendFile(path.join(__dirname+'/edititem.html'));
})

app.put('/update-item', async (req, res) => {
    let values = req.body;
    let id = values.id;
    delete values["id"];
    console.log(values)
    await inventoryManager.updateItem(db, id, values);
    res.redirect("/")
})

app.get('/export-csv', async (req, res) => {
    console.log(req.query)
    let fileName = req.query.fileName;
    await inventoryManager.exportCSV(db, fileName);
})

app.delete('/delete-item', async (req, res) => {
    let body = req.body;
    await inventoryManager.deleteItem(db, body.id);
    res.sendFile(path.join(__dirname+'/index.html'));
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})