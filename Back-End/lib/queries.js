const constants = require('./constants');

module.exports= {
    CREATE_ITEM_TABLE: `CREATE TABLE IF NOT EXISTS Items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        quantity INTEGER);`,
    CREATE_ITEM: `INSERT INTO Items (%column_names) VALUES (${constants.ITEM_PARAMS.map((param) => '?').join(",")});`,
    UPDATE_ITEM: `UPDATE Items SET %column_names WHERE id=?;`,
    DELETE_ITEM: `DELETE FROM Items WHERE id=?;`,
    GET_ITEM: `SELECT * FROM Items WHERE id=?;`,
    GET_ALL_ITEMS: `SELECT * FROM Items;`,
}