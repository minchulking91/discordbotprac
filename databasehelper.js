var mysql = require('mysql');
var connection = mysql.createConnection(process.env.JAWSDB_URL);

// connection.connect();

// connection.query('SELECT key AS solution', function (err, rows, fields) {
//     if (err) throw err;

//     console.log('The solution is: ', rows[0].solution);
// });

// connection.end();
var createEchoTableQuery = 'CREATE TABLE IF NOT EXISTS echos(token VARCHAR(40) NOT NULL, sentence VARCHAR(40) NOT NULL, PRIMARY KEY ( token ))';

module.exports = {
    addEcho: function (key, value) {

        connection.connect();
        connection.query(createEchoTableQuery, function (err, result) {

        });

        connection.query(`INSERT INTO echos (token, sentence) ON DUPLICATE KEY UPDATE VALUES ('${key}', '${value}')`, function (err, result) {
            if (err) console.error(err);
            console.log(`insert ${key} ${value}`);
        });

        connection.destroy();
    },
    deleteEcho: function (key) {
        connection.connect();
        connection.query("DELETE FROM customers WHERE token = '${key}'", function (err, result) {

        });
        connection.destroy();
    },
    selectEchos: function (callback) {

        connection.connect();
        connection.query(createEchoTableQuery, function (err, result) {

        });
        connection.query('SELECT * FROM echos', function (err, result, fields) {
            var echoMap = new Map();
            Object.keys(result).forEach(function (key) {
                var row = result[key];
                var sentence = row.sentence;
                var token = row.token;
                console.log(`${token} ${sentence}`);
                echoMap.set(token, sentence);
            });
            if(typeof callback === 'function') {
                callback(echoMap);
            }
        });
        connection.destroy();
    }
}

