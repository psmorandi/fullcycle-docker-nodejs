const express = require('express');
const app = express();
const port = 3000;
const dbconfig = {
    host: 'mysql',
    user: 'nodejs',
    password: 'adm123',
    database: 'nodejsdb'
};
const mysql = require('mysql');
const connection = mysql.createConnection(dbconfig);
const createTable = `CREATE TABLE IF NOT EXISTS people(id int not null auto_increment, name varchar(255), primary key (id))`;
const insert = `INSERT INTO people(name) VALUES ('${randomName(12)}')`;
const select = `SELECT name FROM people`;
var resultBody = '<h1>Full Cycle Rocks!</h1><br /><br/><h3>Lista:</h3><ul>';

connection.query(createTable);
connection.query(insert);
connection.query(select, function (err, result, fields) {
    if (err) throw err;
    resultBody += result.map(r => `<li>${r.name}</li>`).join('').concat('</ul>');    
  });
connection.end();

app.get('/', (req, res) => {
    res.send(resultBody)
});

app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

//src: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function randomName(length) {
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        const ch = characters.charAt(Math.floor(Math.random() *  charactersLength));
        result += i == 0? ch.toUpperCase() : ch;
    };
    return result;
}