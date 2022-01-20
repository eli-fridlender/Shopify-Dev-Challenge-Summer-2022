
const assert = require('assert');
const sqliteUtils = require('../Back-End/lib/sqliteUtils');
const queries = require('../Back-End/lib/queries');


describe("Testing sqliteUtils.js and queries.js for inventory management.", async function(){

    it("Should return something", async function(){
        let rows = [];
        let db = sqliteUtils.createNewDatabase("tempDB");
        await sleep(1000);
        // let result = await sqliteUtils.executeMutation(db, queries.CREATE_ITEM_TABLE);
        // console.log(result);
        let result = await sqliteUtils.executeMutation(db, queries.CREATE_ITEM,["Test Item", "This is a test item!", 2]);
        console.log(result);
        let data = await sqliteUtils.queryAllRecords(db, queries.GET_ALL_ITEMS);
        console.log(data);

    }).timeout(10000);

})

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }