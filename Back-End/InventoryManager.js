const constants = require('./lib/constants');
const queries = require('./lib/queries');
const sqliteUtils = require("./lib/sqliteUtils");
const { Parser } = require('json2csv');
const fs = require('fs');


const createItem = async (db, data) => {

    if(isValidItem(data)){
        const colNames = Object.keys(data).map((key) => `${key}`).join(",");
        const values = Object.keys(data).map((key) => data[key]);
        const sql = queries.CREATE_ITEM.replace("%column_names", colNames);

        let result = await sqliteUtils.executeMutation(db, sql, values);
        console.log("created result")
        console.log(result);
    }
    else{
        //bad item.
        console.log("Item is invalid");
    }

}

const deleteItem = async (db, id) => {
    let result = await sqliteUtils.executeMutation(db, queries.DELETE_ITEM, [id]);
    console.log("delete result")
    console.log(result);
}

const updateItem = async (db, id, newValues) => {
    const colNames = Object.keys(newValues).map((key) => `${key}=?`).join(",");
    const values = Object.keys(newValues).map((key) => newValues[key]);
    values.push(id);
    const sql = queries.UPDATE_ITEM.replace("%column_names", colNames);
    let result = await sqliteUtils.executeMutation(db, sql, values);
    console.log("update result")
    console.log(result);
}

const getItem = async (db, id) => {
    return await sqliteUtils.querySingleRecord(db, queries.GET_ITEM, [id]);
}

const getAllItems = async (db) => {
    return await sqliteUtils.queryAllRecords(db, queries.GET_ALL_ITEMS);
}

const initializeInventoryManager = async () => {
    let db = await sqliteUtils.createNewDatabase("tempDB");
    await sqliteUtils.executeMutation(db, queries.CREATE_ITEM_TABLE);
    return db;
}

const exportCSV = async (db, path) => {
    let items = await getAllItems(db);
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(items);
    fs.writeFile(path, csv, 'utf8', function (err) {
        if (err) {
          console.log('Some error occured - file either not saved or corrupted file saved.');
        } 
        else{
          console.log('CSV has been saved.');
        }
      });
}

/**
 * Checks that data provided for an item is correct.
 * 
 * @param {Object} itemData new item data.
 * @returns {Boolean} whether item is valid or not.
 */
const isValidItem = itemData => {

    if(!itemData || Object.keys(itemData).length !== constants.ITEM_PARAMS.length){ //checking that input was given and has correct num of params.
        return false;
    }

    for(const param of constants.ITEM_PARAMS){ //checking that each param exists and is of right type.
        if(!Object.keys(itemData).includes(param.name)){
            return false;
        }

        if(typeof itemData[param.name] !== param.type){
            return false;
        }
    }

    return true;
}


module.exports = {
    initializeInventoryManager,
    createItem,
    deleteItem,
    updateItem,
    getAllItems,
    getItem,
    exportCSV
}