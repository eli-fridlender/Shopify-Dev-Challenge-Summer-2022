const sqlite3 = require('sqlite3');

/**
 * @param {String} dbName name of the new database. To store database in memory,
 * provide the string ":memory:".
 * @returns {sqlite3.Database {} | Null} new instance of sqlite3 database or Null if error 
 * or bad arg.
 */
const createNewDatabase = async (dbName) => {
    if(dbName && typeof dbName === "string" && dbName.length > 0){
        return new Promise((resolve, reject) => {
            let db = new sqlite3.Database(dbName, (err) => {
                if (err) {
                    console.error(err.message);
                    reject(err.message);
                }
                console.log("sqliteUtils.js - createNewDatabase() -- Connected to SQlite database.");
                resolve(db)
            });
        });
    }
    else{
        console.error("sqliteUtils.js - createNewDatabase() -- ERROR: Improper Argument provided.");
        return null;
    }
}

/**
 * Executes run command on db using provided SQL. Used to
 * Create, Update, and Delete.
 * 
 * @param {sqlite3.Database {}} db database instance.
 * @param {String} sql sql string to execute.
 * @param {Any []} values items to pass into sql statement. 
 */
const executeMutation = async (db, sql, values = []) => {
    console.log(`sqliteUtils.js - executeMutationSQL() -- SQL Provided: ${sql}.`);
    console.log(`sqliteUtils.js - executeMutationSQL() -- Values Provided: ${values}.`);
    
    return new Promise((resolve, reject) => {
        db.run(sql, values, function(err) {
            if (err) {
              console.error(`sqliteUtils.js - executeMutationSQL() -- ${err.message}.`);
              reject(false);
            }
            console.log("sqliteUtils.js - executeMutationSQL() -- SQL executed successfully.");
            resolve(true);
        });
    });
}
/**
 * Executes get command on db using provided SQL. Used to
 * query items.
 * 
 * @param {sqlite3.Database {}} db database instance.
 * @param {String} sql sql string to execute.
 * @param {Any []} values items to pass into sql statement. 
 * @returns {Object []} array of record objects.
 */
const querySingleRecord = async (db, sql, values = []) => {
    console.log(`sqliteUtils.js - executeQuerySQL() -- SQL Provided: ${sql}.`);
    console.log(`sqliteUtils.js - executeQuerySQL() -- Values Provided: ${values}.`);
    
    return new Promise((resolve, reject) => {
        db.each(sql, values, (err, row) => {
            if (err) {
                reject(`sqliteUtils.js - executeQuerySQL() -- ${err.message}.`);
            }
            resolve(row);
        });
    });
}

/**
 * Executes get command on db using provided SQL. Used to
 * query items.
 * 
 * @param {sqlite3.Database {}} db database instance.
 * @param {String} sql sql string to execute.
 * @param {Any []} values items to pass into sql statement. 
 * @returns {Object []} array of record objects.
 */
const queryAllRecords = async (db, sql) => {
    console.log(`sqliteUtils.js - executeQuerySQL() -- SQL Provided: ${sql}.`);
    
    return new Promise((resolve, reject) => {
        db.all(sql, (err, records) => {
            if (err) {
                reject(`sqliteUtils.js - executeQuerySQL() -- ${err.message}.`);
            }
            resolve(records);
        });
    });
}


module.exports = {
    createNewDatabase,
    executeMutation,
    querySingleRecord,
    queryAllRecords
}