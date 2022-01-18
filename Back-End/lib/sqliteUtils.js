const sqlite3 = require('sqlite3');

/**
 * @param {String} dbName name of the new database. To store database in memory,
 * provide the string ":memory:".
 * @returns {sqlite3.Database {} | Null} new instance of sqlite3 database or Null if error 
 * or bad arg.
 */
const createNewDatabase = (dbName) => {

    if(dbName && typeof dbName === "string" && dbName.length > 0){
        return new sqlite3.Database(dbName, (err) => {
            if (err) {
              return console.error(err.message);
            }
            console.log("sqliteUtils.js - createNewDatabase() -- Connected to SQlite database.");
        });
    }
    else{
        console.error("sqliteUtils.js - createNewDatabase() -- ERROR: Improper Argument provided.");
        return null;
    }
}


/**
 * @param {sqlite3.Database {}} db database instance.
 * @param {String} sql sql string to execute.
 * @param {Any []} values items to pass into sql statement. 
 */
const executeSQL = (db, sql, values = []) => {
    console.log(`sqliteUtils.js - executeSQL() -- SQL Provided: ${sql}.`);
    console.log(`sqliteUtils.js - executeSQL() -- Params Provided: ${params}.`);
    
    try{
        db.run(sql, values, function(err) {
            if (err) {
              return console.error(`sqliteUtils.js - executeSQL() -- ${err.message}.`);
            }
            console.log("sqliteUtils.js - createNewDatabase() -- SQL executed successfully.");
        });
    }
    catch(err){
        console.error(`sqliteUtils.js - executeSQL() -- ERROR: ${err}.`);
    }
}


module.exports = {
    createNewDatabase,
    executeSQL
}