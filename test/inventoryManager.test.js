
const assert = require('assert');
const inventoryManager = require('../Back-End/InventoryManager');


describe("Testing inventoryManager.js", async function(){

    it("Should return something", async function(){
        let db = await inventoryManager.initializeInventoryManager();
        await inventoryManager.createItem(db, {
            "title": "Test Item",
            "description": "Test Description",
            "quantity": 4 
        });
        console.log(db);
        let result = await inventoryManager.getAllItems(db);
        console.log(result);
        await inventoryManager.deleteItem(db, "1");
        result = await inventoryManager.getAllItems(db);
        console.log(result);
        await inventoryManager.updateItem(db, 20, {
            "title": "Test Item",
            "description": "Test Descriptionsss",
            "quantity": 69 
        })
        result = await inventoryManager.getAllItems(db);
        console.log(result);
        result = await inventoryManager.getItem(db, 3);
        console.log(result);

    }).timeout(10000);

})

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}